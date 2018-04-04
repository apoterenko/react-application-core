import { IBaseContainerInternalProps, IBaseComponentInternalProps } from '../base';
import { IGridConfiguration, IGridConfigurationWrapper } from '../../configurations-definitions.interface';
import { IGridEntity, IGridWrapperEntity } from '../../entities-definitions.interface';

/* @stable - 05.04.2018 */
export interface IGridInternalProps extends IBaseComponentInternalProps,
                                            IGridConfiguration,
                                            IGridEntity {
}

/* @stable - 05.04.2018 */
export interface IGridContainerInternalProps extends IBaseContainerInternalProps,
                                                     IGridConfigurationWrapper,
                                                     IGridWrapperEntity {
}
