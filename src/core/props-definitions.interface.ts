import { IContainerEntity, IFieldEntity } from './entities-definitions.interface';
import { IContainerConfiguration, IFieldConfiguration } from './configurations-definitions.interface';

/**
 * @stable [27.04.2018]
 */
export interface IContainerProps extends IContainerEntity,
                                         IContainerConfiguration {
}

/**
 * @stable [04.05.2018]
 */
export interface IFieldProps extends IFieldEntity,
                                     IFieldConfiguration {
}
