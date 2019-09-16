import { appContainer, DI_TYPES, getSettings } from '../di';
import { DefaultStorage } from './default/default-storage.service';
import { StorageTypesEnum } from '../definition';
import { StorageHelper } from './storage.helper';
import { NOT_VERSIONED_STORAGE_KEY } from './storage.interface';
import './database/database-storage.module';
import './default/default-storage.module';

appContainer.bind(DI_TYPES.NotVersionedPersistentStorage).toConstantValue(
  new DefaultStorage(NOT_VERSIONED_STORAGE_KEY, getSettings, StorageTypesEnum.LOCAL)
);
appContainer.bind(DI_TYPES.NotVersionedSessionStorage).toConstantValue(
  new DefaultStorage(NOT_VERSIONED_STORAGE_KEY, getSettings, StorageTypesEnum.SESSION)
);
appContainer.bind(DI_TYPES.StorageHelper).to(StorageHelper).inSingletonScope();
