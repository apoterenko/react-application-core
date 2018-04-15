import { IApplicationEntity } from '../../entities-definitions.interface';
import { IApplicationConfiguration } from '../../configurations-definitions.interface';

/* @stable - 15.04.2018 */
export interface IApplicationContainerProps extends IApplicationEntity,
                                                    IApplicationConfiguration {
}
