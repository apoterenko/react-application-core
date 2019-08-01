import { appContainer, DI_TYPES } from '../di';
import { RnStorage } from './rn-storage.service';
import { VERSIONED_STORAGE_KEY, NOT_VERSIONED_STORAGE_KEY } from './storage.interface';

appContainer.bind(DI_TYPES.Storage).toConstantValue(new RnStorage(VERSIONED_STORAGE_KEY));
appContainer.bind(DI_TYPES.NotVersionedPersistentStorage).toConstantValue(new RnStorage(NOT_VERSIONED_STORAGE_KEY));
