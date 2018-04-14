import { IBaseContainerInternalProps } from '../../component/base';
import { IApplicationEntity } from '../../entities-definitions.interface';
import { IApplicationConfiguration } from '../../configurations-definitions.interface';

/* @stable - 11.04.2018 */
export interface IApplicationContainerProps extends IBaseContainerInternalProps,
                                                    IApplicationConfiguration,
                                                    IApplicationEntity {
}
