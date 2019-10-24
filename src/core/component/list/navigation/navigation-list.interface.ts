import {
  IScrollableComponentProps,
  ILayoutEntity,
} from '../../../definition';
import {
  INavigationListItemConfiguration,
} from '../../../configurations-definitions.interface';
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
    IItemsWrapper<INavigationListItemConfiguration[]>,
    IOnGroupClickWrapper<INavigationListItemConfiguration>,
    ILayoutEntity {
  dividerRendered?: boolean;
}
