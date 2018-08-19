import {
  IBasicTextFieldState,
  IBasicTextFieldProps,
  IBasicTextField,
} from '../textfield';

export interface ITimeFieldInternalState extends IBasicTextFieldState {
}

export interface ITimeFieldInternalProps extends IBasicTextFieldProps {
  useShortMask?: boolean;
}

export interface ITimeField extends IBasicTextField<ITimeFieldInternalProps, ITimeFieldInternalState> {
}
