import * as React from 'react';
import { LoggerFactory, ILogger } from 'ts-smart-logger';

import {
  doesApplicationErrorExist,
  ifNotNilThanValue,
  isApplicationInProgress,
  isApplicationMessageVisible,
  isBoolean,
} from '../../util';
import {
  $RAC_STORAGE_REGISTER_SYNC_APP_STATE_TASK_ACTION_TYPE,
  $RAC_STORAGE_SYNC_APP_STATE_ACTION_TYPE,
  $RAC_STORAGE_UNREGISTER_SYNC_APP_STATE_TASK_ACTION_TYPE,
  APPLICATION_SECTION,
  ContainerVisibilityTypesEnum,
  IConnectorEntity,
  IContainerCtor,
  IRouteEntity,
  IStorageSettingsEntity,
  IUniversalUiMessageConfigEntity,
  RoutePredicateT,
} from '../../definition';
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

  /**
   * @stable [17.11.2019]
   * @param {TProps} props
   */
  constructor(props: TProps) {
    super(props);
    this.syncAppState = this.syncAppState.bind(this);
    this.onBeforeLogout = this.onBeforeLogout.bind(this);
    this.registerLogoutRoute();

    UniversalApplicationContainer.logger.debug(
      '[$UniversalApplicationContainer][constructor] The app has been instantiated. The initial props are:',
      props
    );
  }

  /**
   * @stable [17.11.2019]
   */
  public componentDidMount(): void {
    this.dispatchCustomType(ApplicationActionBuilder.buildMountActionType());

    if (this.storageSettings.appStateSyncEnabled) {
      this.dispatchCustomType($RAC_STORAGE_REGISTER_SYNC_APP_STATE_TASK_ACTION_TYPE);
    }
  }

  /**
   * @stable [24.09.2019]
   */
  public componentWillUnmount(): void {
    if (this.storageSettings.appStateSyncEnabled) {
      this.dispatchCustomType($RAC_STORAGE_UNREGISTER_SYNC_APP_STATE_TASK_ACTION_TYPE);
      this.syncAppState();
    }
  }

  /**
   * @stable [18.11.2019]
   */
  protected syncAppState(): void {
    this.dispatchCustomType($RAC_STORAGE_SYNC_APP_STATE_ACTION_TYPE);
  }

  /**
   * @stable [28.11.2019]
   * @param {RoutePredicateT} routePredicate
   * @returns {React.ReactNode}
   */
  protected getRoutes(routePredicate: RoutePredicateT = () => true): React.ReactNode {
    return this.isMessageVisible
      ? this.getMessageElement()
      : [
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
   * @stable [28.11.2019]
   * @returns {React.ReactNode}
   */
  protected getMessageElement(): React.ReactNode {
    const props = this.props;
    return (
      this.inProgress
        ? this.uiFactory.makeMessage(this.prepareMessage({message: this.settings.messages.PLEASE_WAIT}))
        : (
          this.doesErrorExist
            ? (
              this.uiFactory.makeReactError(
                isBoolean(props.error)
                  ? new Error(this.settings.messages.UNKNOWN_ERROR)
                  : new Error(String(props.error))
              )
            )
            : (
              this.uiFactory.makeMessage(
                this.prepareMessage({message: this.settings.messages.APPLICATION_IS_INITIALIZING})
              )
            )
        )
    );
  }

  /**
   * @stable [28.11.2019]
   * @param {IUniversalUiMessageConfigEntity} message
   * @returns {IUniversalUiMessageConfigEntity}
   */
  protected prepareMessage(message: IUniversalUiMessageConfigEntity): IUniversalUiMessageConfigEntity {
    return message;
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
  protected get storageSettings(): IStorageSettingsEntity {
    return this.settings.storage || {};
  }

  /**
   * @stable [28.11.2019]
   * @returns {boolean}
   */
  protected get isMessageVisible(): boolean {
    return isApplicationMessageVisible(this.props);
  }

  /**
   * @stable [28.11.2019]
   * @returns {boolean}
   */
  protected get inProgress(): boolean {
    return isApplicationInProgress(this.props);
  }

  /**
   * @stable [28.11.2019]
   * @returns {boolean}
   */
  protected get doesErrorExist(): boolean {
    return doesApplicationErrorExist(this.props);
  }
}
