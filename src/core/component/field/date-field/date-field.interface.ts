import {
  IBaseTextFieldProps,
  IBaseTextFieldState,
} from '../textfield/base-textfield.interface';
import {
  IGenericDateFieldEntity,
  IGenericDateFieldState,
} from '../../../definition';

export interface IDateFieldProps
  extends IBaseTextFieldProps,
    IGenericDateFieldEntity {
}

export interface IDateFieldState
  extends IBaseTextFieldState,
    IGenericDateFieldState {
}
