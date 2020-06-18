import {
  IBaseTextFieldState,
  IBaseTextFieldProps,
} from '../../../definition';

export interface ITimeFieldInternalState extends IBaseTextFieldState {
}

export interface ITimeFieldInternalProps extends IBaseTextFieldProps {
  useShortMask?: boolean;
}
