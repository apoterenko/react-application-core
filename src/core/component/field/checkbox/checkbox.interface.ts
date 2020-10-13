import { IFieldProps2 } from '../../../configurations-definitions.interface';
import {
  IFieldInputProps,
  IFieldState,
  IGenericBaseCheckboxEntity,
} from '../../../definition';

/**
 * @stable [31.08.2018]
 */
export interface IBaseCheckboxState
  extends IFieldState {
}

/**
 * @stable [31.08.2018]
 */
export interface IBaseCheckboxProps
  extends IFieldProps2,
    IGenericBaseCheckboxEntity {
}

/**
 * @stable [31.08.2018]
 */
export interface ICheckboxProps extends IBaseCheckboxProps {
}

/**
 * @stable [31.08.2018]
 */
export interface IBaseCheckboxInputProps extends IFieldInputProps {
}
