import { appContainer, DI_TYPES } from 'core/di';

import { DateConverter } from './date.converter';

appContainer.bind(DI_TYPES.DateConverter).to(DateConverter);
