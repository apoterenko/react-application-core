import {
  IBasicTextFieldInternalState,
  IBasicTextFieldInternalProps,
  IBasicTextField,
} from '../textfield';

export interface ITimeFieldInternalState extends IBasicTextFieldInternalState {
}

export interface ITimeFieldInternalProps extends IBasicTextFieldInternalProps {
}

export interface ITimeField extends IBasicTextField<ITimeFieldInternalProps, ITimeFieldInternalState> {
}
