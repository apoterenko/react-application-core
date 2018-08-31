import { IFieldState, IFieldInternalProps, IFieldInputProps } from '../field';

/**
 * @stable [31.08.2018]
 */
export interface IBaseCheckboxState extends IFieldState {
}

/**
 * @stable [31.08.2018]
 */
export interface IBaseCheckboxProps extends IFieldInternalProps {
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
export interface IBaseCheckboxInputProps extends IFieldInputProps {
}

/**
 * @stable [31.08.2018]
 */
export interface ICheckboxInputProps extends IBaseCheckboxInputProps {
}
