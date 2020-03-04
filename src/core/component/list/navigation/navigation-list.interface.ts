import {
  ILayoutEntity,
  INavigationItemEntity,
  IScrollableComponentProps,
} from '../../../definition';
import {
  IExpandedGroupsWrapper,
  IItemsWrapper,
  IKeyValue,
  IOnGroupClickWrapper,
} from '../../../definitions.interface';

/**
 * @stable [10.08.2018]
 */
export interface INavigationListProps
  extends IScrollableComponentProps,
    IExpandedGroupsWrapper<IKeyValue>,
    IItemsWrapper<INavigationItemEntity[]>,
    IOnGroupClickWrapper<INavigationItemEntity>,
    ILayoutEntity {
  dividerRendered?: boolean;
}
