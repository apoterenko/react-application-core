import { appContainer, DI_TYPES } from '../di';
import { I18n } from './i18n.service';

appContainer.bind(DI_TYPES.I18n).to(I18n).inSingletonScope();
