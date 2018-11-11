import {
  IRowWrapper,
  IFullWrapper,
  IAlignItemsCenterWrapper,
  IJustifyContentEndWrapper,
  ISeparatorWrapper,
  IJustifyContentCenterWrapper,
  IAlignItemsEndWrapper,
} from '../../../definitions.interface';
import { IOnClickWrapper } from '../../../react-definitions.interface';

/**
 * @stable [24.10.2018]
 */
export interface IUniversalFlexLayoutProps extends IOnClickWrapper,
                                                   ISeparatorWrapper,
                                                   IAlignItemsCenterWrapper,
                                                   IAlignItemsEndWrapper,
                                                   IJustifyContentCenterWrapper,
                                                   IJustifyContentEndWrapper,
                                                   IFullWrapper,
                                                   IRowWrapper {
}
