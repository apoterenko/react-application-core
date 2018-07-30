import { IKeyboardOpenedWrapper } from '../../../definitions.interface';
import { IField, IFieldState, IFieldInternalProps } from '../field';

/**
 * @stable [01.06.2018]
 */
export interface IBasicTextFieldState extends IFieldState,
                                              IKeyboardOpenedWrapper {
}

export interface IBasicTextFieldProps extends IFieldInternalProps {
}

export interface IBasicTextField<TInternalProps extends IBasicTextFieldProps,
                                 TInternalState extends IBasicTextFieldState>
    extends IField<TInternalProps,
                   TInternalState> {
}
