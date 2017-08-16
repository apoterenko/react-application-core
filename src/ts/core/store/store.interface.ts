import { IApplicationPermissionState } from '../permission/permission.interface';
import { IApplicationRootState } from '../component/root/root.interface';

export interface IApplicationState<TPermissionState extends IApplicationPermissionState> {
  root: IApplicationRootState;
  permission: TPermissionState;
}
