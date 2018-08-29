import { appContainer, DI_TYPES } from '../di';
import { APP_VERSION, APP_PROFILE } from '../env';
import { RnStorage } from './rn-storage.service';
import { joinStorageKeyPrefix } from './storage.support';

appContainer.bind(DI_TYPES.Storage).toConstantValue(new RnStorage(joinStorageKeyPrefix(APP_VERSION, APP_PROFILE)));
appContainer.bind(DI_TYPES.NotVersionedPersistentStorage).toConstantValue(new RnStorage(joinStorageKeyPrefix(APP_PROFILE)));
