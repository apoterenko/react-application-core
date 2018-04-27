import { IContainerEntity } from './entities-definitions.interface';
import { IContainerConfiguration } from './configurations-definitions.interface';

/**
 * @stable [27.04.2018]
 */
export interface IContainerProps extends IContainerEntity,
                                         IContainerConfiguration {
}
