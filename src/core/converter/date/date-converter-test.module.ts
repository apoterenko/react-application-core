import { appContainer } from '../../di';
import { DateConverter } from './date-converter.service';

appContainer.bind(DateConverter).to(DateConverter).inSingletonScope();
