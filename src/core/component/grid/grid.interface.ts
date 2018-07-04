import { IGridConfigurationWrapper } from '../../configurations-definitions.interface';
import { IGridWrapperEntity } from '../../entities-definitions.interface';
import { IContainerProps } from '../../props-definitions.interface';
import { IFilterChangesWrapper, IExpandedGroupsWrapper } from '../../definitions.interface';

/**
 * @stable [05.05.2018]
 */
export interface IGridContainerProps extends IContainerProps,
                                             IGridWrapperEntity,
                                             IGridConfigurationWrapper {
}

/**
 * @stable [06.06.2018]
 */
export interface IGridState extends IFilterChangesWrapper,
                                    IExpandedGroupsWrapper {
}
