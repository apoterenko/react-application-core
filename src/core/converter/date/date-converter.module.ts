import { appContainer, DI_TYPES } from '../../di';
import { DateConverter } from './date-converter.service';

appContainer.bind(DI_TYPES.DateConverter).to(DateConverter).inSingletonScope();
