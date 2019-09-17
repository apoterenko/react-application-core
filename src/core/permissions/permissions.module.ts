import { bindInSingleton, DI_TYPES } from '../di';
import { PermissionsService } from './permissions.service';

/**
 * @stable [18.09.2019]
 */
bindInSingleton(DI_TYPES.Permission, PermissionsService);
