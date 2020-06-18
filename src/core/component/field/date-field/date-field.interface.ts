import {
  IBaseTextFieldProps,
  IBaseTextFieldState,
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
