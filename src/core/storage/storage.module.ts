import { appContainer, staticInjector, DI_TYPES } from '../di';
import { IApplicationSettings,  } from '../settings';
import { APP_VERSION, APP_PROFILE, NORMALIZED_BASE_PATH, PORT } from '../env';
import { Storage } from './storage.service';
import { ApplicationStorageTypeEnum } from './storage.interface';
import { CloudFileStorage } from './cloud-file-storage.service';
import { joinStorageKeyPrefix } from './storage.support';

const settingsResolver = () => staticInjector<IApplicationSettings>(DI_TYPES.Settings);

appContainer.bind(DI_TYPES.Storage).toConstantValue(
    new Storage(
        joinStorageKeyPrefix(APP_VERSION, APP_PROFILE, PORT, NORMALIZED_BASE_PATH),
        settingsResolver,
    ),
);
appContainer.bind(DI_TYPES.NotVersionedStorage).toConstantValue(
    new Storage(
        joinStorageKeyPrefix(PORT, APP_PROFILE, NORMALIZED_BASE_PATH),
        settingsResolver,
        ApplicationStorageTypeEnum.LOCAL
    )
);
appContainer.bind(DI_TYPES.CloudFileStorage).to(CloudFileStorage).inSingletonScope();
