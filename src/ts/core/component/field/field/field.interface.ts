import {
  CSSProperties,
  PureComponent,
  FocusEvent,
  KeyboardEvent
} from 'react';

import {
  IBaseComponent,
  IBaseComponentInternalProps,
  IBaseComponentInternalState
} from 'core/component/base';
import { AnyT } from 'core/definition.interface';
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
  onChange?(value: AnyT): void;
  onFocus?(event: FocusEvent<AnyT>): void;
  onKeyPress?(event: KeyboardEvent<AnyT>): void;
  $$onChangeForm?(name: string, value: AnyT);
}

export interface IFieldInternalState extends IBaseComponentInternalState {
  error?: string;
  stateValue?: AnyT;
}

export interface IMaskedTextInput extends PureComponent<IBaseComponentInternalState,
                                                        IBaseComponentInternalProps> {
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
