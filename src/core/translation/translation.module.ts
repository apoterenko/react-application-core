import { appContainer, DI_TYPES } from '../di';

appContainer.bind(DI_TYPES.Translate).toConstantValue((k) => k);
