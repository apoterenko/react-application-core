import { IField, IFieldState } from '../field/field.interface';
import { IFieldProps } from '../../../configurations-definitions.interface';

/**
 * @stable [25.02.2019]
 */
export interface IBaseTextFieldState
  extends IFieldState {
}

/**
 * @stable [25.02.2019]
 */
export interface IBaseTextFieldProps
  extends IFieldProps {
}

/**
 * @stable [25.02.2019]
 */
export interface IBaseTextField<TProps extends IBaseTextFieldProps,
                                TState extends IBaseTextFieldState>
    extends IField<TProps, TState> {
}
