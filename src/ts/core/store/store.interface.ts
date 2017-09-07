import { IApplicationRootState, INITIAL_APPLICATION_ROOT_STATE } from 'core/component';
import { IApplicationPermissionState, INITIAL_PERMISSION_STATE } from 'core/permission';
import { IApplicationUserState, INITIAL_USER_STATE } from 'core/user';

export interface IApplicationState<TPermissionState extends IApplicationPermissionState<TPermissions>,
                                   TPermissions> {
  root: IApplicationRootState;
  permission: TPermissionState;
  user: IApplicationUserState;
}

export const INITIAL_APPLICATION_STATE: IApplicationState<IApplicationPermissionState<any>, any> = {
  permission: INITIAL_PERMISSION_STATE,
  root: INITIAL_APPLICATION_ROOT_STATE,
  user: INITIAL_USER_STATE,
};
