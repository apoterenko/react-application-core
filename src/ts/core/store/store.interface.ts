import { IApplicationPermissionState } from '../permission/permission.interface';

export interface IApplicationState<TPermissionState extends IApplicationPermissionState> {
  permission: TPermissionState;
}
