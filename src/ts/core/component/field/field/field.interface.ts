import { CSSProperties, PureComponent, KeyboardEvent } from 'react';

import { AnyT, BasicEventT, FocusEventT, KeyboardEventT } from 'core/definition.interface';
import { IBaseComponent, IBaseComponentInternalState } from 'core/component/base';
import { IComponentPluginCtor } from 'core/component/plugin';

export interface IFieldInternalProps {
  persistent?: boolean;
  name?: string;
  value?: AnyT;
  label?: string;
  style?: CSSProperties;
  wrapperStyle?: CSSProperties;
  className?: string;
  placeholder?: string;
  autoFocus?: boolean;
  mask?: Array<string|RegExp>;
  disabled?: boolean;
  pattern?: string;
  type?: string;
  required?: boolean;
  min?: number;
  max?: number;
  plugins?: IComponentPluginCtor<IField<IFieldInternalProps, IFieldInternalState, AnyT>,
                                 IFieldInternalProps,
                                 IFieldInternalState>[],
  validate?:(value: AnyT) => string;
  changeForm?(name: string, value: AnyT): void;
  onChange?(value: AnyT): void;
  onFocus?(event: FocusEventT): void;
  onClick?(event: BasicEventT): void;
  onKeyPress?(event: KeyboardEventT): void;
}

export interface IFieldInternalState extends IBaseComponentInternalState {
  error?: string;
  stateValue?: AnyT;
}

export interface IMaskedTextInputPureComponent extends PureComponent<{}, {}> {
  inputElement: HTMLInputElement;
}

export interface IField<TInternalProps extends IFieldInternalProps,
                        TInternalState extends IFieldInternalState,
                        TValueEvent>
    extends IBaseComponent<TInternalProps, TInternalState> {
  setFocus(): void;
  onChange(event: TValueEvent): void;
  onKeyPress(event: KeyboardEvent<AnyT>): void;
}
