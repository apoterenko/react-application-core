import { PureComponent, InputHTMLAttributes, ClassAttributes } from 'react';

import {
  AnyT,
  BasicEventT,
  EntityIdT,
  FocusEventT,
  IEntity,
  INameable,
  KeyboardEventT,
  IDisableable,
  ITypeable,
  IValueable,
  IOriginalValueable,
  IReadonlyable,
  IDisplayable,
  ILabelable,
  IPlaceholderable,
  IDisplayValueable,
  IStepable,
  ChangeEventT,
  IMaskable,
  INamedEntity,
  IErrorable,
} from '../../../definition.interface';
import { IBaseComponent, IBaseComponentInternalProps } from '../../../component/base';

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
                                       IDisplayable,
                                       IMaskable,
                                       ITypeable<string>,
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
                                             IValueable<AnyT>,
                                             IOriginalValueable<AnyT>,
                                             IDisplayValueable<AnyT> {
  noErrorMessage?: boolean;
  renderCondition?: boolean;
  autoFocus?: boolean;
  required?: boolean;
  autoComplete?: string;
  minLength?: number;
  maxLength?: number;
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

export interface IFieldInternalState extends IErrorable<string> {
  stateValue?: AnyT;
}

export interface IMaskedTextInputPureComponent extends PureComponent<{}, {}> {
  inputElement: HTMLInputElement;
}

export interface IField<TInternalProps extends IFieldInternalProps,
                        TInternalState extends IFieldInternalState>
    extends IKeyboardHandlers, IBaseComponent<TInternalProps, TInternalState> {
  input: HTMLInputElement;
  onChange(event: ChangeEventT): void;
  resetError(): void;
  setFocus(): void;
}

export type FieldT = IField<IFieldInternalProps, IFieldInternalState>;

export interface IMultiFieldAttributes {
  add: IEntity[];
  remove: IEntity[];
  source?: IEntity[];
}
