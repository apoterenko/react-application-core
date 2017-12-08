import * as React from 'react';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import { clone, uuid } from '../../util';
import { DI_TYPES, appContainer, lazyInject } from '../../di';
import { IEventManager } from '../../event';
import { IApplicationPermissionsState } from '../../permission';
import {
  IRouter,
  ContainerVisibilityTypeEnum,
  RouteContainerT,
  toRouteConfig,
} from '../../router';
import { IApplicationSettings } from '../../settings';
import { APPLICATION_STATE_KEY, IApplicationStorage } from '../../storage';
import { IApplicationState } from '../../store';
import { BaseContainer } from '../../component/base';
import { INITIAL_APPLICATION_NOTIFICATION_STATE } from '../../notification';
import { IApplicationDictionariesState } from '../../dictionary';
import { PrivateRootContainer, PublicRootContainer } from '../../component/root';
import { ConnectorConfigT } from '../../component/connector';
import { Info } from '../../component/info';
import { BASE_PATH } from '../../env';
import { INITIAL_APPLICATION_TRANSPORT_STATE } from '../../transport';
import {
  IApplicationContainerProps,
  APPLICATION_LOGOUT_ACTION_TYPE,
  INITIAL_APPLICATION_READY_STATE,
  APPLICATION_SECTION,
} from './application.interface';

export class ApplicationContainer<TAppState extends IApplicationState<TDictionariesState, TPermissionsState, TPermissions>,
                                  TDictionariesState extends IApplicationDictionariesState,
                                  TPermissionsState extends IApplicationPermissionsState<TPermissions>,
                                  TPermissions,
                                  TPermissionObject>
    extends BaseContainer<IApplicationContainerProps, {}> {

  public static defaultProps: IApplicationContainerProps = {
    basename: BASE_PATH,
  };

  @lazyInject(DI_TYPES.Storage) private storage: IApplicationStorage;
  @lazyInject(DI_TYPES.DynamicRoutes) private dynamicRoutes: Map<RouteContainerT, ConnectorConfigT>;
  @lazyInject(DI_TYPES.Settings) private applicationSettings: IApplicationSettings;
  @lazyInject(DI_TYPES.EventManager) private eventManager: IEventManager;

  private extraRoutes: Map<RouteContainerT, ConnectorConfigT>
      = new Map<RouteContainerT, ConnectorConfigT>();

  constructor(props: IApplicationContainerProps) {
    super(props, APPLICATION_SECTION);
    this.onUnload = this.onUnload.bind(this);
    this.onBeforeLogout = this.onBeforeLogout.bind(this);
    this.registerLogoutRoute();
  }

  public render(): JSX.Element {
    return (
        <MuiThemeProvider>
          <BrowserRouter ref='router'
                         basename={this.props.basename}>
            <Switch>
              {...this.getRoutes()}
            </Switch>
          </BrowserRouter>
        </MuiThemeProvider>
    );
  }

  public componentDidMount(): void {
    appContainer.bind<IRouter>(DI_TYPES.Router).toConstantValue(this.dynamicRouter);
  }

  public componentWillMount(): void {
    this.eventManager.add(window, 'unload', this.onUnload);
  }

  public componentWillUnmount(): void {
    this.eventManager.remove(window, 'unload', this.onUnload);
  }

  protected onUnload(): void {
    if (this.applicationSettings.usePersistence) {
      this.saveState();
    }
  }

  protected clearStateBeforeSerialization(state: TAppState): TAppState {
    state.notification = INITIAL_APPLICATION_NOTIFICATION_STATE;
    state.transport = INITIAL_APPLICATION_TRANSPORT_STATE;
    state.applicationReady = INITIAL_APPLICATION_READY_STATE;

    // You may clear the app state here before the serializing
    return state;
  }

  protected getRoutes(): JSX.Element[] {
    const props = this.props;
    return props.progress || props.error || !props.ready
        ? [
          <Info key={uuid()}
                emptyMessage={
                  props.progress
                      ? (props.progressMessage || 'Please wait...')
                      : (
                          props.error
                              ? (
                                  props.customError
                                      ? props.error
                                      : [
                                        this.t(props.errorMessage || 'The following error has occurred'),
                                        '"' + props.error.toLowerCase() + '"'
                                      ].join(' ')
                              )
                              : props.emptyMessage || 'The application is not ready.'
                      )
                }/>
        ]
        : this.buildRoutes(this.dynamicRoutes).concat(this.buildRoutes(this.extraRoutes));
  }

  protected lookupConnectComponentByRoutePath(path: string): RouteContainerT {
    let result: RouteContainerT;
    this.dynamicRoutes.forEach((config, ctor) => {
      if (toRouteConfig(config.routeConfig, this.routes).path === path) {
        result = ctor;
      }
    });
    return result;
  }

  protected registerRoute(container: RouteContainerT, config: ConnectorConfigT): void {
    this.extraRoutes.set(container, config);
  }

  protected registerLogoutRoute(): void {
    this.registerRoute(
        this.lookupConnectComponentByRoutePath(this.routes.login),
        {
          routeConfig: {
            type: ContainerVisibilityTypeEnum.PUBLIC,
            path: this.routes.logout,
            beforeEnter: this.onBeforeLogout,
          },
        }
    );
  }

  protected onBeforeLogout(): void {
    this.dispatch(APPLICATION_LOGOUT_ACTION_TYPE);
  }

  protected clearPreviousStates(): void {
    this.storage.each((o, key) => {
      if (key.endsWith(APPLICATION_STATE_KEY)) {
        this.storage.remove(key, true);
      }
    });
  }

  private buildRoutes(map: Map<RouteContainerT, ConnectorConfigT>): JSX.Element[] {
    const routes: JSX.Element[] = [];
    map.forEach((config, ctor) => {
      let Component;
      const routeConfig = toRouteConfig(config.routeConfig, this.routes);

      switch (routeConfig.type) {
        case ContainerVisibilityTypeEnum.PRIVATE:
          Component = PrivateRootContainer;
          break;
        case ContainerVisibilityTypeEnum.PUBLIC:
          Component = PublicRootContainer;
          break;
      }
      const props = {
        key: uuid(),
        exact: true,
        accessConfig: config.accessConfig,
        ...routeConfig,
      };
      routes.push(<Component container={ctor} {...props}/>);
    });
    return routes;
  }

  private saveState(): void {
    this.clearPreviousStates();
    this.storage.set(
        APPLICATION_STATE_KEY,
        this.clearStateBeforeSerialization(clone<TAppState>(this.appStore.getState() as TAppState))
    );
  }

  private get dynamicRouter(): IRouter {
    // We cannot to get access to history instance other way. This instance is private
    return Reflect.get(this.refs.router, 'history');
  }
}
