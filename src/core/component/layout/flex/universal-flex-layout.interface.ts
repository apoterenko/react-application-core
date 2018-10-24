import {
  IRowWrapper,
  IFullWrapper,
  IAlignItemsCenterWrapper,
  IJustifyContentEndWrapper,
  ISeparatorWrapper,
  IJustifyContentCenterWrapper,
  IAlignItemsEndWrapper,
  IOnClickWrapper,
} from '../../../definitions.interface';

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
