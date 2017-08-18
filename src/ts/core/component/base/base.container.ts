import { Store } from 'redux';
import { BrowserRouter, Route, Redirect, Switch } from 'react-router-dom';
import { Path, LocationState } from 'history';

import { lazyInject } from '../../di/di.module';
import { DI_TYPES } from '../../di/di.interface';
import { BaseComponent } from './base.component';
import {
  IBaseContainerInternalProps,
  IBaseContainer,
  IBaseContainerInternalState
} from './base.interface';
import { ROUTER_NAVIGATE_ACTION_TYPE } from '../../router/router.interface';
import { IApplicationState } from '../../store/store.interface';
import { IApplicationPermissionState } from '../../permission/permission.interface';
import { IKeyValue } from '../../definition.interface';

export class BaseContainer<TContainer extends IBaseContainer<TInternalProps, TInternalState>,
                           TAppState extends IApplicationState<TPermissionState, TPermissions>,
                           TInternalProps extends IBaseContainerInternalProps,
                           TInternalState extends IBaseContainerInternalState,
                           TPermissionState extends IApplicationPermissionState<TPermissions>,
                           TPermissions>
    extends BaseComponent<TContainer, TInternalProps, TInternalState>
    implements IBaseContainer<TInternalProps, TInternalState> {

  @lazyInject(DI_TYPES.Store) protected appStore: Store<TAppState>;

  constructor(props: TInternalProps, public sectionName = 'section') {
    super(props);
  }

  dispatch(type: string, data?: IKeyValue): void {
    this.appStore.dispatch({
      type: `${this.sectionName}.${type}`, data: { section: this.sectionName, ...data }
    });
  }

  navigate(path: Path, state?: LocationState): void {
    this.appStore.dispatch({type: ROUTER_NAVIGATE_ACTION_TYPE, data: { path: path, state: state }});
  }

  protected get appState(): TAppState {
    return this.appStore.getState();
  }
}
