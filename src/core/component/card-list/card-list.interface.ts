import {
  IContainerProps,
  IListWrapperEntity,
} from '../../definition';
import { IListConfigurationWrapper } from '../../definitions.interface';

/**
 * @stable [05.05.2018]
 */
export interface ICardListContainerProps extends IContainerProps,
                                                 IListWrapperEntity,
                                                 IListConfigurationWrapper<any> { // TODO
}
