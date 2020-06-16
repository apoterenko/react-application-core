import {
  IGridProps,
  IMultiFieldState,
  IMultiFieldProps,
} from '../../../definition';
import { IGridConfigurationWrapper } from '../../../definitions.interface';

/**
 * @stable [19.08.2018]
 */
export interface IGridFieldState extends IMultiFieldState {
}

/**
 * @stable [19.08.2018]
 */
export interface IGridFieldProps extends IMultiFieldProps,
                                         IGridConfigurationWrapper<IGridProps> {
}
