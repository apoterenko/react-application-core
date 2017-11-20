import { PureComponent } from 'react';

import { AnyT, BasicEventT, EntityIdT, FocusEventT, IEntity, KeyboardEventT } from '../../../definition.interface';
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

export interface IFieldInternalProps
    extends IBaseComponentInternalProps, IFieldChangeFormInternalProps, IKeyboardHandlers {
  name?: string;
  value?: AnyT;
  displayValue?: string;
  notAllowEmptyValue?: boolean;
  notErrorMessageRequired?: boolean;
  renderCondition?: boolean;
  label?: string;
  prefixLabel?: string;
  placeholder?: string;
  autoFocus?: boolean;
  mask?: Array<string|RegExp>;
  disabled?: boolean;
  pattern?: string;
  type?: string;
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
