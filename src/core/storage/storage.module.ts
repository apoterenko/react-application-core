import { appContainer, DI_TYPES, getSettings } from '../di';
import { DefaultStorage } from './default/default-storage.service';
import { StorageTypesEnum, STORAGE_NOT_VERSIONED_KEY } from '../definition';
import { StorageHelper } from './storage.helper';
import './database/database-storage.module';
import './default/default-storage.module';
import './universal-storage.effects';

appContainer.bind(DI_TYPES.NotVersionedPersistentStorage).toConstantValue(
  new DefaultStorage(STORAGE_NOT_VERSIONED_KEY, getSettings, StorageTypesEnum.LOCAL)
);
appContainer.bind(DI_TYPES.NotVersionedSessionStorage).toConstantValue(
  new DefaultStorage(STORAGE_NOT_VERSIONED_KEY, getSettings, StorageTypesEnum.SESSION)
);
appContainer.bind(DI_TYPES.StorageHelper).to(StorageHelper).inSingletonScope();
