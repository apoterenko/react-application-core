import * as React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import { DI_TYPES, appContainer, lazyInject } from '../../di';
import { IEventManager } from '../../event';
import { IApplicationPermissionsState, PERMISSION_DESTROY_ACTION_TYPE } from '../../permission';
import { IRouter, ContainerVisibilityTypeEnum, RouteContainerT } from '../../router';
import { IApplicationSettings } from '../../settings';
import { APPLICATION_STATE_KEY, IStorage } from '../../storage';
import { IApplicationState } from '../../store';
import { clone, uuid } from '../../util';
import { BaseContainer } from '../../component/base';
import { INITIAL_APPLICATION_NOTIFICATION_STATE } from '../../notification';
import { IApplicationDictionariesState } from '../../dictionary';
import { PrivateRootContainer, PublicRootContainer } from '../../component/root';
import { ConnectorConfigT } from '../../component/store';
import { USER_DESTROY_ACTION_TYPE } from '../../user';
import { INITIAL_APPLICATION_TRANSPORT_STATE, TRANSPORT_DESTROY_ACTION_TYPE } from '../../transport';

import { IApplicationContainerProps } from './application.interface';

export class ApplicationContainer<TAppState extends IApplicationState<TDictionariesState, TPermissionsState, TPermissions>,
                                  TInternalProps extends IApplicationContainerProps,
                                  TDictionariesState extends IApplicationDictionariesState,
                                  TPermissionsState extends IApplicationPermissionsState<TPermissions>,
                                  TPermissions,
                                  TPermissionObject>
    extends BaseContainer<TInternalProps, {}> {

  @lazyInject(DI_TYPES.Storage) private storage: IStorage;
  @lazyInject(DI_TYPES.DynamicRoutes) private dynamicRoutes: Map<RouteContainerT, ConnectorConfigT>;
  @lazyInject(DI_TYPES.Settings) private applicationSettings: IApplicationSettings;
  @lazyInject(DI_TYPES.EventManager) private eventManager: IEventManager;

  private extraRoutes: Map<RouteContainerT, ConnectorConfigT>
      = new Map<RouteContainerT, ConnectorConfigT>();

  constructor(props: TInternalProps) {
    super(props, 'application');
    this.onUnload = this.onUnload.bind(this);
    this.onBeforeLogout = this.onBeforeLogout.bind(this);
  }

  public render(): JSX.Element {
    return (
        <MuiThemeProvider>
          <Provider store={this.appStore}>
            <BrowserRouter ref='router'
                           basename={this.props.basename}
            >
              <Switch>
                {...this.getRoutes()}
              </Switch>
            </BrowserRouter>
          </Provider>
        </MuiThemeProvider>
    );
  }

  public componentWillMount(): void {
    this.eventManager.add(window, 'unload', this.onUnload);
  }

  public componentWillUnmount(): void {
    this.eventManager.remove(window, 'unload', this.onUnload);
  }

  public componentDidMount(): void {
    appContainer.bind<IRouter>(DI_TYPES.Router).toConstantValue(
        // We cannot to get access to history instance other way. This instance is private
        Reflect.get(this.refs.router, 'history'),
    );
  }

  protected onUnload(): void {
    if (this.applicationSettings.usePersistence) {
      this.saveState();
    }
  }

  protected onBeforeLogout(): void {
    const isUserAuthorized = this.isAuthorized;
    this.appStore.dispatch({ type: PERMISSION_DESTROY_ACTION_TYPE });
    this.appStore.dispatch({ type: TRANSPORT_DESTROY_ACTION_TYPE });

    if (isUserAuthorized) {
      this.afterDestroySession();
    }
  }

  protected afterDestroySession(): void {
    this.appStore.dispatch({ type: USER_DESTROY_ACTION_TYPE });
  }

  protected clearStateBeforeSerialization(state: TAppState): TAppState {
    state.notification = INITIAL_APPLICATION_NOTIFICATION_STATE;
    state.transport.queue = INITIAL_APPLICATION_TRANSPORT_STATE.queue;

    // You may clear the app state here before the serializing
    return state;
  }

  protected get isAuthorized(): boolean {
    return this.permissionService.isAuthorized();
  }

  protected getRoutes(): JSX.Element[] {
    return this.buildRoutes(this.dynamicRoutes)
        .concat(this.buildRoutes(this.extraRoutes));
  }

  protected lookupConnectComponentByRoutePath(path: string): RouteContainerT {
    let result: RouteContainerT;
    this.dynamicRoutes.forEach((config, ctor) => {
      if (config.routeConfig.path === path) {
        result = ctor;
      }
    });
    return result;
  }

  protected registerRouter(container: RouteContainerT, config: ConnectorConfigT): void {
    this.extraRoutes.set(container, config);
  }

  private buildRoutes(map: Map<RouteContainerT, ConnectorConfigT>): JSX.Element[] {
    const routes: JSX.Element[] = [];
    map.forEach((config, ctor) => {
      let Component;
      switch (config.routeConfig.type) {
        case ContainerVisibilityTypeEnum.PRIVATE:
          Component = PrivateRootContainer;
          break;
        case ContainerVisibilityTypeEnum.PUBLIC:
          Component = PublicRootContainer;
          break;
      }
      const props = {
        ...{ key: uuid(), exact: true, accessConfig: config.accessConfig },
        ...config.routeConfig,
      };
      routes.push(
          <Component container={ctor}
                     {...props}/>
      );
    });
    return routes;
  }

  private saveState(): void {
    this.storage.set(APPLICATION_STATE_KEY,
        this.clearStateBeforeSerialization(clone<TAppState>(this.appState)),
    );
  }

  // In a general case we should not use the appState directly, only via "connect" method!
  private get appState(): TAppState {
    return this.appStore.getState() as TAppState;
  }
}
