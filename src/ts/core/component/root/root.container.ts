import { Route, Redirect } from 'react-router-dom';

import { IRootContainerInternalProps, ROOT_PATH_UPDATE_ACTION_TYPE, ROOT_SECTION } from './root.interface';
import { IKeyValue } from '../../definition.interface';
import { IApplicationState } from '../../store/store.interface';
import { IBaseContainer, IBaseContainerInternalState } from '../base/base.interface';
import { IApplicationPermissionService, IApplicationPermissionState } from '../../permission/permission.interface';
import { BaseContainer } from '../base/base.container';
import { DI_TYPES } from '../../di/di.interface';
import { lazyInject } from '../../di/di.module';

export class RootContainer<TContainer extends IBaseContainer<TInternalProps, TInternalState>,
    TAppState extends IApplicationState<TPermissionState>,
    TInternalProps extends IRootContainerInternalProps,
    TInternalState extends IBaseContainerInternalState,
    TPermissionState extends IApplicationPermissionState,
    TPermissionObject>
    extends BaseContainer<TContainer, TAppState, TInternalProps, TInternalState, TPermissionState> {

  @lazyInject(DI_TYPES.Permission) protected permissionService: IApplicationPermissionService<TPermissionObject>;

  constructor(props: TInternalProps) {
    super(props, ROOT_SECTION);
  }

  componentWillMount(): void {
    this.dispatch(ROOT_PATH_UPDATE_ACTION_TYPE, this.props.path);

    // The super method must be executed after change a root path!!
    super.componentWillMount();
  }

  protected get routeParams(): IKeyValue {
    return this.props.computedMatch.params;
  }

  protected get isAuthorized(): boolean {
    return this.permissionService.isAuthorized();
  }
}
