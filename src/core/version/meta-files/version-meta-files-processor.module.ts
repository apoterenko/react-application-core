import {
  bindInSingleton,
  DI_TYPES,
} from '../../di';
import { VersionMetaFilesProcessor } from './version-meta-files-processor.service';

/**
 * @stable [16.09.2019]
 */
bindInSingleton(DI_TYPES.VersionProcessor, VersionMetaFilesProcessor);
