import { IGridConfigurationWrapper } from '../../configurations-definitions.interface';
import { IGridWrapperEntity } from '../../entities-definitions.interface';
import { IContainerProps } from '../../props-definitions.interface';
import { IFilterChangesWrapper, IExpandedGroupsWrapper } from '../../definitions.interface';

/**
 * @stable [10.09.2018]
 */
export interface ITimeGridBuilderConfigEntity {
  hourFrom?: number;
  hourTo?: number;
  cellWidthFactor?: number;
  minPeriodAtMinutes?: number;
  timeResolver?: (hour: number, isBeforeNoon?: boolean) => number;
  timeAbbreviationResolver?: (isBeforeNoon?: boolean) => string;
}

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
