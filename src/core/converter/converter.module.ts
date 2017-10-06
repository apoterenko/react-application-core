import { appContainer, DI_TYPES } from '../di';

import { DateConverter } from './date.converter';
import { NumberConverter } from './number.converter';

appContainer.bind(DI_TYPES.DateConverter).to(DateConverter).inSingletonScope();
appContainer.bind(DI_TYPES.NumberConverter).to(NumberConverter).inSingletonScope();
