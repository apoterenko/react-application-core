import {
  IBaseTextFieldState,
  IBaseTextFieldProps,
  IBaseTextField,
} from '../textfield';

export interface ITextAreaInternalState extends IBaseTextFieldState {
}

export interface ITextAreaInternalProps extends IBaseTextFieldProps {
}

export interface ITextArea extends IBaseTextField<ITextAreaInternalProps,
                                   ITextAreaInternalState> {
}
