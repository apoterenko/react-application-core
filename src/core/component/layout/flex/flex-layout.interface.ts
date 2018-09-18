import { IComponentProps } from '../../../props-definitions.interface';
import {
  IRowWrapper,
  IFullWrapper,
  IAlignItemsCenterWrapper,
  IJustifyContentEndWrapper,
  IJustifyContentCenterWrapper,
} from '../../../definitions.interface';

/**
 * @stable [17.06.2018]
 */
export interface IFlexLayoutProps extends IComponentProps,
                                          IAlignItemsCenterWrapper,
                                          IJustifyContentCenterWrapper,
                                          IJustifyContentEndWrapper,
                                          IFullWrapper,
                                          IRowWrapper {
}
