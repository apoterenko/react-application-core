import * as React from 'react';
import {
  ILogger,
  LoggerFactory,
} from 'ts-smart-logger';

import {
  calc,
  doesApplicationErrorExist,
  ifNotNilThanValue,
  isApplicationInProgress,
  isApplicationMessageVisible,
  TypeUtils,
} from '../../util';
import {
  $RAC_STORAGE_REGISTER_SYNC_APP_STATE_TASK_ACTION_TYPE,
  $RAC_STORAGE_SYNC_APP_STATE_ACTION_TYPE,
  $RAC_STORAGE_UNREGISTER_SYNC_APP_STATE_TASK_ACTION_TYPE,
  APPLICATION_SECTION,
  ContainerVisibilityTypesEnum,
  IConnectorEntity,
  IGenericContainerCtor,
  IRouteEntity,
  IStorageSettingsEntity,
  IUniversalUiMessageConfigEntity,
  RoutePredicateT,
} from '../../definition';
import { ApplicationActionBuilder } from './application-action.builder';
import { IUniversalApplicationContainerProps } from './universal-application.interface';
import { GenericContainer } from '../base/generic.container';

export abstract class UniversalApplicationContainer<TProps extends IUniversalApplicationContainerProps>
  extends GenericContainer<TProps> {

  public static readonly defaultProps: IUniversalApplicationContainerProps = {
    sectionName: APPLICATION_SECTION,
  };

  private static readonly logger = LoggerFactory.makeLogger('UniversalApplicationContainer');
  private readonly extraRoutes = new Map<IGenericContainerCtor, IConnectorEntity>();

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
    this.storeProxy.dispatchActionByType(ApplicationActionBuilder.buildMountActionType());

    if (this.storageSettings.appStateSyncEnabled) {
      this.storeProxy.dispatchActionByType($RAC_STORAGE_REGISTER_SYNC_APP_STATE_TASK_ACTION_TYPE);
    }
  }

  /**
   * @stable [24.09.2019]
   */
  public componentWillUnmount(): void {
    if (this.storageSettings.appStateSyncEnabled) {
      this.storeProxy.dispatchActionByType($RAC_STORAGE_UNREGISTER_SYNC_APP_STATE_TASK_ACTION_TYPE);
      this.syncAppState();
    }
  }

  /**
   * @stable [18.11.2019]
   */
  protected syncAppState(): void {
    this.storeProxy.dispatchActionByType($RAC_STORAGE_SYNC_APP_STATE_ACTION_TYPE);
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
   * @returns {IGenericContainerCtor}
   */
  protected lookupDynamicContainerByRoutePath(path: string): IGenericContainerCtor {
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
          if ([calc(routeCfg.path), routeCfg.key].includes(path)) {
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
   * @param {IGenericContainerCtor} container
   * @param {IConnectorEntity} config
   */
  protected registerExtraRoute(container: IGenericContainerCtor, config: IConnectorEntity): void {
    this.extraRoutes.set(container, config);
  }

  protected registerLogoutRoute(): void {
    const loginContainer = this.lookupDynamicContainerByRoutePath(this.settings.routes.signIn);
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
            path: this.settings.routes.logout,
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

    this.storeProxy.dispatchActionByType(ApplicationActionBuilder.buildLogoutActionType());
  }

  /**
   * @stable [16.11.2019]
   * @param {IGenericContainerCtor} ctor
   * @param {IConnectorEntity} connectorEntity
   * @returns {JSX.Element}
   */
  protected abstract buildRoute(ctor: IGenericContainerCtor, connectorEntity: IConnectorEntity): JSX.Element;

  /**
   * @stable [17.11.2019]
   * @param {IRouteEntity} routeCfg
   * @returns {string}
   */
  protected toRouteId(routeCfg: IRouteEntity): string {
    return calc(routeCfg.path) || routeCfg.key;
  }

  /**
   * @stable [28.11.2019]
   * @returns {React.ReactNode}
   */
  protected getMessageElement(): React.ReactNode {
    const {
      error,
    } = this.originalProps;
    const messages = this.settings.messages;

    return (
      this.inProgress
        ? this.uiFactory.makeMessage(this.prepareMessage({message: messages.PLEASE_WAIT}))
        : (
          this.doesErrorExist
            ? (
              this.uiFactory.makeReactError(
                TypeUtils.isBoolean(error)
                  ? new Error(messages.UNKNOWN_ERROR)
                  : new Error(String(error)),
                false
              )
            )
            : (
              this.uiFactory.makeMessage(
                this.prepareMessage({message: messages.APPLICATION_IS_INITIALIZING})
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
   * @param {Map<IGenericContainerCtor, IConnectorEntity>} map
   * @param {RoutePredicateT} routePredicate
   * @returns {JSX.Element[]}
   */
  private buildRoutes(map: Map<IGenericContainerCtor, IConnectorEntity>,
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
