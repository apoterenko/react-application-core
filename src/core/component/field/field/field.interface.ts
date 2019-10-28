import { Component, InputHTMLAttributes, ClassAttributes, TextareaHTMLAttributes, RefAttributes } from 'react';

import {
  AnyT,
  IValueWrapper,
  IInputWrapper,
  IEmptyValueWrapper,
  IStringErrorWrapper,
  IOriginalValueWrapper,
  IKeyboardEvent,
  IFocusEvent,
  IReturnValueToClearDirtyChangesWrapper,
  IKeyboardOpenWrapper,
  ICaretVisibilityWrapper,
  ICaretPositionWrapper,
} from '../../../definitions.interface';
import { IUniversalField } from '../../../entities-definitions.interface';
import { IFieldProps } from '../../../configurations-definitions.interface';

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
                                                              IReturnValueToClearDirtyChangesWrapper {
}

/**
 * @stable [04.09.2018]
 */
export interface IUniversalFieldState extends IStringErrorWrapper,
                                              IKeyboardOpenWrapper,
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

export interface IField<TProps extends IFieldProps = IFieldProps,
                        TState extends IFieldState = IFieldState>
    extends IUniversalField<TProps, TState, IKeyboardEvent, IFocusEvent>,
            IInputWrapper {
}
