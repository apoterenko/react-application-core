import * as React from 'react';
import * as R from 'ramda';

import {
  cancelEvent,
  defValuesFilter,
  ifNotNilThanValue,
  isFull,
  joinClassName,
  orNull,
  orUndef,
} from '../../../util';
import {
  IKeyboardEvent,
  UniCodesEnum,
  } from '../../../definitions.interface';
import {
  IField2State,
} from './field.interface';
import { UniversalField } from './universal-field.component';
import {
  ComponentClassesEnum,
  FieldComposedInputAttributesT,
  IField,
  IJQueryElement,
} from '../../../definition';
import { IFieldProps2 } from '../../../configurations-definitions.interface';

export class Field2<TProps extends IFieldProps2,
                   TState extends IField2State = IField2State>
    extends UniversalField<TProps,
                           TState>
    implements IField<TProps, TState> {

  /**
   * @stable [26.05.2019]
   * @returns {JSX.Element}
   */
  public render(): JSX.Element {
    return (
      <div
        className={this.getFieldClassName()}
        onClick={cancelEvent}
      >
        {this.props.children}
        {this.getDisplayValueElement()}
        {this.selfElement}
        {this.getMessageElement()}
        {this.getErrorMessageElement()}
        {this.attachmentElement}
        {this.getKeyboardElement()}
      </div>
    );
  }

  /**
   * @stable [29.10.2019]
   */
  public componentWillUnmount(): void {
    super.componentWillUnmount();
    this.onCloseVirtualKeyboard();
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
   * @stable [29.10.2019]
   * @returns {JSX.Element}
   */
  protected getKeyboardElement(): JSX.Element {
    return orNull(this.isKeyboardUsed && this.isKeyboardOpen(), () => this.keyboardElement);
  }

  /**
   * @stable [03.09.2018]
   * @returns {JSX.Element}
   */
  protected getErrorMessageElement(): JSX.Element {
    return this.isErrorMessageRendered
      ? this.toMessageElement(this.error, 'rac-field-error-text')
      : null;
  }

  /**
   * @stable [22.01.2020]
   * @returns {JSX.Element}
   */
  protected get selfElement(): JSX.Element {
    const props = this.props;
    if (this.isFieldRendered) {
      return (
        <div
          ref={this.actualRef}
          style={props.style}
          title={this.getTitle()}
          className={this.getSelfElementClassName()}
        >
          {this.prefixLabelElement}
          {this.inputWrapperElement}
          {this.actionsElement}
          {this.labelElement}
          {this.progressInfoElement}
        </div>
      );
    }
    return this.inputWrapperElement;
  }

  protected getTitle(): string {
    return this.props.title as string || orNull(this.isFocusPrevented, () => this.displayValue);
  }

  protected get labelElement(): JSX.Element {
    return ifNotNilThanValue(
      this.getLabel(),
      (label) => (
        <label className='rac-field__label'>
          {this.t(label)}
        </label>
      )
    );
  }

  /**
   * @stable [30.10.2019]
   * @returns {FieldComposedInputAttributesT}
   */
  protected getInputElementProps(): FieldComposedInputAttributesT {
    const props = this.props;
    /**/
    const autoComplete = props.autoComplete || 'off';                                                       /* @stable [29.10.2019] */
    const cols = props.cols;                                                                                /* @stable [28.10.2019] */
    const disabled = this.isDisabled;                                                                       /* @stable [28.10.2019] */
    const maxLength = props.maxLength;                                                                      /* @stable [28.10.2019] */
    const minLength = props.minLength;                                                                      /* @stable [28.10.2019] */
    const name = props.name;                                                                                /* @stable [28.10.2019] */
    const pattern = this.getFieldPattern();                                                                 /* @stable [29.10.2019] */
    const placeholder = orUndef(props.placeholder && !this.isBusy, () => this.t(props.placeholder));   /* @stable [29.10.2019] */
    const readOnly = this.isInactive;                                                                       /* @stable [28.10.2019] */
    const required = this.isRequired;                                                                       /* @stable [29.10.2019] */
    const rows = props.rows;                                                                                /* @stable [28.10.2019] */
    const step = props.step;                                                                                /* @stable [28.10.2019] */
    const tabIndex = props.tabIndex;                                                                        /* @stable [28.10.2019] */
    const type = props.type || 'text';                                                                      /* @stable [28.10.2019] */
    const value = this.displayValue;                                                                        /* @stable [28.10.2019] */

    const result = defValuesFilter<FieldComposedInputAttributesT, FieldComposedInputAttributesT>({
      className: 'rac-field__input rac-flex-x1',
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
    } as FieldComposedInputAttributesT;
  }

  /**
   * @stable [06.10.2018]
   * @returns {string}
   */
  protected getFieldClassName(): string {
    const props = this.props;

    return joinClassName(
      super.getFieldClassName(),
      isFull(props) && ComponentClassesEnum.FLEX_X1, // TODO full-field
      this.isFocused ? 'rac-field-focused' : 'rac-field-not-focused',
      this.isReadOnly && 'rac-field-readonly',
      this.isFocusPrevented && 'rac-field-prevent-focus'
    );
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
        className={joinClassName('rac-field__help-text', className)}>
        {message ? this.t(message) : UniCodesEnum.NO_BREAK_SPACE}
      </div>
    );
  }

  /**
   * @stable [29.09.2019]
   * @returns {IJQueryElement}
   */
  protected get jqInput(): IJQueryElement {
    return this.domAccessor.asJqEl(this.input);
  }
}
