import {
  IBaseTextFieldState,
  IBaseTextFieldProps,
  IBaseTextField,
} from '../textfield';

export interface ITimeFieldInternalState extends IBaseTextFieldState {
}

export interface ITimeFieldInternalProps extends IBaseTextFieldProps {
  useShortMask?: boolean;
}

export interface ITimeField extends IBaseTextField<ITimeFieldInternalProps, ITimeFieldInternalState> {
}
