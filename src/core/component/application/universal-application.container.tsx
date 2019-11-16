import * as React from 'react';
import { Unsubscribe } from 'redux';
import * as R from 'ramda';
import { LoggerFactory, ILogger } from 'ts-smart-logger';

import { orNull, calc, DelayedTask } from '../../util';
import {
  ApplicationEventCategoriesEnum,
  ApplicationStateEventsEnum,
  ContainerVisibilityTypesEnum,
  IConnectorEntity,
  IContainerCtor,
  IRouteEntity,
  RoutePredicateT,
  STORAGE_APP_STATE_KEY,
} from '../../definition';
import { APPLICATION_SECTION } from './application.interface';
import { ApplicationActionBuilder } from './application-action.builder';
import { IStateSettings } from '../../settings';
import { IUniversalApplicationContainerProps } from './universal-application.interface';
import { UniversalContainer } from '../base/universal.container';

export abstract class UniversalApplicationContainer<TProps extends IUniversalApplicationContainerProps>
  extends UniversalContainer<TProps> {

  public static readonly defaultProps: IUniversalApplicationContainerProps = {
    sectionName: APPLICATION_SECTION,
  };

  private static logger = LoggerFactory.makeLogger('UniversalApplicationContainer');
  private extraRoutes = new Map<IContainerCtor, IConnectorEntity>();
  private syncStateWithStorageTask: DelayedTask;
  private storeUnsubscriber: Unsubscribe;

  /**
   * @stable - 23.04.2018
   * @param {TProps} props
   */
  constructor(props: TProps) {
    super(props);
    this.syncState = this.syncState.bind(this);
    this.onBeforeLogout = this.onBeforeLogout.bind(this);
    this.registerLogoutRoute();
    this.registerStateTask();

    UniversalApplicationContainer.logger.debug(
      '[$UniversalApplicationContainer][constructor] The app has been instantiated. The initial props are:',
      props
    );
  }

  /**
   * @stable [25.09.2019]
   */
  public componentDidMount(): void {
    this.dispatchCustomType(ApplicationActionBuilder.buildMountActionType());
    this.clearPreviousStates();
  }

  /**
   * @stable [24.09.2019]
   */
  public componentWillUnmount(): void {
    this.unregisterStateTask();

    if (this.stateSettings.syncEnabled) {
      this.syncState(); // In case of "manual location.reload"
    }
  }

  /**
   * @stable [16.11.2019]
   * @param {RoutePredicateT} routePredicate
   * @returns {JSX.Element[]}
   */
  protected getRoutes(routePredicate: RoutePredicateT = () => true): JSX.Element[] {
    return [
      ...this.buildRoutes(this.dynamicRoutes, routePredicate),
      ...this.buildRoutes(this.extraRoutes, routePredicate)
    ];
  }

  protected lookupConnectedContainerByRoutePath(path: string): IContainerCtor {
    if (!path) {
      UniversalApplicationContainer.logger.warn(
        '[$UniversalApplicationContainer][lookupConnectedContainerByRoutePath] The path is empty.'
      );
      return null;
    }
    let result;
    this.dynamicRoutes.forEach((config, ctor) => {
      const routeConfiguration = calc(config.routeConfiguration, this.routes);
      if (routeConfiguration && [routeConfiguration.path, routeConfiguration.key].includes(path)) {
        result = ctor;
      }
    });
    if (!result) {
      UniversalApplicationContainer.logger.warn(
        `[$UniversalApplicationContainer][lookupConnectedContainerByRoutePath] A component is not found by the path: ${path}.`
      );
    }
    return result;
  }

  protected registerRoute(container: IContainerCtor, config: IConnectorEntity): void {
    this.extraRoutes.set(container, config);
  }

  protected registerLogoutRoute(): void {
    const loginContainer = this.lookupConnectedContainerByRoutePath(this.routes.signIn);
    if (!loginContainer) {
      UniversalApplicationContainer.logger.debug(
        '[$UniversalApplicationContainer][registerLogoutRoute] The login route is not registered.'
      );
    } else {
      this.registerRoute(
        loginContainer,
        {
          routeConfiguration: {
            type: ContainerVisibilityTypesEnum.PUBLIC,
            path: this.routes.logout,
            beforeEnter: this.onBeforeLogout,   // Web
            onEnter: this.onBeforeLogout,       // ReactNative
          },
        }
      );

      UniversalApplicationContainer.logger.debug(
        '[$UniversalApplicationContainer][registerLogoutRoute] Logout router has been registered.'
      );
    }
  }

  protected onBeforeLogout(): void {
    UniversalApplicationContainer.logger.debug('[$UniversalApplicationContainer][onBeforeLogout] Send a logout action.');

    this.dispatchCustomType(ApplicationActionBuilder.buildLogoutActionType());
  }

  protected isMessageVisible(): boolean {
    const props = this.props;
    return props.progress || !!props.error || !props.ready;
  }

  protected getErrorMessage(): string {
    const props = this.props;
    return (
      orNull<string>(
        props.error || props.customError,
        () => (
          props.customError
            ? props.error
            : `${this.t(this.settings.messages.followingErrorHasOccurredMessage)} "${props.error.toLowerCase()}"`
        )
      )
    );
  }

  /**
   * @stable [24.09.2019]
   */
  protected syncState(): void {
    try {
      this.doSyncState();
    } catch (e) {
      this.logManager.send(ApplicationEventCategoriesEnum.STATE_ERROR, ApplicationStateEventsEnum.SYNC, e.message);
    }
  }

  /**
   * @stable [24.09.2019]
   */
  protected doSyncState(): void {
    this.storage.set(STORAGE_APP_STATE_KEY, this.stateSerializer.serialize(this.appStore.getState()));
  }

  /**
   * @stable [25.09.2019]
   */
  protected clearPreviousStates(): void {
    this.storage.each((value, key) => {
      if (key.endsWith(STORAGE_APP_STATE_KEY)) {
        this.storage.remove(key, true);
      }
    });
  }

  /**
   * @stable [24.09.2019]
   */
  protected registerStateTask(): boolean {
    if (!this.stateSettings.syncEnabled) {
      return false;
    }
    if (this.stateSettings.syncTimeout > 0) {
      this.syncStateWithStorageTask = new DelayedTask(this.syncState.bind(this), this.stateSettings.syncTimeout);
      this.storeUnsubscriber = this.appStore.subscribe(() => this.syncStateWithStorageTask.start());
    }
    return true;
  }

  /**
   * @stable [24.09.2019]
   */
  protected unregisterStateTask(): boolean {
    if (!this.stateSettings.syncEnabled) {
      return false;
    }
    if (!R.isNil(this.storeUnsubscriber)) {
      this.storeUnsubscriber();
      this.storeUnsubscriber = null;
    }
    if (!R.isNil(this.syncStateWithStorageTask)) {
      this.syncStateWithStorageTask.stop();
      this.syncStateWithStorageTask = null;
    }
    return true;
  }

  /**
   * @stable [16.11.2019]
   * @param {IContainerCtor} ctor
   * @param {IConnectorEntity} connectorEntity
   * @returns {JSX.Element}
   */
  protected abstract buildRoute(ctor: IContainerCtor,
                                connectorEntity: IConnectorEntity): JSX.Element;

  /**
   *
   * @param {Map<IContainerCtor, IConnectorEntity>} map
   * @param {RoutePredicateT} routePredicate
   * @returns {JSX.Element[]}
   */
  private buildRoutes(map: Map<IContainerCtor, IConnectorEntity>,
                      routePredicate: RoutePredicateT): JSX.Element[] {
    const routes0 = [];
    const routes = [];

    map.forEach((connectorEntity, containerCtor) => {
      const routeCfg = connectorEntity.routeConfiguration;
      if (routePredicate.call(null, routeCfg)) {
        routes0.push(routeCfg.path || routeCfg.key);
        routes.push(this.buildRoute(containerCtor, connectorEntity));
      }
    });
    UniversalApplicationContainer.logger.debug(
      () => `[$UniversalApplicationContainer][buildRoutes] The routes have been built. Routes: ${routes0.join('\n')}`
    );
    return routes;
  }

  /**
   * @stable [24.09.2019]
   * @returns {IStateSettings}
   */
  private get stateSettings(): IStateSettings {
    return this.settings.state || {};
  }
}
