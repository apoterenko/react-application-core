import { appContainer, DI_TYPES } from '../di';
import { ENV } from '../env';
import { RnStorage } from './rn-storage.service';
import { joinStorageKeyPrefix } from './storage.support';

appContainer.bind(DI_TYPES.Storage).toConstantValue(new RnStorage(joinStorageKeyPrefix(ENV.appVersion, ENV.appProfile)));
appContainer.bind(DI_TYPES.NotVersionedPersistentStorage).toConstantValue(new RnStorage(joinStorageKeyPrefix(ENV.appProfile)));
