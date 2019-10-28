import * as React from 'react';
import * as R from 'ramda';

import {
  cancelEvent,
  defValuesFilter,
  fullFlexClassName,
  ifNotNilThanValue,
  isFn,
  joinClassName,
  orNull,
  toClassName,
} from '../../../util';
import {
  AnyT,
  IKeyboardEvent,
  IChangeEvent,
  UNI_CODES,
  IFocusEvent,
  } from '../../../definitions.interface';
import {
  IField,
  IFieldState,
} from './field.interface';
import { UniversalField } from './universal-field.component';
import {
  IBaseEvent,
  IFieldComplexInputAttributes,
  IFieldInputAttributes,
  IJQueryElement,
  IMaskedInputCtor,
  InputElementT,
} from '../../../definition';
import { IFieldProps } from '../../../configurations-definitions.interface';

export class Field<TProps extends IFieldProps,
                   TState extends IFieldState = IFieldState>
    extends UniversalField<TProps,
                           TState,
                           IKeyboardEvent,
                           IFocusEvent>
    implements IField<TProps, TState> {

  protected readonly inputRef = React.createRef<InputElementT | IMaskedInputCtor>();

  /**
   * @stable [28.10.2019]
   * @param {TProps} props
   */
  constructor(props: TProps) {
    super(props);
    this.onClick = this.onClick.bind(this);
  }

  /**
   * @stable [26.05.2019]
   * @returns {JSX.Element}
   */
  public render(): JSX.Element {
    return (
      <div className={this.getFieldClassName()}>
        {this.props.children}
        {this.getSelfElement()}
        {this.getMessageElement()}
        {this.getErrorMessageElement()}
        {this.getAttachmentElement()}
        {this.getKeyboardElement()}
      </div>
    );
  }

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
   * @stable [28.10.2019]
   * @returns {InputElementT}
   */
  public get input(): InputElementT {
    return ifNotNilThanValue(
      this.inputRef.current,
      (input) => (input as IMaskedInputCtor).inputElement || input as InputElementT
    );
  }

  protected getSelfElement(): JSX.Element {
    const props = this.props;
    return orNull<JSX.Element>(
      props.fieldRendered !== false,
      () => (
        <div ref='self'
             style={props.style}
             className={this.getSelfElementClassName()}>
          {this.getPrefixLabelElement()}
          {this.getInputWrapperElement()}
          {this.actionsElement}
          {this.getLabelElement()}
          {this.getProgressLabelElement()}
        </div>
      )
    );
  }

  protected getInputWrapperElement(): JSX.Element {
    return (
      <div className={this.getInputWrapperElementClassName()}>
        {this.getInputElement()}
        {this.getMirrorInputElement()}
        {this.getInputCaretElement()}
        {this.getInputAttachmentElement()}
      </div>
    );
  }

  protected getProgressLabelElement(): JSX.Element {
    return null;
  }

  protected get actionsElement(): JSX.Element {
    return null;
  }

  protected getLabelElement(): JSX.Element {
    const props = this.props;
    return ifNotNilThanValue(
      props.label,
      () => (
        <label className='rac-field-label'>
          {this.t(props.label)}
        </label>
      )
    );
  }

  protected getMirrorInputElement(): JSX.Element {
    return null;
  }

  protected getInputCaretElement(): JSX.Element {
    return null;
  }

  protected getPrefixLabelElement(): JSX.Element {
    return null;
  }

  protected getAttachmentElement(): JSX.Element {
    return null;
  }

  /**
   * @stable [28.10.2019]
   * @returns {boolean}
   */
  protected get hasInput(): boolean {
    return !R.isNil(this.inputRef.current);
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
   * @stable [28.10.2019]
   * @param {TBasicEvent} event
   */
  protected onClick(event: IBaseEvent): void {
    cancelEvent(event);

    const props = this.props;
    if (isFn(props.onClick)) {
      props.onClick(event);
    }
  }

  /**
   * @stable [31.08.2018]
   * @returns {JSX.Element}
   */
  protected getInputElement(): JSX.Element {
    return <input {...this.getInputElementProps() as IFieldInputAttributes}/>;
  }

  protected getInputElementProps(): IFieldComplexInputAttributes {
    const props = this.props;
    /**/
    const autoComplete = props.autoComplete || 'off';
    const cols = props.cols;                                                                               /* @stable [28.10.2019] */
    const disabled = this.isDisabled;                                                                      /* @stable [28.10.2019] */
    const maxLength = props.maxLength;                                                                     /* @stable [28.10.2019] */
    const minLength = props.minLength;                                                                     /* @stable [28.10.2019] */
    const name = props.name;                                                                               /* @stable [28.10.2019] */
    const pattern = this.getFieldPattern();
    const placeholder = orNull(props.placeholder && !this.inProgress, () => this.t(props.placeholder));
    const readOnly = this.isInactive;                                                                      /* @stable [28.10.2019] */
    const required = this.isFieldRequired();
    const rows = props.rows;                                                                               /* @stable [28.10.2019] */
    const step = props.step;                                                                               /* @stable [28.10.2019] */
    const tabIndex = props.tabIndex;                                                                       /* @stable [28.10.2019] */
    const type = props.type || 'text';                                                                     /* @stable [28.10.2019] */
    const value = this.displayValue;                                                                       /* @stable [28.10.2019] */

    const result = defValuesFilter<IFieldComplexInputAttributes, IFieldComplexInputAttributes>({
      className: 'rac-field-input rac-flex-full',
      autoComplete, cols, disabled, maxLength, minLength, name, pattern,
      placeholder, readOnly, rows, step, tabIndex, type, value, required,
      ...(
        this.isActive
          ? {
            onBlur: this.onBlur,
            onChange: this.onChange,
            onClick: this.onClick,
            onFocus: this.onFocus,
            onKeyDown: this.onKeyDown,
            onKeyUp: this.onKeyUp,
          }
          : {}
      ),
    });
    return {
      ...result,
      ref: this.inputRef,
    } as IFieldComplexInputAttributes;
  }

  /**
   * @stable [06.10.2018]
   * @returns {string}
   */
  protected getFieldClassName(): string {
    const props = this.props;

    return joinClassName(
      'rac-field',
      fullFlexClassName(props),
      this.isFieldRequired() && 'rac-field-required',
      this.isFieldInvalid() && 'rac-field-invalid',
      this.isValuePresent() ? 'rac-field-value-present' : 'rac-field-value-not-present',
      this.isNotDefaultValuePresent() && 'rac-field-not-default-value-present',
      this.isChangeable ? 'rac-field-changeable' : 'rac-field-not-changeable',
      this.isFieldFocused() ? 'rac-field-focused' : 'rac-field-not-focused',
      props.disabled && 'rac-field-disabled',
      props.readOnly && 'rac-field-readonly',
      props.label && 'rac-field-labeled',
      props.preventFocus && 'rac-field-prevent-focus',
      props.prefixLabel ? 'rac-field-label-prefixed' : 'rac-field-label-not-prefixed',
      props.className
    );
  }

  /**
   * @stable [23.10.2019]
   * @returns {string}
   */
  protected getInputWrapperElementClassName(): string {
    return 'rac-field-input-wrapper';
  }

  /**
   * @stable [24.10.2019]
   * @returns {string}
   */
  protected getSelfElementClassName(): string {
    // A field may be invisible, but attachment - visible
    return joinClassName('rac-self-field', !this.isVisible && 'rac-invisible');
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
      <div
        title={message}
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
   * @stable [29.09.2019]
   * @returns {IJQueryElement}
   */
  protected get jqInput(): IJQueryElement {
    return this.domAccessor.toJqEl(this.input);
  }
}
