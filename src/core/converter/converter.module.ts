import './date/date-converter.module';

import { appContainer, DI_TYPES } from '../di';

import { NumberConverter } from './number.converter';

appContainer.bind(DI_TYPES.NumberConverter).to(NumberConverter).inSingletonScope();
