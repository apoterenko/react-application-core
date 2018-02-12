import * as React from 'react';
import * as R from 'ramda';
import * as Printf from 'sprintf-js';

import { isFn, isUndef, isDef, noop, toClassName, orDefault, orNull } from '../../../util';
import {
  AnyT,
  BasicEventT,
  ChangeEventT,
  FocusEventT,
  KeyboardEventT,
  IProgressable,
} from '../../../definition.interface';
import { BaseComponent } from '../../base';
import {
  IField,
  IFieldInputProps,
  IFieldInternalProps,
  IFieldInternalState,
  IFieldTextAreaProps,
  INativeMaskedInputComponent,
  IFieldDisplayValueConverter,
  FieldDisplayValueConverterT,
} from './field.interface';

export class Field<TComponent extends IField<TInternalProps, TInternalState>,
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

    this.state = {} as TInternalState;
  }

  public onChange(event: ChangeEventT): void {
    this.onChangeValue(this.getRawValueFromEvent(event));
  }

  public onChangeManually(currentRawValue: AnyT, context?: AnyT): void {
    this.updateNativeInputBeforeHTML5Validation(this.toDisplayValue(currentRawValue, context));
    this.onChangeValue(currentRawValue);
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
    const input = this.refs.input;
    return input && (input as INativeMaskedInputComponent).inputElement || input as HTMLInputElement;
  }

  public get progress(): boolean {
    return false;
  }

  public get value(): AnyT {
    return this.props.value;
  }

  protected get definiteValue(): AnyT {
    return isUndef(this.value) ? this.getEmptyValue() : this.value;
  }

  protected getComponent(): JSX.Element {
    return <input {...this.getComponentProps() as IFieldInputProps}/>;
  }

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
      value: this.displayValue,
      className: toClassName(this.uiFactory.textFieldInput, 'rac-field-input'),
      placeholder: orNull(props.placeholder, () => this.t(props.placeholder)),
    };
  }

  protected get displayValue(): AnyT {
    return this.toDisplayValue(this.value);
  }

  protected toDisplayValue(value: AnyT, context?: AnyT): AnyT {
    const props = this.props;

    return this.progress
      ? Field.EMPTY_VALUE
      : (
        this.isValuePresent(value)
          ? (isUndef(props.displayValue)
              ? value
              : (isFn(props.displayValue)
                  ? (props.displayValue as FieldDisplayValueConverterT)(value, this)
                  : props.displayValue))
          : Field.EMPTY_VALUE
      );
  }

  protected printfDisplayMessage(usePrintf: boolean, ...args: AnyT[]): string {
    const props = this.props;
    return orDefault(
      usePrintf,
      () => Printf.sprintf(this.t(props.displayMessage), ...args),
      Field.EMPTY_VALUE
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

  protected onChangeValue(currentRawValue: AnyT, error?: string): void {
    const originalValue = this.props.originalValue;
    const isFieldDirty = !isUndef(currentRawValue) && this.hasOriginalValue
        && !R.equals(currentRawValue, originalValue);

    if ((this.hasOriginalValue && !isFieldDirty)
        || (!this.hasOriginalValue && this.getEmptyValue() === currentRawValue)) {
      currentRawValue = undefined;  // Clear dirty changes
      error = null;
    }

    this.validateField(currentRawValue, error);

    this.propsOnChange(currentRawValue);
    this.propsChangeForm(currentRawValue);
  }

  protected get hasOriginalValue(): boolean {
    return isDef(this.props.originalValue);
  }

  protected propsChangeForm(rawValue: AnyT): void {
    if (this.props.changeForm) {
      this.props.changeForm(
          this.props.name,
          this.toOutputValue(rawValue),
          this.props.validationGroup
      );
    }
  }

  protected toOutputValue(rawValue: AnyT): AnyT {
    // The state may be an external storage and the value must be able to be serialized
    return rawValue;
  }

  protected cleanNativeInputBeforeHTML5Validation(): void {
    this.updateNativeInputBeforeHTML5Validation(this.getEmptyValue());
  }

  protected updateNativeInputBeforeHTML5Validation(value: AnyT): void {
    // We must update the field manually before calls HTML5 validation
    this.input.value = value;
  }

  protected clearValue(): void {
    this.setFocus();

    if (this.isValuePresent()) {
      this.onChangeManually(this.getEmptyValue());
    }
  }

  protected getFieldClassName(): string {
    const props = this.props;
    return toClassName(
      this.uiFactory.formField,
      props.className,
      'rac-form-field',
      !(props.className || '').includes('rac-flex-full') && 'rac-flex-full',
      this.isDeactivated() && 'rac-form-field-disabled'
    );
  }

  protected isValuePresent(value = this.value): boolean {
    return isDef(value) && !R.equals(value, this.getEmptyValue());
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

  private validateField(rawValue: AnyT, error?: string): void {
    this.input.setCustomValidity(''); // Support of HTML5 Validation Api
    const error0 = R.isNil(error) ? this.validateValueAndSetCustomValidity(rawValue) : error;
    this.setState({ error: error0  });
  }
}
