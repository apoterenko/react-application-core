import {
  IBasicTextFieldState,
  IBasicTextFieldInternalProps,
  IBasicTextField,
} from '../textfield';

export interface INumberFieldInternalState extends IBasicTextFieldState {
}

export interface INumberFieldInternalProps extends IBasicTextFieldInternalProps {
}

export interface INumberField extends IBasicTextField<INumberFieldInternalProps, INumberFieldInternalState> {
}
