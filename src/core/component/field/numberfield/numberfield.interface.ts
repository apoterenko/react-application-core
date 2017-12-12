import {
  IBasicTextFieldInternalState,
  IBasicTextFieldInternalProps,
  IBasicTextField,
} from '../textfield';

export interface INumberFieldInternalState extends IBasicTextFieldInternalState {
}

export interface INumberFieldInternalProps extends IBasicTextFieldInternalProps {
}

export interface INumberField extends IBasicTextField<INumberFieldInternalProps, INumberFieldInternalState> {
}
