import { IComponentProps } from '../../../props-definitions.interface';
import {
  IRowWrapper,
  IFullWrapper,
  IAlignItemsCenterWrapper,
  IJustifyContentEndWrapper,
  ISeparatorWrapper,
  IJustifyContentCenterWrapper,
  IAlignItemsEndWrapper,
  IOverflowWrapper,
  IFullSizeWrapper,
  IOverflowMinContentHeightWrapper,
} from '../../../definitions.interface';
import { IOnClickWrapper } from '../../../react-definitions.interface';

/**
 * @stable [17.06.2018]
 */
export interface IFlexLayoutProps extends IComponentProps,
                                          IOnClickWrapper,
                                          IFullSizeWrapper,
                                          ISeparatorWrapper,
                                          IAlignItemsCenterWrapper,
                                          IAlignItemsEndWrapper,
                                          IJustifyContentCenterWrapper,
                                          IJustifyContentEndWrapper,
                                          IFullWrapper,
                                          IOverflowWrapper,
                                          IOverflowMinContentHeightWrapper,
                                          IRowWrapper {
}
