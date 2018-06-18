import { appContainer, DI_TYPES } from '../../di';
import { IFieldsConfigurations } from '../../configurations-definitions.interface';

appContainer.bind<IFieldsConfigurations>(DI_TYPES.FieldsOptions).toConstantValue({});
