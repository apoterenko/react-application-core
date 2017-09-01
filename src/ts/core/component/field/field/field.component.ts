import * as React from 'react';
import * as ramda from 'ramda';

import { and, isUndef } from 'core/util';
import {
  INativeMaterialComponent,
  MaterialComponent,
  IMaterialComponentFactory
} from 'core/component/material';
import { AnyT } from 'core/definition.interface';

import {
  IField,
  IFieldInternalProps,
  IFieldInternalState,
  IMaskedTextInput
} from './field.interface';

export abstract class Field<TComponent extends IField<TInternalProps, TInternalState, TValueEvent>,
                            TInternalProps extends IFieldInternalProps,
                            TInternalState extends IFieldInternalState,
                            TNativeMaterialComponent extends INativeMaterialComponent,
                            TValueEvent>
    extends MaterialComponent<TComponent,
                              TInternalProps,
                              TInternalState,
                              TNativeMaterialComponent>
    implements IField<TInternalProps, TInternalState, TValueEvent> {

  constructor(props: TInternalProps,
              mdcFactory: IMaterialComponentFactory<TNativeMaterialComponent>) {
    super(props, mdcFactory);
    this.onChange = this.onChange.bind(this);
    this.onKeyPress = this.onKeyPress.bind(this);
    this.onFocus = this.onFocus.bind(this);

    if (Array.isArray(this.props.plugins)) {
      this.props.plugins.forEach(plugin => this.registerPlugin(plugin));
    }

    if (this.isControlled) {
      this.state = { stateValue: this.getDefaultControlledValue() } as TInternalState;
    } else {
      this.state = {} as TInternalState;
    }
  }

  public componentDidMount(): void {
    super.componentDidMount();
    this.input.checkValidity = and(this.input.checkValidity, () => !this.state.error);
  }

  public setFocus(): void {
    this.input.focus();
  }

  public onChange(event: TValueEvent): void {
    this.onChangeValue(this.getRawValueFromEvent(event));
  }

  public onKeyPress(event: React.KeyboardEvent<AnyT>): void {
    if (this.props.onKeyPress) {
      this.props.onKeyPress(event);
    }
  }

  protected onFocus(event: React.FocusEvent<AnyT>): void {
    if (this.props.onFocus) {
      this.props.onFocus(event);
    }
  }

  protected onChangeValue(rawValue: AnyT, error?: string): void {
    this.setStateValue(rawValue);
    this.setState({ error: isUndef(error) ? this.validateValue(rawValue) : error });
    this.propsOnChange(rawValue);
  }

  protected setStateValue(stateValue: AnyT): void {
    if (this.isControlled) {
      this.setState({ stateValue: stateValue });
    }
  }

  protected propsOnChange(value: AnyT): void {
    if (this.props.onChange) {
      this.props.onChange(value);
    }
  }

  protected propsOnChangeForm(value: AnyT): void {
    if (this.props.$$onChangeForm) {
      this.props.$$onChangeForm(this.props.name, value);
    }
  }

  protected get isControlled(): boolean {
    return !this.props.hasOwnProperty('value');
  }

  protected get defaultValue(): AnyT {
    return this.props.defaultValue;
  }

  protected get value(): AnyT {
    return this.isControlled ? this.state.stateValue : this.props.value;
  }

  protected get error(): string {
    return this.state.error;
  }

  protected get input(): HTMLInputElement {
    return (this.refs.input as IMaskedTextInput).inputElement
        || this.refs.input as HTMLInputElement;
  }

  protected validateValue(value: AnyT): string {
    const props = this.props;
    let error = null;
    if (this.input.validity.valid) {
      error = props.validate ? props.validate(value) : null;
    } else {
      error = this.input.validationMessage;
    }
    return error && this.t(error) || null;
  }

  private getDefaultControlledValue(): string {
    return ramda.isNil(this.defaultValue)
        ? this.getEmptyControlledValue()
        : this.defaultValue;
  }

  protected abstract getEmptyControlledValue(): AnyT;

  protected abstract getRawValueFromEvent(event: TValueEvent): AnyT;
}
