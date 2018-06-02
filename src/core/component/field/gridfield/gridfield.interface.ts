import { IGridConfigurationWrapper } from '../../../configurations-definitions.interface';
import {
  IBasicSelectState,
  IBasicSelectProps,
} from '../../field';

/**
 * @stable [01.06.2018]
 */
export interface IGridFieldState extends IBasicSelectState {
}

/**
 * @stable [01.06.2018]
 */
export interface IGridFieldProps extends IBasicSelectProps,
                                         IGridConfigurationWrapper {
}
