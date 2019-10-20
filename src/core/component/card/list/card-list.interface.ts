import {
  ICardListConfiguration,
  IListConfigurationWrapper,
} from '../../../configurations-definitions.interface';
import {
  IContainerProps,
  IListWrapperEntity,
  IListEntity,
} from '../../../definition';

/**
 * @stable [05.05.2018]
 */
export interface ICardListProps extends ICardListConfiguration,
                                        IListEntity {
}

/**
 * @stable [05.05.2018]
 */
export interface ICardListContainerProps extends IContainerProps,
                                                 IListWrapperEntity,
                                                 IListConfigurationWrapper<ICardListConfiguration> {
}
