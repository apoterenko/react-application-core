import {
  ICardListConfiguration,
} from '../../../configurations-definitions.interface';
import {
  IContainerProps,
  IListEntity,
  IListWrapperEntity,
} from '../../../definition';
import { IListConfigurationWrapper } from '../../../definitions.interface';

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
