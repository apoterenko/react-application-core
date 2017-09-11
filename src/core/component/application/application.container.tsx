import * as React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import { DI_TYPES, appContainer, lazyInject } from 'core/di';
import { IEventManager } from 'core/event';
import { IApplicationPermissionService, IApplicationPermissionState } from 'core/permission';
import { IRouter } from 'core/router';
import { IApplicationSettings } from 'core/settings';
import { APPLICATION_STATE_KEY, IStorage } from 'core/storage';
import { IApplicationState } from 'core/store';
import { clone } from 'core/util';
import { BaseContainer, IBaseContainerInternalState } from 'core/component/base';

import { IApplicationContainerProps } from './application.interface';

export abstract class ApplicationContainer<TAppState extends IApplicationState<TPermissionState, TPermissions>,
                                           TInternalProps extends IApplicationContainerProps,
                                           TInternalState extends IBaseContainerInternalState,
                                           TPermissionState extends IApplicationPermissionState<TPermissions>,
                                           TPermissions,
                                           TPermissionObject>
    extends BaseContainer<TAppState, TInternalProps, TInternalState, TPermissionState, TPermissions> {

  @lazyInject(DI_TYPES.Storage) protected storage: IStorage;
  @lazyInject(DI_TYPES.EventManager) protected eventManager: IEventManager;
  @lazyInject(DI_TYPES.Settings) protected applicationSettings: IApplicationSettings;
  @lazyInject(DI_TYPES.Permission) protected permissionService: IApplicationPermissionService<TPermissionObject>;

  constructor(props: TInternalProps, sectionName = 'application') {
    super(props, sectionName);
    this.onUnload = this.onUnload.bind(this);
  }

  public render(): JSX.Element {
    return (
        <MuiThemeProvider>
          <Provider store={this.appStore}>
            <BrowserRouter ref='router'
                           basename={this.props.basename}
            >
              <Switch>
                {...this.routes}
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

  protected clearStateBeforeSerialization(state: TAppState): TAppState {
    return state;
  }

  private saveState(): void {
    this.storage.set(APPLICATION_STATE_KEY,
        this.clearStateBeforeSerialization(clone<TAppState>(this.appState)),
    );
  }

  protected get isAuthorized(): boolean {
    return this.permissionService.isAuthorized();
  }

  protected abstract get routes(): JSX.Element[];
}
