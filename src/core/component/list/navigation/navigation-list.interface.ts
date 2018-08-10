import { IXYEntity } from '../../../entities-definitions.interface';
import {
  INavigationListItemConfiguration,
  IUniversalComponentConfiguration,
} from '../../../configurations-definitions.interface';
import { IItemsWrapper, IOnChangeWrapper } from '../../../definitions.interface';

/**
 * @stable [10.08.2018]
 */
export interface INavigationListConfiguration extends IUniversalComponentConfiguration,
                                                      IItemsWrapper<INavigationListItemConfiguration[]>,
                                                      IOnChangeWrapper<IXYEntity> {
}

/**
 * @stable [10.08.2018]
 */
export interface INavigationListEntity extends IXYEntity {
}

/**
 * @stable [10.08.2018]
 */
export interface INavigationListProps extends INavigationListConfiguration,
                                              INavigationListEntity {
}
