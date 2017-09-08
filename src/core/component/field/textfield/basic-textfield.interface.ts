import { ChangeEventT } from 'core/definition.interface';
import { IField, IFieldInternalState, IFieldInternalProps } from 'core/component/field';

export interface IBasicTextFieldInternalState extends IFieldInternalState {
}

export interface IBasicTextFieldInternalProps extends IFieldInternalProps {
}

export interface IBasicTextField<TInternalProps extends IBasicTextFieldInternalProps,
                                 TInternalState extends IBasicTextFieldInternalState>
    extends IField<TInternalProps,
                   TInternalState,
                   ChangeEventT> {
}
