import { AnyT } from '../definition.interface';

export interface IApplicationAccessConfig {
}

export interface IApplicationPermissionsState<TPermissions> {
  authorized: boolean;
  permissions: TPermissions;
}

export const INITIAL_PERMISSION_STATE: IApplicationPermissionsState<AnyT> = {
  authorized: false,
  permissions: null,
};

export interface IApplicationPermissionsService<TApplicationAccessConfig> {
  isAccessible(checkedObject: TApplicationAccessConfig): boolean;
  isAuthorized(): boolean;
}

export type ApplicationPermissionsServiceT = IApplicationPermissionsService<IApplicationAccessConfig>;

export const PERMISSION_DESTROY_ACTION_TYPE = 'permission.destroy';
export const PERMISSION_AUTHORIZED_UPDATE_ACTION_TYPE = 'permission.authorized.update';
export const PERMISSION_PERMISSIONS_UPDATE_ACTION_TYPE = 'permission.permissions.update';
