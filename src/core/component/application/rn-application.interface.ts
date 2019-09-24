import { IRnApplicationConfiguration } from '../../configurations-definitions.interface';
import { IApplicationEntity } from '../../definition';

/* @stable - 25.04.2018 */
export interface IRnApplicationContainerProps extends IApplicationEntity,
                                                      IRnApplicationConfiguration {
}
