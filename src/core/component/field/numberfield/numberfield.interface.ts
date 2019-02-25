import {
  IBaseTextFieldState,
  IBaseTextFieldProps,
  IBaseTextField,
} from '../textfield';

export interface INumberFieldInternalState extends IBaseTextFieldState {
}

export interface INumberFieldInternalProps extends IBaseTextFieldProps {
}

export interface INumberField extends IBaseTextField<INumberFieldInternalProps, INumberFieldInternalState> {
}
