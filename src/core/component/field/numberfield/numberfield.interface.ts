import {
  IBaseTextFieldState,
  IBaseTextFieldProps,
  IBaseTextField,
} from '../text-field';

export interface INumberFieldInternalState extends IBaseTextFieldState {
}

export interface INumberFieldInternalProps extends IBaseTextFieldProps {
}

export interface INumberField extends IBaseTextField<INumberFieldInternalProps, INumberFieldInternalState> {
}
