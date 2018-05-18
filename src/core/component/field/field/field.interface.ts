import { Component, InputHTMLAttributes, ClassAttributes, TextareaHTMLAttributes } from 'react';

import {
  AnyT,
  FocusEventT,
  IDisplayValueWrapper,
  IValueWrapper,
  IStepable,
  ChangeEventT,
  IHTMLInputWrapper,
} from '../../../definitions.interface';
import {
  IErrorEntity,
  IFieldEntity,
  IUniversalField,
} from '../../../entities-definitions.interface';
import {
  IFieldConfiguration,
} from '../../../configurations-definitions.interface';

export type IFieldDisplayValueConverter<TValue> = (value: TValue, scope?: IField) => string;

export type FieldDisplayValueConverterT = IFieldDisplayValueConverter<AnyT>;

export interface IFieldDisplayValueWrapper<TValue> extends IDisplayValueWrapper<string|IFieldDisplayValueConverter<TValue>> {
}

export interface IFieldsOptions { [index: string]: string|IFieldConfiguration; }

export interface IFieldInternalProps extends IFieldConfiguration,
                                             IFieldEntity,
                                             IStepable,
                                             IFieldDisplayValueWrapper<AnyT> {
  inputWrapperClassName?: string; // @stable
  noInfoMessage?: boolean;
  renderCondition?: boolean;
  autoComplete?: string;
  minLength?: number;
  maxLength?: number;
  rows?: number;
  cols?: number;
  validate?: (value: AnyT) => string;
  validationGroup?: string;
  changeForm?(name: string, value: AnyT, validationGroup?: string): void;
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

export interface IFieldState extends IErrorEntity<string> {
}

/**
 * @stable [09.05.2018]
 */
export interface INativeMaskedInputComponent extends Component {
  inputElement: HTMLInputElement;
}

export interface IBasicField<TValue> extends IValueWrapper<TValue> {
  setFocus?(): void;
  onChange?(event: ChangeEventT): void;
  onChangeManually?(currentRawValue: AnyT, context?: AnyT): void;
}

export interface IField<TProps extends IFieldInternalProps = IFieldInternalProps,
                        TState extends IFieldState = IFieldState>
    extends IUniversalField<TProps, TState>,
            IHTMLInputWrapper {
}
