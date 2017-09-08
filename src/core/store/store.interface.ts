import { AnyT } from 'core/definition.interface';
import { IApplicationRootState, INITIAL_APPLICATION_ROOT_STATE } from 'core/component/root';
import { IApplicationPermissionState, INITIAL_PERMISSION_STATE } from 'core/permission';
import { IApplicationUserState, INITIAL_USER_STATE } from 'core/user';
import { IApplicationLayoutState, INITIAL_APPLICATION_LAYOUT_STATE } from 'core/component/layout';

export interface IApplicationState<TPermissionState extends IApplicationPermissionState<TPermissions>,
                                   TPermissions> {
  root: IApplicationRootState;
  permission: TPermissionState;
  user: IApplicationUserState;
  layout: IApplicationLayoutState;
}

export const INITIAL_APPLICATION_STATE: IApplicationState<IApplicationPermissionState<AnyT>, AnyT> = {
  permission: INITIAL_PERMISSION_STATE,
  root: INITIAL_APPLICATION_ROOT_STATE,
  user: INITIAL_USER_STATE,
  layout: INITIAL_APPLICATION_LAYOUT_STATE,
};
