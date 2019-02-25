import { IField, IFieldState, IFieldInternalProps } from '../field/field.interface';

/**
 * @stable [25.02.2019]
 */
export interface IBaseTextFieldState extends IFieldState {
}

/**
 * @stable [25.02.2019]
 */
export interface IBaseTextFieldProps extends IFieldInternalProps {
}

/**
 * @stable [25.02.2019]
 */
export interface IBaseTextField<TProps extends IBaseTextFieldProps,
                                TState extends IBaseTextFieldState>
    extends IField<TProps, TState> {
}
