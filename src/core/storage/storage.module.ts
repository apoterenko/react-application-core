import { appContainer, staticInjector, DI_TYPES } from '../di';

import { Storage } from './storage.service';
import { IApplicationSettings,  } from '../settings';
import { APP_VERSION, APP_PROFILE, NORMALIZED_BASE_PATH, PORT } from '../env';
import { ApplicationStorageTypeEnum, STORAGE_KEY_SEPARATOR } from '../storage';

const join = (...parts: string[]) => parts.filter((v) => !!v).join(STORAGE_KEY_SEPARATOR);
const settingsResolver = () => staticInjector<IApplicationSettings>(DI_TYPES.Settings);

appContainer.bind(DI_TYPES.Storage).toConstantValue(
    new Storage(
        join(APP_VERSION, APP_PROFILE, PORT, NORMALIZED_BASE_PATH),
        settingsResolver,
    ),
);
appContainer.bind(DI_TYPES.NotVersionedStorage).toConstantValue(
    new Storage(
        join(PORT, APP_PROFILE, NORMALIZED_BASE_PATH),
        settingsResolver,
        ApplicationStorageTypeEnum.LOCAL
    )
);
