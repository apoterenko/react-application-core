import {
  IBaseTextFieldState,
  IBaseTextFieldProps,
} from '../text-field';

export interface ITimeFieldInternalState extends IBaseTextFieldState {
}

export interface ITimeFieldInternalProps extends IBaseTextFieldProps {
  useShortMask?: boolean;
}
