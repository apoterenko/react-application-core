import { IXYEntity } from '../../../entities-definitions.interface';
import {
  INavigationListItemConfiguration,
  IUniversalComponentConfiguration,
} from '../../../configurations-definitions.interface';
import {
  IItemsWrapper,
  IExpandedGroupsWrapper,
  IOnGroupClickWrapper,
  IOnScrollWrapper,
} from '../../../definitions.interface';
import { ILayoutEntity } from '../../../entities-definitions.interface';

/**
 * @stable [23.09.2018]
 */
export interface INavigationListConfiguration extends IUniversalComponentConfiguration,
                                                      IExpandedGroupsWrapper,
                                                      IItemsWrapper<INavigationListItemConfiguration[]>,
                                                      IOnScrollWrapper<IXYEntity>,
                                                      IOnGroupClickWrapper<INavigationListItemConfiguration> {
}

/**
 * @stable [10.08.2018]
 */
export interface INavigationListEntity extends ILayoutEntity {
}

/**
 * @stable [10.08.2018]
 */
export interface INavigationListProps extends INavigationListConfiguration,
                                              INavigationListEntity {
}
