import {
  appContainer,
  DI_TYPES,
  getSettings,
} from '../di';
import {
  STORAGE_NOT_VERSIONED_KEY,
  StorageTypesEnum,
} from '../definition';
import { DefaultStorage } from './default/default-storage.service';
import './database/database-storage.module';
import './default/default-storage.module';
import './multi-entity/multi-entity-storage.module';
import './universal-storage.effects';

/**
 * @stable [03.04.2020]
 */
appContainer.bind(DI_TYPES.NotVersionedPersistentStorage).toConstantValue(
  new DefaultStorage(STORAGE_NOT_VERSIONED_KEY, getSettings, StorageTypesEnum.LOCAL)
);

/**
 * @stable [03.04.2020]
 */
appContainer.bind(DI_TYPES.NotVersionedSessionStorage).toConstantValue(
  new DefaultStorage(STORAGE_NOT_VERSIONED_KEY, getSettings, StorageTypesEnum.SESSION)
);
