import { AnyT } from 'core/definition.interface';

import {
  IBasicTextFieldInternalState,
  IBasicTextFieldInternalProps,
  IBasicTextField,
} from './basic-textfield.interface';

export interface ITextFieldInternalState extends IBasicTextFieldInternalState {
}

export interface ITextFieldInternalProps extends IBasicTextFieldInternalProps {
  onDelay?: (value: AnyT) => void;
  delayTimeout?: number;
}

export interface ITextField extends IBasicTextField<ITextFieldInternalProps,
                                                    ITextFieldInternalState> {
}
