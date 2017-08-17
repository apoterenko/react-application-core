import * as React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter, Route, Redirect, Switch } from 'react-router-dom';

import { IBaseContainer, IBaseContainerInternalState } from '../base/base.interface';
import { BaseContainer } from '../base/base.container';
import { IApplicationPermissionState } from '../../permission/permission.interface';
import { IApplicationState } from '../../store/store.interface';
import { DI_TYPES } from '../../di/di.interface';
import { APPLICATION_STATE_KEY, IStorage } from '../../storage/storage.interface';
import { IEventManager } from '../../event/event-manager.interface';
import { IRouter } from '../../router/router.interface';
import { appContainer, lazyInject } from '../../di/di.module';
import { IApplicationContainerProps } from './application.interface';
import { clone } from '../../util/clone';
import { IApplicationSettings } from '../../settings/settings.interface';

export abstract class ApplicationContainer<TContainer extends IBaseContainer<TInternalProps, TInternalState>,
                                           TAppState extends IApplicationState<TPermissionState>,
                                           TInternalProps extends IApplicationContainerProps,
                                           TInternalState extends IBaseContainerInternalState,
                                           TPermissionState extends IApplicationPermissionState>
    extends BaseContainer<TContainer, TAppState, TInternalProps, TInternalState, TPermissionState> {

  @lazyInject(DI_TYPES.Storage) protected storage: IStorage;
  @lazyInject(DI_TYPES.EventManager) protected eventManager: IEventManager;
  @lazyInject(DI_TYPES.Settings) protected applicationSettings: IApplicationSettings;

  constructor(props: TInternalProps, sectionName = 'application') {
    super(props, sectionName);
    this.onUnload = this.onUnload.bind(this);
  }

  render(): JSX.Element {
    return (
        <Provider store={this.appStore}>
          <BrowserRouter ref='router'
                         basename={this.props.basename}
          >
            <Switch>
              {...this.routes}
            </Switch>
          </BrowserRouter>
        </Provider>
    );
  }

  componentWillMount(): void {
    super.componentWillMount();
    this.eventManager.add(window, 'unload', this.onUnload);
  }

  componentWillUnmount(): void {
    super.componentWillUnmount();
    this.eventManager.remove(window, 'unload', this.onUnload);
  }

  componentDidMount(): void {
    super.componentDidMount();
    appContainer.bind<IRouter>(DI_TYPES.Router).toConstantValue(
        // We cannot to get access to history instance other way. This instance is private
        Reflect.get(this.refs.router, 'history')
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
        this.clearStateBeforeSerialization(clone<TAppState>(this.appState))
    );
  }

  private restoreState(): TAppState {
    return this.storage.get(APPLICATION_STATE_KEY);
  }

  protected abstract get routes(): JSX.Element[];
}
