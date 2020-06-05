import * as React from 'react';
import * as R from 'ramda';

import {
  calc,
  cancelEvent,
  defValuesFilter,
  ifNotNilThanValue,
  isErrorMessageRendered,
  isFn,
  isFull,
  joinClassName,
  orNull,
  orUndef,
} from '../../../util';
import {
  AnyT,
  IChangeEvent,
  IKeyboardEvent,
  UniCodesEnum,
  } from '../../../definitions.interface';
import {
  IField2State,
} from './field.interface';
import { UniversalField } from './universal-field.component';
import {
  ComponentClassesEnum,
  FieldActionPositionsEnum,
  FieldClassesEnum,
  IBaseEvent,
  IComponentsSettingsEntity,
  IField,
  IFieldActionEntity,
  FieldComposedInputAttributesT,
  IFieldInputAttributes,
  IJQueryElement,
  IMaskedInputCtor,
  InputElementT,
} from '../../../definition';
import { IFieldProps2 } from '../../../configurations-definitions.interface';

export class Field2<TProps extends IFieldProps2,
                   TState extends IField2State = IField2State>
    extends UniversalField<TProps,
                           TState>
    implements IField<TProps, TState> {

  protected defaultActions: IFieldActionEntity[] = [];

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
      <div
        className={this.getFieldClassName()}
        onClick={cancelEvent}
      >
        {this.props.children}
        {this.getDisplayValueElement()}
        {this.selfElement}
        {this.getMessageElement()}
        {this.getErrorMessageElement()}
        {this.getAttachmentElement()}
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
   */
  public setFocus(): void {
    ifNotNilThanValue(
      this.input,
      (input) => {
        if (!this.isFocusPrevented) {
          input.focus();
        }
      }
    );
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
        <label className='rac-field-label'>
          {this.t(label)}
        </label>
      )
    );
  }

  /**
   * @stable [16.02.2020]
   * @returns {JSX.Element}
   */
  protected getAttachmentElement(): JSX.Element {
    return null;
  }

  /**
   * @stable [11.01.2020]
   * @param {IBaseEvent} event
   */
  protected onClick(event: IBaseEvent): void {
    this.domAccessor.cancelEvent(event);

    const props = this.props;
    if (isFn(props.onClick)) {
      props.onClick(event);
    }
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
      className: 'rac-field-input rac-flex-x1',
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
      'rac-field',
      isFull(props) && ComponentClassesEnum.FLEX_X1, // TODO full-field
      this.isRequired && 'rac-field-required',
      this.isBusy && 'rac-field-busy',
      this.isInvalid && 'rac-field-invalid',
      this.isValuePresent ? 'rac-field-value-present' : 'rac-field-value-not-present',
      this.isChangeable ? 'rac-field-changeable' : 'rac-field-not-changeable',
      this.isFocused ? 'rac-field-focused' : 'rac-field-not-focused',
      this.isDisabled && 'rac-field-disabled',
      this.isReadOnly && 'rac-field-readonly',
      this.isFocusPrevented && 'rac-field-prevent-focus',
      !R.isEmpty(this.getFieldActions()) && 'rac-field-actioned',
      props.label && 'rac-field-labeled',
      props.prefixLabel ? 'rac-field-label-prefixed' : 'rac-field-label-not-prefixed',
      calc<string>(props.className)
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
        className={joinClassName('rac-field-help-text', className)}>
        {message ? this.t(message) : UniCodesEnum.NO_BREAK_SPACE}
      </div>
    );
  }

  /**
   * @stable [30.10.2019]
   * @returns {IFieldActionEntity[]}
   */
  protected getFieldActions(): IFieldActionEntity[] {
    const props = this.props;
    const defaultActions = this.defaultActions || [];
    const actions = props.actions || [];

    return props.actionsPosition === FieldActionPositionsEnum.LEFT
      ? defaultActions.concat(actions)
      : actions.concat(defaultActions);
  }

  /**
   * @stable [29.09.2019]
   * @returns {IJQueryElement}
   */
  protected get jqInput(): IJQueryElement {
    return this.domAccessor.asJqEl(this.input);
  }

  /**
   * @stable [16.02.2020]
   * @returns {boolean}
   */
  private get isErrorMessageRendered(): boolean {
    return isErrorMessageRendered(this.systemProps) && isErrorMessageRendered(this.props);
  }

  /**
   * @stable [16.02.2020]
   * @returns {TProps}
   */
  private get systemProps(): TProps {
    const {field = {}} = this.settings.components || {} as IComponentsSettingsEntity;
    return field as TProps;
  }
}
