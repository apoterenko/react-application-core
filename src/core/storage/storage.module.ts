import { appContainer, DI_TYPES } from '../di';

import { StorageService } from './storage.service';

appContainer.bind(DI_TYPES.Storage).to(StorageService);
