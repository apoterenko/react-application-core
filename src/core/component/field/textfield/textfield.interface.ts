import {
  IBasicTextFieldState,
  IBasicTextFieldProps,
  IBasicTextField,
} from './base-textfield.interface';

export interface ITextFieldInternalState extends IBasicTextFieldState {
}

export interface ITextFieldInternalProps extends IBasicTextFieldProps {
}

export interface ITextField extends IBasicTextField<ITextFieldInternalProps,
                                                    ITextFieldInternalState> {
}
