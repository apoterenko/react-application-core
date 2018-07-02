import * as React from 'react';
import * as R from 'ramda';

import { noop, toClassName, orNull, cancelEvent } from '../../../util';
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
  FIELD_EMPTY_ERROR_VALUE,
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

  constructor(props: TInternalProps) {
    super(props);

    this.onKeyUp = this.onKeyUp.bind(this);
    this.onKeyDown = this.onKeyDown.bind(this);
  }

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

    if (this.props.onKeyDown) {
      this.props.onKeyDown(event);
    }
  }

  public setFocus(): void {
    this.input.focus();
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
   * @stable [02.07.2018]
   * @param {IFocusEvent} event
   * @returns {boolean}
   */
  protected onFocus(event: IFocusEvent): boolean {
    if (this.props.preventFocus) {
      this.input.blur();
      return false;
    }
    return super.onFocus(event);
  }

  protected get fieldMessage(): JSX.Element {
    const props = this.props;
    const message = props.message;
    return orNull<JSX.Element>(message, () => this.getMessageElement(message));
  }

  /**
   * @stable [18.06.2018]
   * @returns {JSX.Element}
   */
  protected get fieldErrorMessageElement(): JSX.Element {
    const props = this.props;
    const error = this.error;
    return orNull<JSX.Element>(
      !props.notUseErrorMessage,
      () => this.getMessageElement(error, this.uiFactory.textFieldValidationText)
    );
  }

  protected getInputElement(): JSX.Element {
    return <input {...this.getInputElementProps() as IFieldInputProps}/>;
  }

  protected getInputElementProps(): IFieldInputProps|IFieldTextAreaProps {
    const props = this.props;
    const autoFocus = props.autoFocus;
    const name = props.name;
    const step = props.step;
    const type = props.type || 'text';
    const autoComplete = props.autoComplete || 'new-password';
    const readOnly = props.readOnly  || this.inProgress();
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
      ...props.preventValueBinding ? {} : { value: this.displayValue },
      name, type, step, autoFocus, readOnly, disabled, pattern, required, minLength,
      maxLength, rows, cols,
      onFocus, onBlur, onClick, onChange, onKeyDown, onKeyUp, autoComplete,
      ref: 'input',
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

  protected getFieldClassName(): string {
    const props = this.props;
    return toClassName(
      this.uiFactory.formField,
      props.className,
      'rac-form-field',
      'rac-flex-full',
      this.isDeactivated() && 'rac-form-field-disabled'
    );
  }

  protected get error(): string {
    return this.state.error;
  }

  /**
   * @stable [30.05.2018]
   * @returns {boolean}
   */
  protected hasInputFocus(): boolean {
    return document.activeElement === this.input;
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
   * @stable [01.06.2018]
   * @returns {JSX.Element}
   */
  protected getInputAttachmentElement(): JSX.Element {
    return null;
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
   * @stable [17.06.2018]
   * @param {AnyT} value
   * @returns {string}
   */
  protected validateValueAndSetCustomValidity(value: AnyT): string {
    const props = this.props;
    let error = FIELD_EMPTY_ERROR_VALUE;

    this.input.setCustomValidity('');

    if (this.input.validity.valid) {
      // If HTML5-validator returns true then we should call a custom validator
      error = props.validate ? props.validate(value) : error;

      if (!R.isNil(error)) {
        this.input.setCustomValidity(error);
      }
    } else {
      error = this.input.validationMessage;
    }
    return error;
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
   * @stable [18.06.2018]
   * @param {string} message
   * @param {string} className
   * @returns {JSX.Element}
   */
  private getMessageElement(message: string, className?: string): JSX.Element {
    return (
      <p title={message}
         className={toClassName('rac-text-field-help-text', this.uiFactory.textFieldHelpText, className)}>
        {message ? this.t(message) : UNI_CODES.noBreakSpace}
      </p>
    );
  }
}
