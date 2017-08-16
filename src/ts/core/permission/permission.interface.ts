export interface IApplicationPermissionState {
  authorized: boolean;
}

export interface IApplicationPermissionService<TPermissionObject> {
  isAccessible(object: TPermissionObject): boolean;
  isAuthorized(): boolean;
}
