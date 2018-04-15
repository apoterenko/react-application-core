import { appContainer, DI_TYPES } from '../../di';

import { NumberConverter } from './number-converter.service';

appContainer.bind(DI_TYPES.NumberConverter).to(NumberConverter).inSingletonScope();
