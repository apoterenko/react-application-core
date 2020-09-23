import {
  bindInSingleton,
  DI_TYPES,
} from '../../di';

import { ModifyEntityFactory } from './modify-entity.factory';

/**
 * @stable [23.09.2020]
 */
bindInSingleton(DI_TYPES.ModifyEntityFactory, ModifyEntityFactory);
