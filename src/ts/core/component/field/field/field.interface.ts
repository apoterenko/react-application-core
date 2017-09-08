import { PureComponent } from 'react';

import { AnyT, BasicEventT, FocusEventT, KeyboardEventT } from 'core/definition.interface';
import { IBaseComponent, IBaseComponentInternalProps } from 'core/component/base';

export interface IKeyboardHandlers {
  onKeyEnter?(event: KeyboardEventT): void;
  onKeyUp?(event: KeyboardEventT): void;
  onKeyDown?(event: KeyboardEventT): void;
  onKeyEscape?(event: KeyboardEventT): void;
  onKeyArrowDown?(event: KeyboardEventT): void;
  onKeyArrowUp?(event: KeyboardEventT): void;
}

export interface IFieldInternalProps extends IBaseComponentInternalProps, IKeyboardHandlers {
  name?: string;
  value?: AnyT;
  label?: string;
  placeholder?: string;
  autoFocus?: boolean;
  mask?: Array<string|RegExp>;
  disabled?: boolean;
  pattern?: string;
  type?: string;
  required?: boolean;
  min?: number;
  max?: number;
  validate?: (value: AnyT) => string;
  changeForm?(name: string, value: AnyT): void;
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
  onChange(event: TValueEvent): void;
}
