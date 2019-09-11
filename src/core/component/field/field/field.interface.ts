import { Component, InputHTMLAttributes, ClassAttributes, TextareaHTMLAttributes } from 'react';

import {
  AnyT,
  IValueWrapper,
  IInputWrapper,
  IEmptyValueWrapper,
  IStringErrorWrapper,
  IOriginalValueWrapper,
  IKeyboardEvent,
  IFocusEvent,
  ICanReturnClearDirtyChangesValueWrapper,
  IKeyboardOpenedWrapper,
  ICaretVisibilityWrapper,
  ICaretPositionWrapper,
} from '../../../definitions.interface';
import { IFieldEntity, IUniversalField } from '../../../entities-definitions.interface';
import { IFieldConfiguration } from '../../../configurations-definitions.interface';

/**
 * @stable [17.06.2018]
 */
export const FIELD_EMPTY_ERROR_VALUE = null;

/**
 * @stable [11.08.2018]
 */
export interface IFieldActualChangedValueConfigEntity extends IValueWrapper,
                                                              IEmptyValueWrapper,
                                                              IOriginalValueWrapper,
                                                              ICanReturnClearDirtyChangesValueWrapper {
}

/**
 * @stable [04.09.2018]
 */
export interface IUniversalFieldState extends IStringErrorWrapper,
                                              IKeyboardOpenedWrapper,
                                              ICaretVisibilityWrapper,
                                              ICaretPositionWrapper {
  focused?: boolean; // TODO
  bufferedValue?: boolean; // TODO
}

/**
 * @stable [03.09.2018]
 */
export interface IFieldState extends IUniversalFieldState {
}

export interface IFieldInternalProps extends IFieldConfiguration,
                                             IFieldEntity {
  minLength?: number;
  maxLength?: number;
  rows?: number;
  cols?: number;
  extraProps?: any; // TODO
  dispatchValue?(rawValue: AnyT); // TODO
}

/**
 * @stable [18.06.2018]
 */
export interface IFieldInputProps extends InputHTMLAttributes<HTMLInputElement>,
                                          ClassAttributes<HTMLInputElement> {
}

/**
 * @stable [18.06.2018]
 */
export interface IFieldTextAreaProps extends TextareaHTMLAttributes<HTMLTextAreaElement>,
                                             ClassAttributes<HTMLTextAreaElement> {
}

/**
 * @stable [09.05.2018]
 */
export interface INativeMaskedInputComponent extends Component {
  inputElement: HTMLInputElement;
}

export interface IField<TProps extends IFieldInternalProps = IFieldInternalProps,
                        TState extends IFieldState = IFieldState>
    extends IUniversalField<TProps, TState, IKeyboardEvent, IFocusEvent>,
            IInputWrapper {
}
