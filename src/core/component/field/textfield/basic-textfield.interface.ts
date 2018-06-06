import { IKeyboardOpenedWrapper } from '../../../definitions.interface';
import { IField, IFieldState, IFieldInternalProps } from '../field';

/**
 * @stable [01.06.2018]
 */
export interface IBasicTextFieldState extends IFieldState,
                                              IKeyboardOpenedWrapper {
}

export interface IBasicTextFieldInternalProps
    extends IFieldInternalProps {
}

export interface IBasicTextField<TInternalProps extends IBasicTextFieldInternalProps,
                                 TInternalState extends IBasicTextFieldState>
    extends IField<TInternalProps,
                   TInternalState> {
}
