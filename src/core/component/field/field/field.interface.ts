import { Component, InputHTMLAttributes, ClassAttributes, TextareaHTMLAttributes } from 'react';

import {
  AnyT,
  FocusEventT,
  IValueWrapper,
  IStepable,
  IHTMLInputWrapper,
  IEmptyValueWrapper,
  IStringErrorWrapper,
  IOriginalValueWrapper,
  UNDEF,
  IKeyboardEvent,
} from '../../../definitions.interface';
import {
  IFieldEntity,
  IStringErrorEntity,
  IUniversalField,
} from '../../../entities-definitions.interface';
import {
  IFieldConfiguration,
} from '../../../configurations-definitions.interface';

/**
 * @stable [17.06.2018]
 * @type {null}
 */
export const FIELD_TO_CLEAR_DIRTY_CHANGES_VALUE = UNDEF;
export const FIELD_EMPTY_ERROR_VALUE = null;
export const FIELD_EMPTY_VALUE = '';

/**
 * @stable [17.06.2018]
 */
export interface IFieldActualChangedValueResultEntity extends IValueWrapper,
                                                              IStringErrorWrapper {
}

/**
 * @stable [17.06.2018]
 */
export interface IFieldActualChangedValueConfigEntity extends IFieldActualChangedValueResultEntity,
                                                              IEmptyValueWrapper,
                                                              IOriginalValueWrapper {
}

/**
 * @stable [17.06.2018]
 */
export interface IUniversalFieldState extends IStringErrorWrapper {
}

export interface IFieldsOptions { [index: string]: string|IFieldConfiguration; }

export interface IFieldInternalProps extends IFieldConfiguration,
                                             IFieldEntity,
                                             IStepable {
  inputWrapperClassName?: string; // @stable
  noInfoMessage?: boolean;
  renderCondition?: boolean;
  autoComplete?: string;
  minLength?: number;
  maxLength?: number;
  rows?: number;
  cols?: number;
  validate?: (value: AnyT) => string;
  onFocus?(event: FocusEventT): void;
  onBlur?(event: FocusEventT): void;
}

/* @stable - 13.04.2018 */
export interface IFieldInputProps extends InputHTMLAttributes<HTMLInputElement>,
                                          ClassAttributes<HTMLInputElement> {
}

/* @stable - 13.04.2018 */
export interface IFieldTextAreaProps extends TextareaHTMLAttributes<HTMLTextAreaElement>,
                                             ClassAttributes<HTMLTextAreaElement> {
}

/**
 * @stable [01.06.2018]
 */
export interface IFieldState extends IStringErrorEntity {
}

/**
 * @stable [09.05.2018]
 */
export interface INativeMaskedInputComponent extends Component {
  inputElement: HTMLInputElement;
}

export interface IBasicField<TValue> extends IValueWrapper<TValue> {
  setFocus?(): void;
  onChangeManually?(currentRawValue: AnyT, context?: AnyT): void;
}

export interface IField<TProps extends IFieldInternalProps = IFieldInternalProps,
                        TState extends IFieldState = IFieldState>
    extends IUniversalField<TProps, TState, IKeyboardEvent>,
            IHTMLInputWrapper {
}
