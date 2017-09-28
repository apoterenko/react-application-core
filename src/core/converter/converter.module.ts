import { appContainer, DI_TYPES } from '../di';

import { DateConverter } from './date.converter';

appContainer.bind(DI_TYPES.DateConverter).to(DateConverter);
