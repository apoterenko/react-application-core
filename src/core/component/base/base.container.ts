import { PureComponent } from 'react';
import { LocationState, Path } from 'history';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import { Store } from 'redux';

import { lazyInject, DI_TYPES } from 'core/di';
import { AnyT, IKeyValue } from 'core/definition.interface';
import { IApplicationPermissionState } from 'core/permission';
import { ROUTER_BACK_ACTION_TYPE, ROUTER_NAVIGATE_ACTION_TYPE } from 'core/router';
import { IApplicationState } from 'core/store';

import { IBaseContainer, IBaseContainerInternalProps, IBaseContainerInternalState } from './base.interface';

export class BaseContainer<TInternalProps extends IBaseContainerInternalProps,
                           TInternalState extends IBaseContainerInternalState>
    extends PureComponent<TInternalProps, TInternalState>
    implements IBaseContainer<TInternalProps, TInternalState> {

  @lazyInject(DI_TYPES.Translate) protected t: (k: string) => string;
  @lazyInject(DI_TYPES.Store) protected appStore: Store<IApplicationState<IApplicationPermissionState<AnyT>, AnyT>>;

  constructor(props: TInternalProps, public sectionName = 'section') {
    super(props);
    this.sectionName = props.sectionName || sectionName;
    this.navigateToBack = this.navigateToBack.bind(this);
  }

  public dispatch(type: string, data?: IKeyValue): void {
    this.appStore.dispatch({
      type: `${this.sectionName}.${type}`, data: { section: this.sectionName, ...data },
    });
  }

  public navigate(path: Path, state?: LocationState): void {
    this.appStore.dispatch({type: ROUTER_NAVIGATE_ACTION_TYPE, data: { path, state }});
  }

  public navigateToBack(): void {
    this.appStore.dispatch({ type: ROUTER_BACK_ACTION_TYPE });
  }
}
