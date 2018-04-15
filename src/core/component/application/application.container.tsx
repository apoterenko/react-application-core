import * as React from 'react';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { LoggerFactory } from 'ts-smart-logger';

import { clone, uuid, PredicateT, cloneUsingFilters } from '../../util';
import { DI_TYPES, appContainer, lazyInject } from '../../di';
import { IEventManager } from '../../event';
import {
  toRouteConfigurations,
} from '../../router';
import { APPLICATION_STATE_KEY, IApplicationStorage } from '../../storage';
import { BaseContainer } from '../base';
import { INITIAL_APPLICATION_NOTIFICATION_STATE } from '../../notification';
import { IRootContainerInternalProps, PrivateRootContainer, PublicRootContainer } from '../root';
import { CONNECTOR_SECTION_FIELD } from '../connector';
import { BASE_PATH } from '../../env';
import { INITIAL_APPLICATION_TRANSPORT_STATE } from '../../transport';
import { IDefaultApplicationState } from '../../store';
import { CenterLayout } from '../layout';
import { INITIAL_APPLICATION_CHANNEL_STATE } from '../../channel';
import { IApplicationContainerProps } from './application.interface';
import {
  APPLICATION_LOGOUT_ACTION_TYPE,
  INITIAL_APPLICATION_STATE,
  APPLICATION_SECTION,
} from './application-reducer.interface';
import {
  IDefaultConnectorConfiguration,
  ContainerVisibilityTypeEnum,
} from '../../configurations-definitions.interface';
import { IContainerClassEntity, IRouterComponentEntity } from '../../entities-definitions.interface';

export class ApplicationContainer<TAppState extends IDefaultApplicationState>
    extends BaseContainer<IApplicationContainerProps, {}> {

  public static defaultProps: IApplicationContainerProps = {
    basename: BASE_PATH,
  };

  private static logger = LoggerFactory.makeLogger(ApplicationContainer);

  @lazyInject(DI_TYPES.Storage) private storage: IApplicationStorage;
  @lazyInject(DI_TYPES.DynamicRoutes) private dynamicRoutes: Map<IContainerClassEntity, IDefaultConnectorConfiguration>;
  @lazyInject(DI_TYPES.EventManager) private eventManager: IEventManager;

  private extraRoutes = new Map<IContainerClassEntity, IDefaultConnectorConfiguration>();

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
    appContainer.bind<IRouterComponentEntity>(DI_TYPES.Router).toConstantValue(this.dynamicRouter);
  }

  public componentWillMount(): void {
    this.eventManager.add(window, 'unload', this.onUnload);
  }

  public componentWillUnmount(): void {
    this.eventManager.remove(window, 'unload', this.onUnload);
  }

  protected onUnload(): void {
    if (this.settings.usePersistence) {
      this.saveState();
    }
  }

  protected clearStateBeforeSerialization(state: TAppState, ...predicates: PredicateT[]): TAppState {
    this.clearSystemState(state);

    // You may clear the app state here before the serializing
    if (predicates.length) {
      return cloneUsingFilters(state, ...predicates);
    }
    return state;
  }

  protected clearSystemState(state: TAppState): void {
    state.notification = INITIAL_APPLICATION_NOTIFICATION_STATE;
    state.transport = INITIAL_APPLICATION_TRANSPORT_STATE;
    state.application = INITIAL_APPLICATION_STATE;
    state.channel = INITIAL_APPLICATION_CHANNEL_STATE;
  }

  protected getRoutes(): JSX.Element[] {
    const props = this.props;
    return props.progress || props.error || !props.ready
        ? [
          <CenterLayout key={uuid()}>
            {
              props.progress
                  ? (this.t(props.progressMessage || this.settings.messages.waitMessage))
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
                          : this.t(props.emptyMessage || 'The application is not ready.')
                  )
            }
          </CenterLayout>
        ]
        : this.buildAllRoutes();
  }

  protected buildAllRoutes(): JSX.Element[] {
    return this.buildRoutes(this.dynamicRoutes).concat(this.buildRoutes(this.extraRoutes));
  }

  protected lookupConnectedComponentByRoutePath(path: string): IContainerClassEntity {
    let result;
    this.dynamicRoutes.forEach((config, ctor) => {
      if (toRouteConfigurations(config.routeConfiguration, this.routes).path === path) {
        result = ctor;
      }
    });
    return result;
  }

  protected registerRoute(container: IContainerClassEntity, config: IDefaultConnectorConfiguration): void {
    this.extraRoutes.set(container, config);
  }

  protected registerLogoutRoute(): void {
    const loginContainer = this.lookupConnectedComponentByRoutePath(this.routes.signIn);
    if (!loginContainer) {
      ApplicationContainer.logger.warn('[$ApplicationContainer] The login route is not registered.');
    } else {
      this.registerRoute(
          loginContainer,
          {
            routeConfiguration: {
              type: ContainerVisibilityTypeEnum.PUBLIC,
              path: this.routes.logout,
              beforeEnter: this.onBeforeLogout,
            },
          }
      );
    }
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

  private buildRoutes(map: Map<IContainerClassEntity, IDefaultConnectorConfiguration>): JSX.Element[] {
    const routes: JSX.Element[] = [];
    map.forEach((config, ctor) => {
      let Component;
      const routeConfig = toRouteConfigurations(config.routeConfiguration, this.routes);

      switch (routeConfig.type) {
        case ContainerVisibilityTypeEnum.PRIVATE:
          Component = PrivateRootContainer;
          break;
        case ContainerVisibilityTypeEnum.PUBLIC:
          Component = PublicRootContainer;
          break;
      }
      const props: IRootContainerInternalProps = {
        exact: true,
        accessConfig: config.accessConfiguration,
        initialChanges: config.initialChanges,
        section: Reflect.get(ctor, CONNECTOR_SECTION_FIELD),
        ...routeConfig,
      };
      routes.push(<Component key={uuid()}
                             container={ctor}
                             {...props}/>);
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

  private get dynamicRouter(): IRouterComponentEntity {
    // We cannot to get access to history instance other way. This instance is private
    return Reflect.get(this.refs.router, 'history');
  }
}
