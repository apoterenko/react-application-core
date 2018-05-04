import { AnyT } from '../definitions.interface';
import { IAccessConfiguration } from '../configurations-definitions.interface';

export interface IApplicationPermissionsState<TPermissions> {
  permissions: TPermissions;
}

export interface IApplicationPermissionsWrapperState<TPermissions> {
  permissions: IApplicationPermissionsState<TPermissions>;
}

export const INITIAL_PERMISSION_STATE: IApplicationPermissionsState<AnyT> = {
  permissions: null,
};

export interface IPermissionsService<TAccessConfig = IAccessConfiguration> {
  isAccessible(checkedObject: TAccessConfig): boolean;
}

export const PERMISSIONS_DESTROY_ACTION_TYPE = 'permissions.destroy';
export const PERMISSIONS_UPDATE_ACTION_TYPE = 'permissions.update';
