import {
  IBasicTextFieldState,
  IBasicTextFieldInternalProps,
  IBasicTextField,
} from '../textfield';

export interface ITextAreaInternalState extends IBasicTextFieldState {
}

export interface ITextAreaInternalProps extends IBasicTextFieldInternalProps {
}

export interface ITextArea extends IBasicTextField<ITextAreaInternalProps,
                                   ITextAreaInternalState> {
}
