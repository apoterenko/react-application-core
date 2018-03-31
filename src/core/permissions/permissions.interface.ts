import { AnyT } from '../definitions.interface';

export interface IApplicationAccessConfig {
}

export interface IApplicationPermissionsState<TPermissions> {
  permissions: TPermissions;
}

export interface IApplicationPermissionsWrapperState<TPermissions> {
  permissions: IApplicationPermissionsState<TPermissions>;
}

export const INITIAL_PERMISSION_STATE: IApplicationPermissionsState<AnyT> = {
  permissions: null,
};

export interface IApplicationPermissionsService<TApplicationAccessConfig> {
  isAccessible(checkedObject: TApplicationAccessConfig): boolean;
  isAuthorized(): boolean;
}

export type ApplicationPermissionsServiceT = IApplicationPermissionsService<IApplicationAccessConfig>;

export const PERMISSIONS_DESTROY_ACTION_TYPE = 'permissions.destroy';
export const PERMISSIONS_UPDATE_ACTION_TYPE = 'permissions.update';
