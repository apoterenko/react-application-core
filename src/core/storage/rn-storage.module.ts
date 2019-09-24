import { appContainer, DI_TYPES } from '../di';
import { RnStorage } from './rn-storage.service';
import { STORAGE_NOT_VERSIONED_KEY, STORAGE_VERSIONED_KEY } from '../definition';

appContainer.bind(DI_TYPES.Storage).toConstantValue(new RnStorage(STORAGE_VERSIONED_KEY));
appContainer.bind(DI_TYPES.NotVersionedPersistentStorage).toConstantValue(new RnStorage(STORAGE_NOT_VERSIONED_KEY));
