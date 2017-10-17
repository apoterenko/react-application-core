import { AnyT } from '../definition.interface';

export interface IApplicationAccessConfig {
}

export interface IApplicationPermissionsState<TPermissions> {
  permissions: TPermissions;
}

export const INITIAL_PERMISSION_STATE: IApplicationPermissionsState<AnyT> = {
  permissions: null,
};

export interface IApplicationPermissionsService<TApplicationAccessConfig> {
  isAccessible(checkedObject: TApplicationAccessConfig): boolean;
  isAuthorized(): boolean;
}

export type ApplicationPermissionsServiceT = IApplicationPermissionsService<IApplicationAccessConfig>;

export const PERMISSION_DESTROY_ACTION_TYPE = 'permission.destroy';
export const PERMISSION_UPDATE_ACTION_TYPE = 'permission.update';
