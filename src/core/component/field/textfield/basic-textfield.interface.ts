import { IField, IFieldState, IFieldInternalProps } from '../field/field.interface';

/**
 * @stable [01.06.2018]
 */
export interface IBasicTextFieldState extends IFieldState {
}

export interface IBasicTextFieldProps extends IFieldInternalProps {
}

export interface IBasicTextField<TInternalProps extends IBasicTextFieldProps,
                                 TInternalState extends IBasicTextFieldState>
    extends IField<TInternalProps,
                   TInternalState> {
}
