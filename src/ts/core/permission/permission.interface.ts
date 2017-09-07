export interface IApplicationPermissionState<TPermissions> {
  authorized: boolean;
  permissions: TPermissions;
}

export const INITIAL_PERMISSION_STATE: IApplicationPermissionState<any> = {
  authorized: false,
  permissions: null,
};

export interface IApplicationPermissionService<TPermissionObject> {
  isAccessible(object: TPermissionObject): boolean;
  isAuthorized(): boolean;
}

export const PERMISSION_DESTROY_ACTION_TYPE = 'permission.destroy';
export const PERMISSION_AUTHORIZED_UPDATE_ACTION_TYPE = 'permission.authorized.update';
export const PERMISSION_PERMISSIONS_UPDATE_ACTION_TYPE = 'permission.permissions.update';
