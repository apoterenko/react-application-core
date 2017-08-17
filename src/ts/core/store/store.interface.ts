import {
  IApplicationPermissionState,
  INITIAL_PERMISSION_STATE
} from '../permission/permission.interface';
import {
  IApplicationRootState,
  INITIAL_APPLICATION_ROOT_STATE
} from '../component/root/root.interface';

export interface IApplicationState<TPermissionState extends IApplicationPermissionState<TPermissions>,
                                   TPermissions> {
  root: IApplicationRootState;
  permission: TPermissionState;
}

export const INITIAL_APPLICATION_STATE: IApplicationState<IApplicationPermissionState<any>, any> = {
  root: INITIAL_APPLICATION_ROOT_STATE,
  permission: INITIAL_PERMISSION_STATE
};
