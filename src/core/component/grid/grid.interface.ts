import {
  IAllGroupsExpandedWrapper,
  IExpandedGroupsWrapper,
  IFilterChangesWrapper,
  IGridConfigurationWrapper,
  IKeyValue,
} from '../../definitions.interface';
import { IContainerProps, IReduxListHolderEntity, IGridProps } from '../../definition';

// TODO
export interface IGridContainerProps extends IContainerProps,
                                             IReduxListHolderEntity,
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
