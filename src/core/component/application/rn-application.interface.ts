import { IRnApplicationConfiguration } from '../../configurations-definitions.interface';
import { IRnApplicationEntity } from '../../entities-definitions.interface';

/* @stable - 25.04.2018 */
export interface IRnApplicationContainerProps extends IRnApplicationEntity,
                                                      IRnApplicationConfiguration {
}
