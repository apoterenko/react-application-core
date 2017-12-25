import {
  IBasicTextFieldInternalState,
  IBasicTextFieldInternalProps,
  IBasicTextField,
} from '../textfield';

export interface ITextAreaInternalState extends IBasicTextFieldInternalState {
}

export interface ITextAreaInternalProps extends IBasicTextFieldInternalProps {
}

export interface ITextArea extends IBasicTextField<ITextAreaInternalProps,
                                   ITextAreaInternalState> {
}
