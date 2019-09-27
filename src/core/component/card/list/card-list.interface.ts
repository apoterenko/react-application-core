import {
  ICardListConfiguration,
  IListConfigurationWrapper,
} from '../../../configurations-definitions.interface';
import { IListWrapperEntity, IUniversalListEntity } from '../../../entities-definitions.interface';
import { IContainerProps } from '../../../definition';

/**
 * @stable [05.05.2018]
 */
export interface ICardListProps extends ICardListConfiguration,
                                        IUniversalListEntity {
}

/**
 * @stable [05.05.2018]
 */
export interface ICardListContainerProps extends IContainerProps,
                                                 IListWrapperEntity,
                                                 IListConfigurationWrapper<ICardListConfiguration> {
}
