import {
  IBasicTextFieldState,
  IBasicTextFieldProps,
  IBasicTextField,
} from '../textfield';

export interface ITimeFieldInternalState extends IBasicTextFieldState {
}

export interface ITimeFieldInternalProps extends IBasicTextFieldProps {
}

export interface ITimeField extends IBasicTextField<ITimeFieldInternalProps, ITimeFieldInternalState> {
}
