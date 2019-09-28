import {
  IXYEntity,
  IUniversalComponentEntity,
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
  IOnScrollWrapper,
} from '../../../definitions.interface';

/**
 * @stable [10.08.2018]
 */
export interface INavigationListProps
  extends IUniversalComponentEntity,
    IExpandedGroupsWrapper<IKeyValue>,
    IItemsWrapper<INavigationListItemConfiguration[]>,
    IOnScrollWrapper<IXYEntity>,
    IOnGroupClickWrapper<INavigationListItemConfiguration>,
    ILayoutEntity {
  dividerRendered?: boolean;
}
