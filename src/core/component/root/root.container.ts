import { Redirect, Route } from 'react-router-dom';
import * as URLSearchParams from 'url-search-params';

import { IKeyValue } from 'core/definition.interface';
import { DI_TYPES, lazyInject } from 'core/di';
import { IApplicationPermissionService, IApplicationPermissionState } from 'core/permission';
import { IApplicationState } from 'core/store';
import { BaseContainer, IBaseContainerInternalState } from 'core/component/base';

import {
  IRootContainerInternalProps,
  ROOT_PATH_UPDATE_ACTION_TYPE,
  ROOT_SECTION,
} from './root.interface';

export class RootContainer<TAppState extends IApplicationState<TPermissionState, TPermissions>,
                           TInternalProps extends IRootContainerInternalProps,
                           TInternalState extends IBaseContainerInternalState,
                           TPermissionState extends IApplicationPermissionState<TPermissions>,
                           TPermissionObject,
                           TPermissions>
    extends BaseContainer<TAppState,
                          TInternalProps,
                          TInternalState,
                          TPermissionState,
                          TPermissions> {

  @lazyInject(DI_TYPES.Permission) protected permissionService: IApplicationPermissionService<TPermissionObject>;

  constructor(props: TInternalProps) {
    super(props, ROOT_SECTION);
  }

  public componentWillMount(): void {
    if (this.props.beforeEnter) {
      this.props.beforeEnter();
    }
    this.dispatch(ROOT_PATH_UPDATE_ACTION_TYPE, { path: this.props.path });
  }

  public componentDidMount(): void {
    if (this.props.afterEnter) {
      this.props.afterEnter();
    }
  }

  protected get routeParams(): IKeyValue {
    return this.props.computedMatch.params;
  }

  protected get queryParams(): URLSearchParams {
    return new URLSearchParams(this.props.location.search);
  }

  protected get isAuthorized(): boolean {
    return this.permissionService.isAuthorized();
  }
}
