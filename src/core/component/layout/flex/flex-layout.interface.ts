import { IComponentProps } from '../../../props-definitions.interface';
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
 * @stable [17.06.2018]
 */
export interface IFlexLayoutProps extends IComponentProps,
                                          IOnClickWrapper,
                                          ISeparatorWrapper,
                                          IAlignItemsCenterWrapper,
                                          IAlignItemsEndWrapper,
                                          IJustifyContentCenterWrapper,
                                          IJustifyContentEndWrapper,
                                          IFullWrapper,
                                          IRowWrapper {
}
