import {
  IBasicTextFieldState,
  IBasicTextFieldInternalProps,
  IBasicTextField,
} from './basic-textfield.interface';

export interface ITextFieldInternalState extends IBasicTextFieldState {
}

export interface ITextFieldInternalProps extends IBasicTextFieldInternalProps {
}

export interface ITextField extends IBasicTextField<ITextFieldInternalProps,
                                                    ITextFieldInternalState> {
}
