import { IGridConfigurationWrapper } from '../../../configurations-definitions.interface';
import {
  IMultiFieldState,
  IMultiFieldProps,
} from '../multifield';

/**
 * @stable [19.08.2018]
 */
export interface IGridFieldState extends IMultiFieldState {
}

/**
 * @stable [19.08.2018]
 */
export interface IGridFieldProps extends IMultiFieldProps,
                                         IGridConfigurationWrapper {
}
