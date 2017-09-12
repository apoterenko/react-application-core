import {
  IBasicTextFieldInternalState,
  IBasicTextFieldInternalProps,
  IBasicTextField,
} from './basic-textfield.interface';

export interface ITextFieldInternalState extends IBasicTextFieldInternalState {
}

export interface ITextFieldInternalProps extends IBasicTextFieldInternalProps {
}

export interface ITextField extends IBasicTextField<ITextFieldInternalProps,
                                                    ITextFieldInternalState> {
}
