import { IPermissionsWrapper } from '../definitions.interface';

/**
 * @stable [14.10.2019]
 */
export interface IPermissionsManager<TAccessConfig = {}> {
  isAccessible(checkedObject: TAccessConfig): boolean;
}

/**
 * @stable [18.09.2019]
 */
export interface IPermissionsWrapperEntity<TPermissions>
  extends IPermissionsWrapper<TPermissions> {
}
