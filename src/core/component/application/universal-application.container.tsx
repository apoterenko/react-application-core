import * as React from 'react';
import { Unsubscribe } from 'redux';
import * as R from 'ramda';
import { LoggerFactory, ILogger } from 'ts-smart-logger';

import {
  DelayedTask,
  ifNotNilThanValue,
  orNull,
} from '../../util';
import {
  ContainerVisibilityTypesEnum,
  IConnectorEntity,
  IContainerCtor,
  IRouteEntity,
  IStorageSettingsEntity,
  RoutePredicateT,
  StorageEventCategoriesEnum,
  StorageEventsEnum,
} from '../../definition';
import { APPLICATION_SECTION } from './application.interface';
import { ApplicationActionBuilder } from './application-action.builder';
import { IUniversalApplicationContainerProps } from './universal-application.interface';
import { UniversalContainer } from '../base/universal.container';

export abstract class UniversalApplicationContainer<TProps extends IUniversalApplicationContainerProps>
  extends UniversalContainer<TProps> {

  public static readonly defaultProps: IUniversalApplicationContainerProps = {
    sectionName: APPLICATION_SECTION,
  };

  private static readonly logger = LoggerFactory.makeLogger('UniversalApplicationContainer');
  private readonly extraRoutes = new Map<IContainerCtor, IConnectorEntity>();
  private syncStateWithStorageTask: DelayedTask;
  private storeSyncStateWithStorageUnsubscriber: Unsubscribe;

  /**
   * @stable [17.11.2019]
   * @param {TProps} props
   */
  constructor(props: TProps) {
    super(props);
    this.syncState = this.syncState.bind(this);
    this.onBeforeLogout = this.onBeforeLogout.bind(this);
    this.registerLogoutRoute();
    this.registerSyncStateWithStorageTask();

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
    this.unregisterSyncStateWithStorageTask();

    if (this.storageSettings.appStateSyncEnabled) {
      this.syncState();
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

  /**
   * @stable [17.11.2019]
   * @param {string} path
   * @returns {IContainerCtor}
   */
  protected lookupDynamicContainerByRoutePath(path: string): IContainerCtor {
    if (!path) {
      UniversalApplicationContainer.logger.warn(
        '[$UniversalApplicationContainer][lookupDynamicContainerByRoutePath] The path is empty'
      );
      return null;
    }
    let result;
    this.dynamicRoutes.forEach((config, ctor) => {
      ifNotNilThanValue(
        config.routeConfiguration,
        (routeCfg) => {
          if ([routeCfg.path, routeCfg.key].includes(path)) {
            result = ctor;
          }
        }
      );
    });
    if (!result) {
      UniversalApplicationContainer.logger.warn(
        `[$UniversalApplicationContainer][lookupDynamicContainerByRoutePath] A container is not found by path: ${path}`
      );
    }
    return result;
  }

  /**
   * @stable [17.11.2019]
   * @param {IContainerCtor} container
   * @param {IConnectorEntity} config
   */
  protected registerExtraRoute(container: IContainerCtor, config: IConnectorEntity): void {
    this.extraRoutes.set(container, config);
  }

  protected registerLogoutRoute(): void {
    const loginContainer = this.lookupDynamicContainerByRoutePath(this.routes.signIn);
    if (!loginContainer) {
      UniversalApplicationContainer.logger.debug(
        '[$UniversalApplicationContainer][registerLogoutRoute] The login route is not registered.'
      );
    } else {
      this.registerExtraRoute(
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

  /**
   * @stable [17.11.2019]
   */
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
      this.logManager.send(StorageEventCategoriesEnum.STORAGE_ERROR, StorageEventsEnum.SYNC, e.message);
    }
  }

  /**
   * @stable [24.09.2019]
   */
  protected doSyncState(): void {
    this.storage.set(this.appStateKeyName, this.stateSerializer.serialize(this.appStore.getState()));
  }

  /**
   * @stable [25.09.2019]
   */
  protected clearPreviousStates(): void {
    this.storage.each((value, key) => {
      if (key.endsWith(this.appStateKeyName)) {
        this.storage.remove(key, true);
      }
    });
  }

  /**
   * @stable [17.11.2019]
   */
  protected registerSyncStateWithStorageTask(): boolean {
    if (!this.storageSettings.appStateSyncEnabled) {
      return false;
    }
    const appStateSyncTimeout = this.storageSettings.appStateSyncTimeout;
    if (appStateSyncTimeout > 0) {
      this.syncStateWithStorageTask = new DelayedTask(this.syncState.bind(this), appStateSyncTimeout);
      this.storeSyncStateWithStorageUnsubscriber = this.appStore.subscribe(() => this.syncStateWithStorageTask.start());
    }
    return true;
  }

  /**
   * @stable [24.09.2019]
   */
  protected unregisterSyncStateWithStorageTask(): boolean {
    if (!this.storageSettings.appStateSyncEnabled) {
      return false;
    }
    if (!R.isNil(this.storeSyncStateWithStorageUnsubscriber)) {
      this.storeSyncStateWithStorageUnsubscriber();
      this.storeSyncStateWithStorageUnsubscriber = null;
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
  protected abstract buildRoute(ctor: IContainerCtor, connectorEntity: IConnectorEntity): JSX.Element;

  /**
   * @stable [17.11.2019]
   * @param {IRouteEntity} routeCfg
   * @returns {string}
   */
  protected toRouteId(routeCfg: IRouteEntity): string {
    return routeCfg.path || routeCfg.key;
  }

  /**
   * @stable [17.11.2019]
   * @param {Map<IContainerCtor, IConnectorEntity>} map
   * @param {RoutePredicateT} routePredicate
   * @returns {JSX.Element[]}
   */
  private buildRoutes(map: Map<IContainerCtor, IConnectorEntity>,
                      routePredicate: RoutePredicateT): JSX.Element[] {
    const routesToDebug = [];
    const result = [];

    map.forEach((connectorEntity, containerCtor) => {
      const routeCfg = connectorEntity.routeConfiguration;
      if (routePredicate.call(null, routeCfg)) {
        routesToDebug.push(this.toRouteId(routeCfg));
        result.push(this.buildRoute(containerCtor, connectorEntity));
      }
    });
    UniversalApplicationContainer.logger.debug(
      () => `[$UniversalApplicationContainer][buildRoutes] The routes have been built. Routes: ${routesToDebug.join('\n')}`
    );
    return result;
  }

  /**
   * @stable [17.11.2019]
   * @returns {IStorageSettingsEntity}
   */
  private get storageSettings(): IStorageSettingsEntity {
    return this.settings.storage || {};
  }

  /**
   * @stable [17.11.2019]
   * @returns {string}
   */
  protected get appStateKeyName(): string {
    return this.storageSettings.appStateKeyName;
  }
}
