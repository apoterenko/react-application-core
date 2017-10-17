import { appContainer, DI_TYPES } from '../di';

import { StorageService } from './storage.service';
import { APP_VERSION, BASE_PATH } from '../env';

const PORT = location.port || '80';
const B_PATH = BASE_PATH.replace(/\//g, '');
const join = (...args: string[]) => (args.join('#'));

appContainer.bind(DI_TYPES.Storage).toConstantValue(new StorageService(join(APP_VERSION, PORT, B_PATH)));
appContainer.bind(DI_TYPES.TokenStorage).toConstantValue(new StorageService(join(PORT, B_PATH)));
