export interface IApplicationPermissionState {
  authorized: boolean;
}

export const INITIAL_PERMISSION_STATE: IApplicationPermissionState = {
  authorized: false
};

export interface IApplicationPermissionService<TPermissionObject> {
  isAccessible(object: TPermissionObject): boolean;
  isAuthorized(): boolean;
}
