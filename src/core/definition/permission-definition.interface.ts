import { IPermissionsWrapper } from '../definitions.interface';

/**
 * @stable [14.10.2019]
 */
export interface IPermissionsManager<TPermission = {}, TPermissions = {}> {
  hasPermission(permissions: TPermissions, checkedObject: TPermission): boolean;
  isAccessible(checkedObject: TPermission): boolean;
}

/**
 * @stable [18.09.2019]
 */
export interface IPermissionsWrapperEntity<TPermissions>
  extends IPermissionsWrapper<TPermissions> {
}
