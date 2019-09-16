import { bindInSingleton, DI_TYPES } from '../di';
import { VersionProcessor } from './version-processor.service';

/**
 * @stable [16.09.2019]
 */
bindInSingleton(DI_TYPES.VersionProcessor, VersionProcessor);
