import { IGridConfigurationWrapper } from '../../configurations-definitions.interface';
import { IGridWrapperEntity } from '../../entities-definitions.interface';
import { IContainerProps } from '../../props-definitions.interface';

/**
 * @stable [05.05.2018]
 */
export interface IGridContainerProps extends IContainerProps,
                                             IGridWrapperEntity,
                                             IGridConfigurationWrapper {
}
