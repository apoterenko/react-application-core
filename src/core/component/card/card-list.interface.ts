import {
  ICardListConfiguration,
  IListConfigurationWrapper,
} from '../../configurations-definitions.interface';
import { IContainerProps } from '../../props-definitions.interface';
import { IListWrapperEntity } from '../../entities-definitions.interface';

/**
 * @stable [05.05.2018]
 */
export interface ICardListProps extends ICardListConfiguration {
}

/**
 * @stable [05.05.2018]
 */
export interface ICardListContainerProps extends IContainerProps,
                                                 IListWrapperEntity,
                                                 IListConfigurationWrapper<ICardListConfiguration> {
}
