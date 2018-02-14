import { PureComponent, InputHTMLAttributes, TextareaHTMLAttributes, ClassAttributes } from 'react';

import {
  AnyT,
  BasicEventT,
  FocusEventT,
  IEntity,
  IDisplayValueWrapper,
  INameable,
  KeyboardEventT,
  IDisableable,
  IStringTypeWrapper,
  IValueWrapper,
  IOriginalValueable,
  IReadonlyable,
  IDisplayNameWrapper,
  ILabelable,
  IPlaceholderable,
  IStepable,
  ChangeEventT,
  IMaskable,
  IErrorable,
  IDisplayMessageWrapper,
} from '../../../definition.interface';
import { IBaseComponent, IBaseComponentInternalProps } from '../../base';

export type IFieldDisplayValueConverter<TValue> = (value: TValue, scope?: FieldT) => string;

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

export interface IFieldOptions extends ILabelable,
                                       IDisplayMessageWrapper,
                                       IDisplayNameWrapper,
                                       IMaskable,
                                       IStringTypeWrapper,
                                       IPlaceholderable {
  pattern?: string;
  prefixLabel?: string;
}

export interface IFieldsOptions { [index: string]: string|IFieldOptions; }

export interface IFieldInternalProps extends IBaseComponentInternalProps,
                                             IKeyboardHandlers,
                                             IFieldOptions,
                                             INameable,
                                             IDisableable,
                                             IStepable,
                                             IReadonlyable,
                                             IValueWrapper<AnyT>,
                                             IOriginalValueable<AnyT>,
                                             IFieldDisplayValueWrapper<AnyT> {
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

export interface IFieldInternalState extends IErrorable<string> {
}

export interface INativeMaskedInputComponent extends PureComponent<{}, {}> {
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

export type FieldT = IField<IFieldInternalProps, IFieldInternalState>;

