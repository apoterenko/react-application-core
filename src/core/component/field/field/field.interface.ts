import { PureComponent } from 'react';

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

export interface IFieldChangeFormInternalProps {
  changeForm?(name: string, value: AnyT, validationGroup?: string): void;
}

export interface IFieldOptions {
  placeholder?: string;
  pattern?: string;
  mask?: Array<string|RegExp>;
  prefixLabel?: string;
}

export interface IFieldInternalProps extends IBaseComponentInternalProps,
                                             IFieldChangeFormInternalProps,
                                             IKeyboardHandlers,
                                             IFieldOptions,
                                             INameable,
                                             IDisableable,
                                             IValueable<AnyT>,
                                             ITypeable<string> {
  displayValue?: string;
  notAllowEmptyValue?: boolean;
  notErrorMessageRequired?: boolean;
  noErrorMessage?: boolean;
  renderCondition?: boolean;
  label?: string;
  autoFocus?: boolean;
  required?: boolean;
  readOnly?: boolean;
  autoComplete?: string;
  minLength?: number;
  maxLength?: number;
  validate?: (value: AnyT) => string;
  validationGroup?: string;
  onChange?(value: AnyT): void;
  onFocus?(event: FocusEventT): void;
  onBlur?(event: FocusEventT): void;
  onClick?(event: BasicEventT): void;
}

export interface IFieldInternalState {
  error?: string;
  stateValue?: AnyT;
}

export interface IMaskedTextInputPureComponent extends PureComponent<{}, {}> {
  inputElement: HTMLInputElement;
}

export interface IField<TInternalProps extends IFieldInternalProps,
                        TInternalState extends IFieldInternalState,
                        TValueEvent>
    extends IKeyboardHandlers, IBaseComponent<TInternalProps, TInternalState> {
  input: HTMLInputElement;
  onChange(event: TValueEvent): void;
  resetError(): void;
  setFocus(): void;
}

export type FieldT = IField<IFieldInternalProps, IFieldInternalState, {}>;

export interface IMultiFieldAttributes {
  add: EntityIdT[];
  remove: EntityIdT[];
  source?: IEntity[];
}
