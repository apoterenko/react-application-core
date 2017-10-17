import { AnyT } from '../definition.interface';

export interface IApplicationAccessConfig {
}

export interface IApplicationPermissionsState<TPermissions> {
  permissions: TPermissions;
}

export const INITIAL_PERMISSION_STATE: IApplicationPermissionsState<AnyT> = {
  permissions: null,
};

export interface IApplicationPermissionService<TApplicationAccessConfig> {
  isAccessible(checkedObject: TApplicationAccessConfig): boolean;
  isAuthorized(): boolean;
}

export type ApplicationPermissionServiceT = IApplicationPermissionService<IApplicationAccessConfig>;

export const PERMISSION_DESTROY_ACTION_TYPE = 'permission.destroy';
export const PERMISSION_UPDATE_ACTION_TYPE = 'permission.update';
