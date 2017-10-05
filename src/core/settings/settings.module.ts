import { appContainer, DI_TYPES } from '../di';

import { DEFAULT_APPLICATION_SETTINGS } from './settings.interface';

appContainer.bind(DI_TYPES.Settings).toConstantValue(DEFAULT_APPLICATION_SETTINGS);
