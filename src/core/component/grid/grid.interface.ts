import {
  IAllGroupsExpandedWrapper,
  IExpandedGroupsWrapper,
  IFilterChangesWrapper,
  IGridConfigurationWrapper,
  IKeyValue,
} from '../../definitions.interface';
import { IContainerProps, IReduxHolderListEntity, IGridProps } from '../../definition';

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

// TODO
export interface IGridContainerProps extends IContainerProps,
                                             IReduxHolderListEntity,
                                             IGridConfigurationWrapper<IGridProps> {
}

// TODO
export interface IGridState
  extends IFilterChangesWrapper,
    IExpandedGroupsWrapper<IKeyValue>,
    IAllGroupsExpandedWrapper {
  page?: number; // TODO
  closed?: boolean;
}
