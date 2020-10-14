import {
  IBaseTextFieldState,
  IBaseTextFieldProps,
} from '../../../definition';
import { IStepWrapper } from '../../../definitions.interface';

export interface INumberFieldInternalState extends IBaseTextFieldState {
}

export interface INumberFieldProps extends IBaseTextFieldProps, IStepWrapper {
}
