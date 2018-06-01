import {
  IBasicTextFieldState,
  IBasicTextFieldInternalProps,
  IBasicTextField,
} from '../textfield';

export interface ITimeFieldInternalState extends IBasicTextFieldState {
}

export interface ITimeFieldInternalProps extends IBasicTextFieldInternalProps {
}

export interface ITimeField extends IBasicTextField<ITimeFieldInternalProps, ITimeFieldInternalState> {
}
