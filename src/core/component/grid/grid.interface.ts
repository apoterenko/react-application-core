import { IGridConfiguration, IGridConfigurationWrapper } from '../../configurations-definitions.interface';
import { IGridEntity, IGridWrapperEntity, IContainerEntity } from '../../entities-definitions.interface';

/* @stable - 05.04.2018 */
export interface IGridInternalProps extends IGridConfiguration,
                                            IGridEntity {
}

/* @stable - 05.04.2018 */
export interface IGridContainerProps extends IContainerEntity,
                                             IGridConfigurationWrapper,
                                             IGridWrapperEntity {
}
