import {
  IField,
  IFieldInternalState,
  IFieldInternalProps
} from 'core/component/field/field';
import { ChangeEventT } from 'core/component/events';

export interface ITextFieldInternalState extends IFieldInternalState {
}

export interface ITextFieldInternalProps extends IFieldInternalProps {
  onEnter?: () => void;
  onDelay?: (value: string) => void;
  delayTimeout?: number;
}

export interface ITextField extends IField<ITextFieldInternalProps,
                                           ITextFieldInternalState,
                                           ChangeEventT> {
}
