import { Component, InputHTMLAttributes, TextareaHTMLAttributes, ClassAttributes } from 'react';

import {
  AnyT,
  BasicEventT,
  FocusEventT,
  IDisplayValueWrapper,
  INameWrapper,
  KeyboardEventT,
  IStringTypeWrapper,
  IValueWrapper,
  IOriginalValueable,
  IDisplayNameWrapper,
  ILabelWrapper,
  IPlaceholderWrapper,
  IStepable,
  ChangeEventT,
  IMaskEntity,
  IBindToDictionaryEntity,
  IDisplayMessageWrapper,
  IPatternWrapper,
  IPreventValueBindingWrapper,
} from '../../../definitions.interface';
import { IBaseComponent, IBaseComponentInternalProps } from '../../base';
import { IErrorEntity } from '../../../entities-definitions.interface';
import { IFieldConfiguration } from '../../../configurations-definitions.interface';

export type IFieldDisplayValueConverter<TValue> = (value: TValue, scope?: IDefaultField) => string;

export type FieldDisplayValueConverterT = IFieldDisplayValueConverter<AnyT>;

export interface IFieldDisplayValueWrapper<TValue> extends IDisplayValueWrapper<string|IFieldDisplayValueConverter<TValue>> {
}

export interface IKeyboardHandlers {
  onKeyEnter?(event: KeyboardEventT): void;
  onKeyUp?(event: KeyboardEventT): void;
  onKeyDown?(event: KeyboardEventT): void;
  onKeyEscape?(event: KeyboardEventT): void;
  onKeyArrowDown?(event: KeyboardEventT): void;
  onKeyArrowUp?(event: KeyboardEventT): void;
  onKeyBackspace?(event: KeyboardEventT): void;
}

/**
 * The field options - the read-only props (cannot be changed)
 */
export interface IFieldOptions extends ILabelWrapper,
                                       IPreventValueBindingWrapper,
                                       IDisplayMessageWrapper,
                                       IDisplayNameWrapper,
                                       IStringTypeWrapper,
                                       IPatternWrapper,
                                       IPlaceholderWrapper,
                                       IMaskEntity,
                                       IBindToDictionaryEntity {
  prefixLabel?: string;
}

export interface IFieldsOptions { [index: string]: string|IFieldOptions; }

export interface IFieldInternalProps extends IBaseComponentInternalProps,
                                             IFieldConfiguration,
                                             IKeyboardHandlers,
                                             IFieldOptions,
                                             INameWrapper,
                                             IStepable,
                                             IValueWrapper<AnyT>,
                                             IOriginalValueable<AnyT>,
                                             IFieldDisplayValueWrapper<AnyT> {
  inputWrapperClassName?: string; // @stable
  noErrorMessage?: boolean;
  noInfoMessage?: boolean;
  renderCondition?: boolean;
  autoFocus?: boolean;
  required?: boolean;
  autoComplete?: string;
  minLength?: number;
  maxLength?: number;
  rows?: number;
  cols?: number;
  validate?: (value: AnyT) => string;
  validationGroup?: string;
  changeForm?(name: string, value: AnyT, validationGroup?: string): void;
  onChange?(value: AnyT): void;
  onFocus?(event: FocusEventT): void;
  onBlur?(event: FocusEventT): void;
  onClick?(event: BasicEventT): void;
}

export interface IFieldInputProps extends InputHTMLAttributes<HTMLInputElement>,
                                          ClassAttributes<{}> {
}

export interface IFieldTextAreaProps extends TextareaHTMLAttributes<HTMLTextAreaElement>,
                                             ClassAttributes<{}> {
}

export interface IFieldInternalState extends IErrorEntity<string> {
}

export interface INativeMaskedInputComponent extends Component<{}, {}> {
  inputElement: HTMLInputElement;
}

export interface IChangesObserver {
  onChange?(event: ChangeEventT): void;
  onChangeManually?(currentRawValue: AnyT, context?: AnyT): void;
}

export interface IBasicField<TValue> extends IValueWrapper<TValue>,
                                             IChangesObserver {
  setFocus?(): void;
}

export interface IField<TInternalProps extends IFieldInternalProps,
                        TInternalState extends IFieldInternalState>
    extends IKeyboardHandlers,
            IBasicField<AnyT>,
            IBaseComponent<TInternalProps, TInternalState> {
  input: HTMLInputElement;
  resetError(): void;
}

/* @stable - 11.04.2018 */
export interface IDefaultField extends IField<IFieldInternalProps, IFieldInternalState> {
}
