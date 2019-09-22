import { IXYEntity, IUniversalComponentEntity } from '../../../definition';
import {
  INavigationListItemConfiguration,
} from '../../../configurations-definitions.interface';
import {
  IItemsWrapper,
  IExpandedGroupsWrapper,
  IOnGroupClickWrapper,
  IOnScrollWrapper,
} from '../../../definitions.interface';
import { ILayoutEntity } from '../../../entities-definitions.interface';

/**
 * @stable [10.08.2018]
 */
export interface INavigationListProps
  extends IUniversalComponentEntity,
    IExpandedGroupsWrapper,
    IItemsWrapper<INavigationListItemConfiguration[]>,
    IOnScrollWrapper<IXYEntity>,
    IOnGroupClickWrapper<INavigationListItemConfiguration>,
    ILayoutEntity {
  dividerRendered?: boolean;
}
