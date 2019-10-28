import { IFieldState } from '../field';
import { IFieldProps } from '../../../configurations-definitions.interface';
import { IFieldInputAttributes } from '../../../definition';

/**
 * @stable [31.08.2018]
 */
export interface IBaseCheckboxState extends IFieldState {
}

/**
 * @stable [31.08.2018]
 */
export interface IBaseCheckboxProps extends IFieldProps {
}

/**
 * @stable [31.08.2018]
 */
export interface ICheckboxState extends IBaseCheckboxState {
}

/**
 * @stable [31.08.2018]
 */
export interface ICheckboxProps extends IBaseCheckboxProps {
}

/**
 * @stable [31.08.2018]
 */
export interface IBaseCheckboxInputProps extends IFieldInputAttributes {
}
