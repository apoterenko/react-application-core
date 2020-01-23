import {
  IBaseTextFieldProps,
  IBaseTextFieldState,
} from '../text-field/base-textfield.interface';
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
