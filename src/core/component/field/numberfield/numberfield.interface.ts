import {
  IBasicTextFieldState,
  IBasicTextFieldProps,
  IBasicTextField,
} from '../textfield';

export interface INumberFieldInternalState extends IBasicTextFieldState {
}

export interface INumberFieldInternalProps extends IBasicTextFieldProps {
}

export interface INumberField extends IBasicTextField<INumberFieldInternalProps, INumberFieldInternalState> {
}
