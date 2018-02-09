import * as React from 'react';
import * as R from 'ramda';

import { isFn, isUndef, noop, toClassName } from '../../../util';
import {
  AnyT,
  BasicEventT,
  ChangeEventT,
  FocusEventT,
  IDisplayableConverter,
  KeyboardEventT,
  IProgressable,
} from '../../../definition.interface';
import { BaseComponent } from '../../../component/base';
import {
  IField,
  IFieldInputProps,
  IFieldInternalProps,
  IFieldInternalState,
  IFieldTextAreaProps,
  INativeMaskedInputComponent,
} from './field.interface';

export abstract class Field<TComponent extends IField<TInternalProps, TInternalState>,
                            TInternalProps extends IFieldInternalProps,
                            TInternalState extends IFieldInternalState>
    extends BaseComponent<TComponent, TInternalProps, TInternalState>
    implements IField<TInternalProps, TInternalState>, IProgressable {

  private static EMPTY_VALUE = '';

  constructor(props: TInternalProps) {
    super(props);

    this.onChange = this.onChange.bind(this);
    this.onFocus = this.onFocus.bind(this);
    this.onBlur = this.onBlur.bind(this);
    this.onClick = this.onClick.bind(this);
    this.onKeyUp = this.onKeyUp.bind(this);
    this.onKeyDown = this.onKeyDown.bind(this);

    if (this.isPersistent) {
      this.state = {} as TInternalState;
    } else {
      this.state = {
        stateValue: this.prepareStateValueBeforeSerialization(this.definitePropsValue),
      } as TInternalState;
    }
  }

  public componentWillReceiveProps(nextProps: Readonly<TInternalProps>, nextContext: AnyT): void {
    super.componentWillReceiveProps(nextProps, nextContext);
    const newValue = nextProps.value;

    if (!this.isPersistent && !R.equals(this.stateValue, newValue)) {
      this.setState({ stateValue: this.prepareStateValueBeforeSerialization(newValue) });
    }
  }

  public onChange(event: ChangeEventT): void {
    this.onChangeValue(this.getRawValueFromEvent(event));
  }

  public getRawValueFromEvent(event: ChangeEventT): AnyT {
    return event.target.value;
  }

  public resetError(): void {
    this.validateField(null, null);
  }

  public onKeyDown(event: KeyboardEventT): void {
    const key = event.key;
    switch (key) {
      case 'Enter':
        this.onKeyEnter(event);
        break;
      case 'Escape':
        this.onKeyEscape(event);
        break;
      case 'ArrowDown':
        this.onKeyArrowDown(event);
        break;
      case 'ArrowUp':
        this.onKeyArrowUp(event);
        break;
      case 'Backspace':
        this.onKeyBackspace(event);
        break;
    }

    if (this.props.onKeyDown) {
      this.props.onKeyDown(event);
    }
  }

  public onKeyBackspace(event: KeyboardEventT): void {
    if (this.props.onKeyBackspace) {
      this.props.onKeyBackspace(event);
    }
  }

  public onKeyUp(event: KeyboardEventT): void {
    if (this.props.onKeyUp) {
      this.props.onKeyUp(event);
    }
  }

  public onKeyEnter(event: KeyboardEventT): void {
    if (this.props.onKeyEnter) {
      this.props.onKeyEnter(event);
    }
  }

  public onKeyEscape(event: KeyboardEventT): void {
    if (this.props.onKeyEscape) {
      this.props.onKeyEscape(event);
    }
  }

  public onKeyArrowDown(event: KeyboardEventT): void {
    if (this.props.onKeyArrowDown) {
      this.props.onKeyArrowDown(event);
    }
  }

  public onKeyArrowUp(event: KeyboardEventT): void {
    if (this.props.onKeyArrowUp) {
      this.props.onKeyArrowUp(event);
    }
  }

  public setFocus(): void {
    this.input.focus();
  }

  public get input(): HTMLInputElement {
    return this.refs.input && (this.refs.input as INativeMaskedInputComponent).inputElement
        || this.refs.input as HTMLInputElement;
  }

  public get progress(): boolean {
    return false;
  }

  public get value(): AnyT {
    return this.isPersistent ? this.definitePropsValue : this.stateValue;
  }

  protected abstract getComponent(): JSX.Element;

  protected getComponentProps(): IFieldInputProps|IFieldTextAreaProps {
    const props = this.props;
    const autoFocus = props.autoFocus;
    const name = props.name;
    const step = props.step;
    const type = props.type || 'text';
    const autoComplete = props.autoComplete || 'new-password';
    const readOnly = props.readOnly  || this.progress;
    const disabled = props.disabled;
    const pattern = this.getFieldPattern();
    const required = props.required;
    const minLength = props.minLength;
    const maxLength = props.maxLength;
    const rows = props.rows;
    const cols = props.cols;
    const onFocus = this.onFocus;
    const onBlur = this.onBlur;
    const onClick = this.isDeactivated() ? noop : this.onClick;
    const onKeyDown = this.isDeactivated() ? noop : this.onKeyDown;
    const onKeyUp = this.isDeactivated() ? noop : this.onKeyUp;
    const onChange = this.onChange;
    return {
      name, type, step, autoFocus, readOnly, disabled, pattern, required, minLength,
      maxLength, rows, cols,
      onFocus, onBlur, onClick, onChange, onKeyDown, onKeyUp, autoComplete,
      ref: 'input',
      value: this.toDisplayValue(),
      className: toClassName(this.uiFactory.textFieldInput, 'rac-field-input'),
      placeholder: props.placeholder ? this.t(props.placeholder) : null,
    };
  }

  protected toDisplayValue(): AnyT {
    const props = this.props;
    const value = this.value;

    return this.progress
      ? this.getEmptyDisplayValue()
      : (
        this.isValuePresent
          ? (isUndef(props.displayValue)
              ? value
              : (isFn(props.displayValue)
                  ? (props.displayValue as IDisplayableConverter<AnyT>)(value, this.props)
                  : props.displayValue))
          : this.getEmptyDisplayValue()
      );
  }

  protected onFocus(event: FocusEventT): void {
    if (this.props.onFocus) {
      this.props.onFocus(event);
    }
  }

  protected onBlur(event: FocusEventT): void {
    if (this.props.onBlur) {
      this.props.onBlur(event);
    }
  }

  protected onClick(event: BasicEventT): void {
    this.stopEvent(event);

    if (this.props.onClick) {
      this.props.onClick(event);
    }
  }

  protected onChangeValue(currentRawValue?: AnyT, error?: string): void {
    const originalValue = this.props.originalValue;
    const isFieldDirty = !isUndef(currentRawValue) && this.hasOriginalValue
        && !R.equals(currentRawValue, originalValue);

    if ((this.hasOriginalValue && !isFieldDirty)
        || (!this.hasOriginalValue && this.getEmptyValue() === currentRawValue)) {
      currentRawValue = undefined;  // Clear dirty changes
      error = null;
    }

    if (!this.isPersistent) {
      this.setState({ stateValue: this.prepareStateValueBeforeSerialization(currentRawValue) });
    }
    this.validateField(currentRawValue, error);

    this.propsOnChange(currentRawValue);
    this.propsChangeForm(currentRawValue);
  }

  protected get hasOriginalValue(): boolean {
    return !isUndef(this.props.originalValue);
  }

  protected propsChangeForm(rawValue: AnyT): void {
    if (this.props.changeForm) {
      this.props.changeForm(
          this.props.name,
          this.prepareStateValueBeforeSerialization(rawValue),
          this.props.validationGroup
      );
    }
  }

  protected prepareStateValueBeforeSerialization(rawValue: AnyT): AnyT {
    // The state may be an external storage and the value must be able to be serialized
    return rawValue;
  }

  protected cleanNativeInputForSupportHTML5Validation(): void {
    this.input.value = this.getEmptyValue();  // We should reset the field manually before HTML5 validation will be called
  }

  protected clearValue(): void {
    this.setFocus();

    if (!this.isValuePresent) {
      return;
    }
    this.cleanNativeInputForSupportHTML5Validation();
    this.onChangeValue(this.getEmptyValue(), null);
  }

  protected getFieldClassName(): string {
    return toClassName(
        this.uiFactory.formField,
        'rac-form-field',
        'rac-flex-full',
        this.isDeactivated() && 'rac-form-field-disabled'
    );
  }

  protected get isValuePresent(): boolean {
    return !isUndef(this.value) && !R.equals(this.value, this.getEmptyValue());
  }

  protected get error(): string {
    return this.state.error;
  }

  protected get inputCursorPosition(): number {
    return this.input.selectionStart;
  }

  protected get hasInputFocus(): boolean {
    return document.activeElement === this.input;
  }

  protected isDeactivated(): boolean {
    return this.props.disabled || this.props.readOnly || this.progress;
  }

  protected getFieldMask(): Array<string|RegExp> {
    return this.props.mask;
  }

  protected getFieldPattern(): string {
    return this.props.pattern;
  }

  protected getEmptyValue(): AnyT {
    return Field.EMPTY_VALUE;
  }

  protected getEmptyDisplayValue(): AnyT {
    return Field.EMPTY_VALUE;
  }

  private validateValueAndSetCustomValidity(value: AnyT): string {
    const props = this.props;
    let error = null;
    if (this.input.validity.valid) {
      error = props.validate ? props.validate(value) : null;
      if (error) {
        this.input.setCustomValidity(error);
      }
    } else {
      error = this.input.validationMessage;
    }
    return error;
  }

  private propsOnChange(rawValue: AnyT): void {
    if (this.props.onChange) {
      this.props.onChange(rawValue);
    }
  }

  private get definitePropsValue(): AnyT {
    return isUndef(this.props.value)
        // Prevent warning: "Input is changing a uncontrolled input of type text to be controlled..."
        ? this.getEmptyValue()
        : this.props.value;
  }

  private get stateValue(): AnyT {
    return this.state.stateValue;
  }

  private validateField(rawValue: AnyT, error?: string): boolean {
    this.input.setCustomValidity(''); // Support of HTML5 Validation Api
    const error0 = isUndef(error) ? this.validateValueAndSetCustomValidity(rawValue) : error;
    this.setState({ error: error0  });
    return R.isNil(error0);
  }
}
