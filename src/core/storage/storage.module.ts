import { appContainer, DI_TYPES } from '../di';

import { StorageService } from './storage.service';
import { APP_VERSION, APP_PROFILE, NORMALIZED_BASE_PATH, PORT } from '../env';
import { ApplicationStorageTypeEnum, STORAGE_KEY_SEPARATOR } from '../storage';
import { staticInjector } from 'core';

const join = (...args: string[]) => args.filter((v) => !!v).join(STORAGE_KEY_SEPARATOR);
const settingsResolver = () => staticInjector(DI_TYPES.Settings);

appContainer.bind(DI_TYPES.Storage).toConstantValue(
    new StorageService(
        join(APP_VERSION, APP_PROFILE, PORT, NORMALIZED_BASE_PATH),
        settingsResolver,
    ),
);
appContainer.bind(DI_TYPES.NotVersionedStorage).toConstantValue(
    new StorageService(
        join(PORT, APP_PROFILE, NORMALIZED_BASE_PATH),
        settingsResolver,
        ApplicationStorageTypeEnum.LOCAL
    )
);
