import * as React from 'react';
import * as R from 'ramda';
import * as $ from 'jquery';

import { noop, toClassName, orNull, cancelEvent, isElementFocused, IJqInput } from '../../../util';
import {
  AnyT,
  IKeyboardEvent,
  IChangeEvent,
  UNI_CODES,
  IFocusEvent,
  IBasicEvent,
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
import { IEventManager } from '../../../event';
import { DI_TYPES, lazyInject } from '../../../di';

export class Field<TComponent extends IField<TInternalProps, TState>,
                   TInternalProps extends IFieldInternalProps,
                   TState extends IFieldState = IFieldState>
    extends UniversalField<TComponent,
                           TInternalProps,
                           TState,
                           IKeyboardEvent,
                           IFocusEvent,
                           IBasicEvent>
    implements IField<TInternalProps, TState> {

  @lazyInject(DI_TYPES.EventManager) protected eventManager: IEventManager;

  public onChangeManually(currentRawValue: AnyT, context?: AnyT): void {
    this.updateInputBeforeHTML5Validation(this.toDisplayValue(currentRawValue, context));
    super.onChangeManually(currentRawValue, context);
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
    if (!R.isNil(input)) {
      input.focus();
    }
  }

  /**
   * @stable [09.05.2018]
   * @returns {HTMLInputElement | HTMLTextAreaElement}
   */
  public get input(): HTMLInputElement | HTMLTextAreaElement {
    const input = this.refs.input;
    return input && (input as INativeMaskedInputComponent).inputElement
      || input as ( HTMLInputElement | HTMLTextAreaElement);
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
   * @stable [18.06.2018]
   * @returns {JSX.Element}
   */

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
    const readOnly = props.readOnly  || this.inProgress();
    const disabled = props.disabled;
    const pattern = this.getFieldPattern();
    const minLength = props.minLength;
    const maxLength = props.maxLength;
    const rows = props.rows;
    const cols = props.cols;
    const onFocus = this.onFocus;
    const onBlur = this.onBlur;
    const onClick = this.isInactive() ? noop : this.onClick;
    const onKeyDown = this.isInactive() ? noop : this.onKeyDown;
    const onKeyUp = this.isInactive() ? noop : this.onKeyUp;
    const onChange = this.onChange;
    return {
      ...props.preventValueBinding ? {} : { value: this.displayValue },
      name, type, step, readOnly, disabled, pattern, minLength,
      maxLength, rows, cols,
      onFocus, onBlur, onClick, onChange, onKeyDown, onKeyUp, autoComplete,
      ref: 'input',
      required: this.isFieldRequired(),
      className: toClassName(this.uiFactory.textFieldInput, 'rac-field-input'),
      placeholder: orNull(props.placeholder, () => this.t(props.placeholder)),
    };
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
   * @stable [16.09.2018]
   * @returns {string}
   */
  protected getFieldClassName(): string {
    const props = this.props;
    return toClassName(
      'rac-field',
      'rac-flex-full',
      this.isInactive() && 'rac-field-disabled',
      props.active && 'rac-field-active',
      props.shrink && 'rac-field-shrink',
      this.uiFactory.formField,
      props.className,
      'rac-form-field'   // TODO Legacy
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
   *            rac-textarea-field,
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
    return this.input.validity.valid;
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
    this.input.setCustomValidity(error);
  }

  /**
   * @stable [03.09.2018]
   * @param {string} message
   * @param {string} className
   * @returns {JSX.Element}
   */
  protected toMessageElement(message: string, className?: string): JSX.Element {
    return (
      <p title={message}
         className={toClassName('rac-field-help-text', this.uiFactory.fieldHelpText, className)}>
        {message ? this.t(message) : UNI_CODES.noBreakSpace}
      </p>
    );
  }

  /**
   * @stable [17.06.2018]
   * @param {AnyT} value
   */
  private updateInputBeforeHTML5Validation(value: AnyT): void {
    // We must update the field manually before calls HTML5 validation
    this.input.value = value;
  }

  /**
   * @stable [04.09.2018]
   * @returns {IJqInput}
   */
  protected get jqInput(): IJqInput {
    return $(this.input) as IJqInput;
  }
}
