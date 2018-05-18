import { IField, IFieldState, IFieldInternalProps } from '../field';

export interface IBasicTextFieldInternalState extends IFieldState {
  keyboard?: boolean;
}

export interface IBasicTextFieldInternalProps
    extends IFieldInternalProps {
  clearAction?: boolean;
}

export interface IBasicTextField<TInternalProps extends IBasicTextFieldInternalProps,
                                 TInternalState extends IBasicTextFieldInternalState>
    extends IField<TInternalProps,
                   TInternalState> {
}
