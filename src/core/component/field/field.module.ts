import { appContainer, DI_TYPES } from '../../di';
import { IFieldsOptions } from './field';

appContainer.bind<IFieldsOptions>(DI_TYPES.FieldsOptions).toConstantValue({});
