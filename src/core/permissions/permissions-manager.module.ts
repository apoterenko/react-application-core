import { bindInSingleton, DI_TYPES } from '../di';
import { PermissionsManager } from './permissions-manager.service';

/**
 * @stable [18.09.2019]
 */
bindInSingleton(DI_TYPES.PermissionsManager, PermissionsManager);
