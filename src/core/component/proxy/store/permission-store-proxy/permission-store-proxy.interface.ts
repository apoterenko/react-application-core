import {
  I$$permissionStoreProxyWrapper,
} from '../../../../definitions.interface';
import { IPermissionsManager } from '../../../../definition';

/**
 * @deprecated
 */
export interface IPermissionStoreProxy
  extends IPermissionsManager {
}

/**
 * @deprecated
 */
export interface IPermissionStoreProxyWrapperEntity
  extends I$$permissionStoreProxyWrapper<IPermissionStoreProxy> {
}
