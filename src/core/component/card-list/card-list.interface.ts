import {
  IGenericContainerProps,
  IReduxListHolderEntity,
} from '../../definition';
import { IListConfigurationWrapper } from '../../definitions.interface';

/**
 * @stable [05.05.2018]
 */
export interface ICardListContainerProps extends IGenericContainerProps,
                                                 IReduxListHolderEntity,
                                                 IListConfigurationWrapper<any> { // TODO
}
