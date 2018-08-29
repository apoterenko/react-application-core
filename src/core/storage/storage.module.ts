import { appContainer, staticInjector, DI_TYPES } from '../di';
import { IApplicationSettings,  } from '../settings';
import { APP_VERSION, APP_PROFILE, NORMALIZED_BASE_PATH, PORT } from '../env';
import { Storage } from './storage.service';
import { ApplicationStorageTypeEnum } from './storage.interface';
import { CloudFileStorage } from './cloud-file-storage.service';
import { joinStorageKeyPrefix } from './storage.support';
import { StorageHelper } from './storage.helper';

const settingsResolver = () => staticInjector<IApplicationSettings>(DI_TYPES.Settings);
const notVersionedKey = joinStorageKeyPrefix(PORT, APP_PROFILE, NORMALIZED_BASE_PATH);

appContainer.bind(DI_TYPES.Storage).toConstantValue(
  new Storage(
    joinStorageKeyPrefix(APP_VERSION, APP_PROFILE, PORT, NORMALIZED_BASE_PATH),
    settingsResolver,
  ),
);
appContainer.bind(DI_TYPES.NotVersionedPersistentStorage).toConstantValue(
  new Storage(notVersionedKey, settingsResolver, ApplicationStorageTypeEnum.LOCAL)
);
appContainer.bind(DI_TYPES.NotVersionedSessionStorage).toConstantValue(
  new Storage(notVersionedKey, settingsResolver, ApplicationStorageTypeEnum.SESSION)
);
appContainer.bind(DI_TYPES.CloudFileStorage).to(CloudFileStorage).inSingletonScope();
appContainer.bind(DI_TYPES.StorageHelper).to(StorageHelper).inSingletonScope();
