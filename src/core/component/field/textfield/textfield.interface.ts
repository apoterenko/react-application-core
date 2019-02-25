import {
  IBaseTextFieldState,
  IBaseTextFieldProps,
  IBaseTextField,
} from './base-textfield.interface';

export interface ITextFieldInternalState extends IBaseTextFieldState {
}

export interface ITextFieldInternalProps extends IBaseTextFieldProps {
}

export interface ITextField extends IBaseTextField<ITextFieldInternalProps,
                                                    ITextFieldInternalState> {
}
