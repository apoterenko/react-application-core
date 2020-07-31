import {
  IContainerProps,
  IReduxListHolderEntity,
} from '../../definition';
import { IListConfigurationWrapper } from '../../definitions.interface';

/**
 * @stable [05.05.2018]
 */
export interface ICardListContainerProps extends IContainerProps,
                                                 IReduxListHolderEntity,
                                                 IListConfigurationWrapper<any> { // TODO
}
