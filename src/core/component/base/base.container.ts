import { PureComponent } from 'react';
import { LocationState, Path } from 'history';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import { Store } from 'redux';

import { lazyInject, DI_TYPES } from 'core/di';
import { IKeyValue, NEW_OPTION } from 'core/definition.interface';
import { IApplicationPermissionsState } from 'core/permission';
import { ROUTER_NAVIGATE_BACK_ACTION_TYPE, ROUTER_NAVIGATE_ACTION_TYPE } from 'core/router';
import { IApplicationState } from 'core/store';
import { DictionariesActionBuilder } from 'core/dictionary';
import { IApplicationAccessConfig, IApplicationPermissionsService } from 'core/permission';

import { IBaseContainer, IBaseContainerInternalProps, IBaseContainerInternalState } from './base.interface';

export class BaseContainer<TInternalProps extends IBaseContainerInternalProps,
                           TInternalState extends IBaseContainerInternalState>
    extends PureComponent<TInternalProps, TInternalState>
    implements IBaseContainer<TInternalProps, TInternalState> {

  @lazyInject(DI_TYPES.Translate) protected t: (k: string) => string;
  @lazyInject(DI_TYPES.Store) protected appStore: Store<IApplicationState<{}, IApplicationPermissionsState<{}>, {}>>;
  @lazyInject(DI_TYPES.Permission) protected permissionService: IApplicationPermissionsService<IApplicationAccessConfig>;

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
    this.appStore.dispatch({ type: ROUTER_NAVIGATE_BACK_ACTION_TYPE });
  }

  protected dispatchLoadDictionary(dictionary: string): void {
    this.appStore.dispatch({
      type: DictionariesActionBuilder.buildLoadActionType(dictionary),
      data: { section: dictionary },
    });
  }

  protected get isRouteParamIdEqualNewOption(): boolean {
    return this.props.routeParams.id === NEW_OPTION;
  }
}
