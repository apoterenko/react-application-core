import { AnyT } from 'core/definition.interface';
import { IContainerWrapperCtor } from 'core/component/application';
import { IBaseContainer } from 'core/component/base';

export interface IProtectedComponentCtor<TPermissionObject>
    extends IContainerWrapperCtor<IProtectedComponentCtor<TPermissionObject>, {}, {}>,
                                  IBaseContainer<{}, {}> {
  $$permissionConfig: TPermissionObject;
  new(...args);
}

export interface IApplicationPermissionsState<TPermissions> {
  authorized: boolean;
  permissions: TPermissions;
}

export const INITIAL_PERMISSION_STATE: IApplicationPermissionsState<AnyT> = {
  authorized: false,
  permissions: null,
};

export interface IApplicationPermissionsService<TPermissionObject> {
  isAccessible(checkedObject: TPermissionObject): boolean;
  isAuthorized(): boolean;
}

export const PERMISSION_DESTROY_ACTION_TYPE = 'permission.destroy';
export const PERMISSION_AUTHORIZED_UPDATE_ACTION_TYPE = 'permission.authorized.update';
export const PERMISSION_PERMISSIONS_UPDATE_ACTION_TYPE = 'permission.permissions.update';
