import {
  I$$permissionStoreProxyWrapper,
} from '../../../../definitions.interface';
import { IPermissionsService } from '../../../../definition';

/**
 * @stable [14.10.2019]
 */
export interface IPermissionStoreProxy
  extends IPermissionsService {
}

/**
 * @stable [11.09.2019]
 */
export interface IPermissionStoreProxyWrapperEntity
  extends I$$permissionStoreProxyWrapper<IPermissionStoreProxy> {
}
