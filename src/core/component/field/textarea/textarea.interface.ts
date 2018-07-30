import {
  IBasicTextFieldState,
  IBasicTextFieldProps,
  IBasicTextField,
} from '../textfield';

export interface ITextAreaInternalState extends IBasicTextFieldState {
}

export interface ITextAreaInternalProps extends IBasicTextFieldProps {
}

export interface ITextArea extends IBasicTextField<ITextAreaInternalProps,
                                   ITextAreaInternalState> {
}
