import * as React from 'react';
import * as R from 'ramda';

import {
  toClassName,
  orNull,
  cancelEvent,
  isElementFocused,
  orUndef,
  defValuesFilter,
  toJqEl,
} from '../../../util';
import {
  AnyT,
  IKeyboardEvent,
  IChangeEvent,
  UNI_CODES,
  IFocusEvent,
  IJQueryInputElement,
  } from '../../../definitions.interface';
import {
  IField,
  IFieldInputProps,
  IFieldInternalProps,
  IFieldState,
  IFieldTextAreaProps,
  INativeMaskedInputComponent,
} from './field.interface';
import { UniversalField } from './universal-field.component';
import { IBasicEvent } from '../../../react-definitions.interface';

export class Field<TInternalProps extends IFieldInternalProps,
                   TState extends IFieldState = IFieldState>
    extends UniversalField<TInternalProps,
                           TState,
                           IKeyboardEvent,
                           IFocusEvent,
                           IBasicEvent>
    implements IField<TInternalProps, TState> {

  /**
   * @stable [07.01.2019]
   * @param {AnyT} currentRawValue
   */
  public onChangeManually(currentRawValue: AnyT): void {
    this.updateInputBeforeHTML5Validation(currentRawValue);
    super.onChangeManually(currentRawValue);
  }

  /**
   * @stable [18.06.2018]
   * @param {IChangeEvent} event
   * @returns {AnyT}
   */
  public getRawValueFromEvent(event: IChangeEvent): AnyT {
    return event.target.value;
  }

  /**
   * @stable [17.06.2018]
   */
  public resetError(): void {
    if (!R.isNil(this.input.required)) {
      // Because of Flux-architecture (chicken-and-egg dilemma)
      // This flag is being set by a redux engine on a new cycle
      // Need to reset: required, pattern, etc...

      this.input.required = false;
    }
    super.resetError();
  }

  /**
   * @stable [03.09.2018]
   * @param {IKeyboardEvent} event
   */
  public onKeyDown(event: IKeyboardEvent): void {
    const key = event.key;

    switch (key) {
      case 'Tab':
        this.onKeyTab(event);
        break;
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

    super.onKeyDown(event);
  }

  /**
   * @stable [20.08.2018]
   */
  public setFocus(): void {
    const input = this.input;
    const props = this.props;

    if (!props.preventFocus && !R.isNil(input)) {
      input.focus();
    }
  }

  /**
   * @stable [05.10.2018]
   * @returns {HTMLInputElement | HTMLTextAreaElement}
   */
  public get input(): HTMLInputElement | HTMLTextAreaElement {
    const input = this.refs.input;
    return orNull<HTMLInputElement | HTMLTextAreaElement>(
      this.hasInput,
      () => (input as INativeMaskedInputComponent).inputElement || input as HTMLInputElement | HTMLTextAreaElement
    );
  }

  /**
   * @stable [05.10.2018]
   * @returns {boolean}
   */
  protected get hasInput(): boolean {
    return !R.isNil(this.refs.input);
  }

  /**
   * @stable [20.08.2018]
   */
  protected removeFocus(): void {
    const input = this.input;
    if (!R.isNil(input)) {
      input.blur();
    }
  }

  /**
   * @stable [30.10.2018]
   * @param {IFocusEvent} event
   */
  protected onBlur(event: IFocusEvent): void {
    super.onBlur(event);
    this.setState({focused: false});
  }

  /**
   * @stable [30.10.2018]
   * @param {IFocusEvent} event
   */
  protected onFocus(event: IFocusEvent): void {
    super.onFocus(event);
    this.setState({focused: true});
  }

  /**
   * @stable [31.08.2018]
   * @returns {JSX.Element}
   */
  protected getInputElement(): JSX.Element {
    return <input {...this.getInputElementProps() as IFieldInputProps}/>;
  }

  protected getInputElementProps(): IFieldInputProps | IFieldTextAreaProps {
    const props = this.props;
    const name = props.name;
    const step = props.step;
    const type = props.type || 'text';
    const autoComplete = props.autoComplete || 'off';
    const readOnly = props.readOnly || this.inProgress();
    const placeholder = orNull<string>(props.placeholder && !this.inProgress(), () => this.t(props.placeholder));
    const disabled = props.disabled;
    const pattern = this.getFieldPattern();
    const minLength = props.minLength;
    const maxLength = props.maxLength;
    const rows = props.rows;
    const cols = props.cols;
    const onFocus = this.onFocus;
    const onBlur = this.onBlur;
    const onChange = this.onChange;
    const onClick = orUndef(!this.isFieldInactive(), () => this.onClick);
    const onKeyDown = orUndef(!this.isFieldInactive(), () => this.onKeyDown);
    const onKeyUp = orUndef(!this.isFieldInactive(), () => this.onKeyUp);

    return defValuesFilter<IFieldInputProps | IFieldTextAreaProps, IFieldInputProps | IFieldTextAreaProps>({
      name, type, step, readOnly, disabled, pattern, minLength, placeholder,
      maxLength, rows, cols,
      onFocus, onBlur, onClick, onChange, onKeyDown, onKeyUp, autoComplete,
      ref: 'input',
      value: this.displayValue,
      required: this.isFieldRequired(),
      className: 'rac-field-input rac-flex-full',
    });
  }

  /**
   * @stable [18.06.2018]
   * @param {IBasicEvent} event
   */
  protected onClick(event: IBasicEvent): void {
    cancelEvent(event);
    super.onClick(event);
  }

  /**
   * @stable [06.10.2018]
   * @returns {string}
   */
  protected getFieldClassName(): string {
    const props = this.props;

    return toClassName(
      'rac-field',
      'rac-flex',
      'rac-flex-column',
      orUndef<string>(!(props.className || '').includes('rac-flex-'), orUndef<string>(props.full !== false, 'rac-flex-full')),
      this.isFieldRequired() && 'rac-field-required',
      this.isFieldInvalid() && 'rac-field-invalid',
      this.isFieldInactive() && 'rac-field-inactive',
      this.isValuePresent() ? 'rac-field-value-present' : 'rac-field-value-not-present',
      this.isNotDefaultValuePresent() && 'rac-field-not-default-value-present',
      this.isFieldChangeable() ? 'rac-field-changeable' : 'rac-field-not-changeable',
      this.isFieldFocused() ? 'rac-field-focused' : 'rac-field-not-focused',
      props.fieldDisplayed !== false ? 'rac-field-displayed' : 'rac-field-no-displayed',
      props.disabled && 'rac-field-disabled',
      props.readOnly && 'rac-field-readonly',
      props.label && 'rac-field-labeled',
      props.preventFocus && 'rac-field-prevent-focus',
      props.prefixLabel ? 'rac-field-label-prefixed' : 'rac-field-label-not-prefixed',
      props.className
    );
  }

  /**
   * @stable [03.09.2018]
   * @returns {boolean}
   */
  protected hasInputFocus(): boolean {
    return isElementFocused(this.input);
  }

  protected getInputElementWrapperClassName(): string {
    return toClassName(
      'rac-field-input-wrapper',
      'rac-flex',
      'rac-flex-full',
      this.props.inputWrapperClassName
    );
  }

  /**
   * stable [18.06.2018]
   * @example [
   *            rac-checkbox-field,
   *            rac-text-field
   *          ]
   * @stable
   * @returns Class name
   */
  protected getSelfElementClassName(): string {
    return 'rac-self-field';
  }

  /**
   * @stable [31.07.2018]
   * @returns {boolean}
   */
  protected isInputValid(): boolean {
    return !this.hasInput || this.input.validity.valid;
  }

  /**
   * @stable [31.07.2018]
   * @returns {string}
   */
  protected getNativeInputValidationMessage(): string {
    return this.input.validationMessage;
  }

  /**
   * @stable [31.07.2018]
   * @param {string} error
   */
  protected setNativeInputValidity(error: string): void {
    if (this.hasInput) {
      this.input.setCustomValidity(error);
    }
  }

  /**
   * @stable [03.09.2018]
   * @param {string} message
   * @param {string} className
   * @returns {JSX.Element}
   */
  protected toMessageElement(message: string, className?: string): JSX.Element {
    return (
      <div title={message}
           className={toClassName('rac-field-help-text', className)}>
        {message ? this.t(message) : UNI_CODES.noBreakSpace}
      </div>
    );
  }

  /**
   * @stable [17.06.2018]
   * @param {AnyT} value
   */
  private updateInputBeforeHTML5Validation(value: AnyT): void {
    if (this.hasInput) {
      // We must update the field manually before calls HTML5 validation
      this.input.value = value;
    }
  }

  /**
   * TODO domAccessor
   */
  protected get jqInput(): IJQueryInputElement {
    return toJqEl(this.input) as IJQueryInputElement;
  }
}
