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

    if (this.isPersistent) {
      this.state = {} as TInternalState;
    } else {
      this.state = { stateValue: this.definitePropsValue } as TInternalState;
    }
  }

  public componentDidMount(): void {
    super.componentDidMount();
    this.input.checkValidity = and(this.input.checkValidity, () => !this.state.error);
  }

  public componentWillReceiveProps(nextProps: Readonly<TInternalProps>, nextContext: any): void {
    super.componentWillReceiveProps(nextProps, nextContext);

    if (!this.isPersistent) {
      const newValue = nextProps.value;
      if (!ramda.equals(this.stateValue, newValue)) {
        this.setState({ stateValue: newValue });
      }
    }
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
    if (!this.isPersistent) {
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

  protected get isPersistent(): boolean {
    return isUndef(this.props.persistent) || this.props.persistent === true;
  }

  protected get value(): AnyT {
    return this.isPersistent ? this.definitePropsValue : this.stateValue;
  }

  protected get stateValue(): AnyT {
    return this.state.stateValue;
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

  private get definitePropsValue(): AnyT {
    return isUndef(this.props.value)
        // Prevent warning: "Input is changing a uncontrolled input of type text to be controlled..."
        ? this.getEmptyValue()
        : this.props.value;
  }

  protected abstract getEmptyValue(): AnyT;

  protected abstract getRawValueFromEvent(event: TValueEvent): AnyT;
}
