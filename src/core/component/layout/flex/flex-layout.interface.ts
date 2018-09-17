import { IComponentProps } from '../../../props-definitions.interface';
import {
  IRowWrapper,
  IFullWrapper,
  IAlignItemsCenterWrapper,
  IJustifyContentEndWrapper,
} from '../../../definitions.interface';

/**
 * @stable [17.06.2018]
 */
export interface IFlexLayoutProps extends IComponentProps,
                                          IAlignItemsCenterWrapper,
                                          IJustifyContentEndWrapper,
                                          IFullWrapper,
                                          IRowWrapper {
}
