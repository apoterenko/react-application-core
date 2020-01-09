import {
  bindInSingleton,
  DI_TYPES,
} from '../di';

import { AsyncLibManager } from './async-lib-manager.service';

/**
 * @stable [08.01.2020]
 */
bindInSingleton(DI_TYPES.AsyncLibManager, AsyncLibManager);
