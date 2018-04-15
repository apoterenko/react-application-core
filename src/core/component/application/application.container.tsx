import * as React from 'react';
import { BrowserRouter, Switch } from 'react-router-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import { clone, uuid, PredicateT, cloneUsingFilters, orNull } from '../../util';
import { DI_TYPES, appContainer, lazyInject } from '../../di';
import { IEventManager } from '../../event';
import { APPLICATION_STATE_KEY, IApplicationStorage } from '../../storage';
import { INITIAL_APPLICATION_NOTIFICATION_STATE } from '../../notification';
import { IRootContainerInternalProps, PrivateRootContainer, PublicRootContainer } from '../root';
import { CONNECTOR_SECTION_FIELD } from '../connector';
import { BASE_PATH } from '../../env';
import { INITIAL_APPLICATION_TRANSPORT_STATE } from '../../transport';
import { IDefaultApplicationState } from '../../store';
import { INITIAL_APPLICATION_CHANNEL_STATE } from '../../channel';
import { IApplicationContainerProps, INITIAL_APPLICATION_STATE } from './application.interface';
import { Message } from '../message';
import {
  IDefaultConnectorConfiguration,
  ContainerVisibilityTypeEnum,
  IRouteConfiguration,
} from '../../configurations-definitions.interface';
import { IContainerClassEntity, IRouterComponentEntity } from '../../entities-definitions.interface';
import { UniversalApplicationContainer } from './universal-application.container';

export class ApplicationContainer<TAppState extends IDefaultApplicationState>
    extends UniversalApplicationContainer<IApplicationContainerProps> {

  public static defaultProps: IApplicationContainerProps = {
    basename: BASE_PATH,
  };

  @lazyInject(DI_TYPES.Storage) private storage: IApplicationStorage;
  @lazyInject(DI_TYPES.EventManager) private eventManager: IEventManager;

  constructor(props: IApplicationContainerProps) {
    super(props);
    this.onUnload = this.onUnload.bind(this);
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
        <Message key={uuid()}
                 error={props.error}
                 progress={props.progress}
                 errorMessage={
                   orNull(
                     props.error || props.customError,
                     () => (
                       props.customError
                         ? props.error
                         : [
                           this.t(this.settings.messages.followingErrorHasOccurredMessage),
                           `"${props.error.toLowerCase()}"`
                         ].join(' ')
                     )
                   )
                 }
                 emptyMessage={this.settings.messages.appNotReadyMessage}
        />
      ]
      : super.getRoutes();
  }

  protected clearPreviousStates(): void {
    this.storage.each((o, key) => {
      if (key.endsWith(APPLICATION_STATE_KEY)) {
        this.storage.remove(key, true);
      }
    });
  }

  protected buildRoute(ctor: IContainerClassEntity,
                       connectorConfiguration: IDefaultConnectorConfiguration,
                       routeConfiguration: IRouteConfiguration): JSX.Element {
    let Component;
    switch (routeConfiguration.type) {
      case ContainerVisibilityTypeEnum.PRIVATE:
        Component = PrivateRootContainer;
        break;
      case ContainerVisibilityTypeEnum.PUBLIC:
        Component = PublicRootContainer;
        break;
    }
    const props: IRootContainerInternalProps = {
      exact: true,
      accessConfig: connectorConfiguration.accessConfiguration,
      initialChanges: connectorConfiguration.initialChanges,
      section: Reflect.get(ctor, CONNECTOR_SECTION_FIELD),
      ...routeConfiguration,
    };
    return (
      <Component key={uuid()}
                 container={ctor}
                 {...props}/>
    );
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
