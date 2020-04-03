import {
  bindInSingleton,
  DI_TYPES,
} from '../../di';
import { MultiEntityDatabaseStorage } from './multi-entity-database-storage.service';

/**
 * @stable [03.04.2020]
 */
bindInSingleton(DI_TYPES.MultiEntityDatabaseStorage, MultiEntityDatabaseStorage);
