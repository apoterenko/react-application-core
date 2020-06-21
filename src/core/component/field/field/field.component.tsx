import * as React from 'react';
import * as R from 'ramda';

import {
  AnyT,
  IChangeEvent,
  UniCodesEnum,
} from '../../../definitions.interface';
import {
  ChangeEventT,
  EventsEnum,
  FieldClassesEnum,
  FieldComposedInputAttributesT,
  FieldConstants,
  IBaseEvent,
  IField,
  IFieldInputAttributes,
  IFieldProps,
  IFieldState,
  IFocusEvent,
  IKeyboardProps,
  IMaskedInputCtor,
  InputElementT,
  KeyboardClassNamesEnum,
  TouchEventsEnum,
} from '../../../definition';
import {
  CalcUtils,
  ClsUtils,
  ConditionUtils,
  DelayedTask,
  FieldUtils,
  isDef,
  ObjectUtils,
  TypeUtils,
  ValueUtils,
  WrapperUtils,
} from '../../../util';
import { Info } from '../../info';
import { EnhancedGenericComponent } from '../../base/enhanced-generic.component';
import { Keyboard } from '../../keyboard/keyboard.component';

export class Field<TProps extends IFieldProps, TState extends IFieldState>
  extends EnhancedGenericComponent<TProps, TState>
  implements IField<TProps, TState> {

  /**/
  protected readonly inputRef = React.createRef<InputElementT | IMaskedInputCtor>();
  /**/
  protected caretBlinkingTask: DelayedTask; // Used with a synthetic keyboard together
  protected keyboardListenerUnsubscriber: () => void;
  /**/
  private readonly keyboardRef = React.createRef<HTMLElement>();

  /**
   * @stable [21.06.2020]
   * @param {TProps} props
   */
  constructor(props: TProps) {
    super(props);

    this.state = {} as TState;

    this.closeVirtualKeyboard = this.closeVirtualKeyboard.bind(this);
    this.onChangeManually = this.onChangeManually.bind(this);
    this.onClick = this.onClick.bind(this);
    this.onCloseVirtualKeyboard = this.onCloseVirtualKeyboard.bind(this);
    this.onDocumentClickHandler = this.onDocumentClickHandler.bind(this);
    this.onFocus = this.onFocus.bind(this);
    this.onKeyboardChange = this.onKeyboardChange.bind(this);
  }

  /**
   * @stable [21.06.2020]
   * @returns {JSX.Element}
   */
  public render(): JSX.Element {
    const {
      message,
    } = this.originalProps;

    return (
      <div
        className={this.getFieldClassName()}
        onClick={this.domAccessor.cancelEvent}
      >
        {this.originalChildren}
        {this.displayValueElement}
        {this.selfElement}
        {ConditionUtils.ifNotNilThanValue(message, () => this.messageElement(message))}
        {ConditionUtils.orNull(
          this.isErrorMessageRendered,
          () => this.messageElement(this.error, FieldClassesEnum.FIELD_ERROR_MESSAGE)
        )}
        {this.attachmentElement}
        {ConditionUtils.orNull(
          this.isKeyboardUsed && this.isKeyboardOpen(),
          () => this.keyboardElement
        )}
      </div>
    );
  }

  /**
   * @stable [21.06.2020]
   */
  public componentDidMount(): void {
    super.componentDidMount();

    // Need to invoke a user validator if it exists (After F5, etc...)
    this.validateValueAndSetCustomValidity(this.value);

    const {
      autoFocus,
    } = this.originalProps;

    if (autoFocus) {
      this.setFocus();
    }
  }

  /**
   * @stable [21.06.2020]
   */
  public componentWillUnmount(): void {
    super.componentWillUnmount();
    this.onCloseVirtualKeyboard();
  }

  /**
   * @stable [21.06.2020]
   * @param {TProps} prevProps
   * @param {TState} prevState
   */
  public componentDidUpdate(prevProps: TProps, prevState: TState): void {
    const {
      useKeyboard,
      value,
    } = prevProps;

    if (this.isKeyboardUsed) {
      if (this.isKeyboardOpen()
        && ObjectUtils.isCurrentValueNotEqualPreviousValue(this.originalProps.value, value)) {
        this.refreshCaretPosition();
      }
    } else if (useKeyboard) { // Previous props
      this.closeVirtualKeyboard();
    }

    super.componentDidUpdate(prevProps, prevState);
  }

  /**
   * @stable [21.06.2020]
   * @param {ChangeEventT} event
   */
  public onChange(event: ChangeEventT): void {
    this.onChangeValue(this.getRawValueFromEvent(event));
  }

  /**
   * @stable [21.06.2020]
   * @param {TValue} currentRawValue
   */
  public onChangeManually<TValue = AnyT>(currentRawValue: TValue): void {
    if (!this.areManualChangesNotPrevented) {
      return;
    }
    ConditionUtils.ifNotNilThanValue(
      this.input,
      (input) => {
        // We should update the field manually before calls the HTML5 validation
        input.value = String(currentRawValue);
      }
    );
    this.onChangeValue(currentRawValue);
  }

  /**
   * @stable [21.06.2020]
   */
  public setFocus(): void {
    ConditionUtils.ifNotNilThanValue(
      this.input,
      (input) => {
        if (!this.isFocusPrevented) {
          input.focus();
        }
      }
    );
  }

  /**
   * @stable [21.06.2020]
   */
  public clearValue(): void {
    this.setFocus();

    if (this.isValuePresent) {
      this.onChangeManually(this.emptyValue);
    }
    ConditionUtils.ifNotNilThanValue(this.originalProps.onClear, (onClear) => onClear());
  }

  /**
   * @stable [21.06.2020]
   * @param {ChangeEventT} event
   * @returns {AnyT}
   */
  public getRawValueFromEvent(event: ChangeEventT): AnyT {
    return event.target.value;
  }

  /**
   * @stable [17.06.2020]
   * @returns {AnyT}
   */
  public get value(): AnyT {
    const {
      value,
    } = this.originalProps;
    return this.isValueDefined(value) ? value : this.defaultValue;
  }

  /**
   * @stable [03.06.2020]
   * @returns {InputElementT}
   */
  public get input(): InputElementT {
    return ConditionUtils.ifNotNilThanValue(
      this.inputRef.current,
      (input) => (input as IMaskedInputCtor).inputElement || input as InputElementT
    );
  }

  /**
   * @stable [05.06.2020]
   */
  protected removeFocus(): void {
    if (this.hasInput) {
      this.input.blur();
    }
  }

  protected get displayValueElement(): React.ReactNode {
    return null; // TODO
  }

  private get keyboardElement(): JSX.Element {
    return (
      <Keyboard
        forwardedRef={this.keyboardRef}
        field={this}
        onClose={this.closeVirtualKeyboard}
        onChange={this.onKeyboardChange}
        {...this.getKeyboardProps()}/>
    );
  }

  /**
   * @stable [21.06.2020]
   * @param {IFocusEvent} event
   */
  protected onFocus(event: IFocusEvent): void {
    if (this.isFocusPrevented || this.isKeyboardUsed) {
      this.removeFocus(); // Prevent native keyboard opening during use of a synthetic keyboard

      if (this.isKeyboardUsed) {
        this.openVirtualKeyboard();
      }
    } else {
      this.setState(
        {focused: true},
        () => ConditionUtils.ifNotNilThanValue(this.originalProps.onFocus, (onFocus) => onFocus(event))
      );
    }
  }

  protected openVirtualKeyboard(): void {
    if (this.isKeyboardOpen()) {
      return;
    }
    this.setState({keyboardOpen: true}, () => {
      if (!this.isInlineKeyboard) {
        this.keyboardListenerUnsubscriber = this.domAccessor.captureEvent({
          element: this.environment.document,
          callback: this.onDocumentClickHandler,
          capture: true,
          eventName: this.environment.touchedPlatform ? TouchEventsEnum.TOUCH_START : EventsEnum.MOUSE_DOWN,
        });
      }

      if (isDef(this.caretBlinkingTask)) {
        this.caretBlinkingTask.start();

        // Need to refresh a caret position right after keyboard opening
        this.refreshCaretPosition();
      }
    });
  }

  protected refreshCaretPosition(): void {
    // TODO
  }

  /**
   * @stable [17.06.2020]
   * @param {IBaseEvent} event
   */
  protected onClick(event: IBaseEvent): void {
    this.domAccessor.cancelEvent(event);

    ConditionUtils.ifNotNilThanValue(this.originalProps.onClick, (onClick) => onClick(event));
  }

  /**
   * @stable [03.06.2020]
   * @param {AnyT} currentRawValue
   */
  protected onChangeValue(currentRawValue: AnyT): void {
    const originalProps = this.originalProps;
    const {
      name,
      onChange,
      onFormChange,
    } = this.originalProps;

    const actualFieldValue = FieldUtils.asActualFieldValue({
      ...originalProps as {},
      emptyValue: this.emptyValue,
      value: currentRawValue,
    });

    this.validateField(actualFieldValue);

    ConditionUtils.ifNotNilThanValue(onChange, () => onChange(actualFieldValue));
    ConditionUtils.ifNotNilThanValue(onFormChange, () => onFormChange(name, actualFieldValue));
  }

  /**
   * @stable [18.05.2020]
   * @param {AnyT} value
   * @param {boolean} forceApplyValue
   * @returns {AnyT}
   */
  protected getDecoratedDisplayValue(value: AnyT, forceApplyValue = false): AnyT {
    const {displayValue} = this.originalProps;

    return R.isNil(displayValue)
      ? this.decorateDisplayValue(value)
      : (
        TypeUtils.isFn(displayValue)
          ? CalcUtils.calc(displayValue, this.decorateDisplayValue(value))
          : this.decorateDisplayValue(forceApplyValue ? value : displayValue)
      );
  }

  /**
   * @stable [17.06.2020]
   * @returns {AnyT}
   */
  protected get decoratedDisplayValue(): AnyT {
    return this.getDecoratedDisplayValue(this.value);
  }

  /**
   * @stable [18.05.2020]
   * @param {AnyT} value
   * @returns {AnyT}
   */
  protected decorateDisplayValue(value: AnyT): AnyT {
    return value;
  }

  /**
   * @stable [18.05.2020]
   * @returns {FieldComposedInputAttributesT}
   */
  protected getInputElementProps(): FieldComposedInputAttributesT {
    return {}; // TODO
  }

  /**
   * @stable [19.06.2020]
   * @returns {JSX.Element}
   */
  protected get selfElement(): JSX.Element {
    const {
      style,
    } = this.originalProps;

    if (this.isFieldRendered) {
      return (
        <div
          ref={this.actualRef}
          style={style}
          title={this.title}
          className={FieldClassesEnum.FIELD_SELF}
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

  /**
   * @stable [22.01.2020]
   * @returns {JSX.Element}
   */
  protected get actionsElement(): JSX.Element {
    return null;
  }

  /**
   * @stable [18.05.2020]
   * @returns {JSX.Element}
   */
  protected get inputWrapperElement(): JSX.Element {
    if (this.isFieldRendered) {
      return (
        <div className={FieldClassesEnum.FIELD_INPUT_WRAPPER}>
          {this.getInputElement()}
          {this.mirrorInputElement}
          {this.inputCaretElement}
          {this.inputAttachmentElement}
        </div>
      );
    }
    return this.inputAttachmentElement;
  }

  /**
   * @stable [18.05.2020]
   * @returns {JSX.Element}
   */
  protected getInputElement(): JSX.Element {
    return <input {...this.getInputElementProps() as IFieldInputAttributes}/>;
  }

  /**
   * @stable [21.06.2020]
   * @returns {string}
   */
  protected getFieldClassName(): string {
    const originalProps = this.originalProps;
    const {
      className,
      label,
    } = originalProps;

    return ClsUtils.joinClassName(
      FieldClassesEnum.FIELD,
      label && FieldClassesEnum.FIELD_LABELED,
      this.isBusy && FieldClassesEnum.FIELD_BUSY,
      this.isChangeable ? FieldClassesEnum.FIELD_CHANGEABLE : FieldClassesEnum.FIELD_NOT_CHANGEABLE,
      this.isDisabled && FieldClassesEnum.FIELD_DISABLED,
      this.isInvalid && FieldClassesEnum.FIELD_INVALID,
      this.isRequired && FieldClassesEnum.FIELD_REQUIRED,
      this.isValuePresent ? FieldClassesEnum.FIELD_VALUE_PRESENT : FieldClassesEnum.FIELD_VALUE_NOT_PRESENT,
      CalcUtils.calc<string>(className)
    );
  }

  /**
   * @stable [21.06.2020]
   * @returns {string}
   */
  protected getLabel(): string {
    return this.originalProps.label;
  }

  /**
   * @stable [21.06.2020]
   * @returns {IKeyboardProps}
   */
  protected getKeyboardProps(): IKeyboardProps {
    return this.mergedProps.keyboardConfiguration || {};
  }

  /**
   * @stable [21.06.2020]
   * @returns {TProps}
   */
  protected getSettingsProps(): TProps {
    return this.componentsSettings.field as TProps;
  }

  /**
   * @stable [18.05.2020]
   * @returns {JSX.Element}
   */
  protected get inputAttachmentElement(): JSX.Element {
    return null;
  }

  /**
   * @stable [16.06.2020]
   * @returns {JSX.Element}
   */
  protected get attachmentElement(): JSX.Element {
    return null;
  }

  /**
   * @stable [18.05.2020]
   * @returns {JSX.Element}
   */
  protected get mirrorInputElement(): JSX.Element {
    return null;
  }

  /**
   * @stable [18.05.2020]
   * @returns {JSX.Element}
   */
  protected get inputCaretElement(): JSX.Element {
    return null;
  }

  /**
   * @stable [19.05.2020]
   * @returns {JSX.Element}
   */
  protected get progressInfoElement(): JSX.Element {
    return ConditionUtils.orNull(this.isBusy, () => <Info progress={true}/>);
  }

  /**
   * @stable [19.06.2020]
   * @returns {AnyT}
   */
  protected get emptyValue(): AnyT {
    const {
      emptyValue,
    } = this.originalProps;

    return TypeUtils.isDef(emptyValue) ? emptyValue : this.originalEmptyValue;
  }

  /**
   * @stable [19.06.2020]
   * @returns {AnyT}
   */
  protected get originalEmptyValue(): AnyT {
    return FieldConstants.DISPLAY_EMPTY_VALUE;
  }

  /**
   * @stable [19.06.2020]
   * @returns {AnyT}
   */
  protected get defaultValue(): AnyT {
    return this.originalProps.defaultValue;
  }

  /**
   * @stable [19.06.2020]
   * @returns {AnyT}
   */
  protected get displayValue(): AnyT {
    return !this.isValuePresent || (this.isFocusPrevented && this.isBusy)
      ? FieldConstants.DISPLAY_EMPTY_VALUE
      : this.decoratedDisplayValue;
  }

  /**
   * @stable [20.06.2020]
   * @returns {boolean}
   */
  protected isKeyboardOpen(): boolean {
    return this.state.keyboardOpen || this.isInlineKeyboard;
  }

  /**
   * @stable [19.06.2020]
   * @param {AnyT} value
   * @returns {boolean}
   */
  protected isValueObject(value: AnyT): boolean {
    return TypeUtils.isObject(value);
  }

  /**
   * @stable [20.06.2020]
   * @returns {boolean}
   */
  protected get isValuePresent(): boolean {
    return ValueUtils.isValuePresent(this.value, this.emptyValue);
  }

  /**
   * @stable [20.06.2020]
   * @returns {boolean | undefined}
   */
  protected get isKeyboardUsed() {
    return this.originalProps.useKeyboard;
  }

  /**
   * @stable [20.06.2020]
   * @returns {boolean}
   */
  protected get isRequired(): boolean {
    return this.originalProps.required;
  }

  /**
   * @stable [20.06.2020]
   * @returns {boolean}
   */
  protected get isDisabled(): boolean {
    return this.originalProps.disabled;
  }

  /**
   * @stable [20.06.2020]
   * @returns {boolean}
   */
  protected get isValueNotPresent(): boolean {
    return !this.isValuePresent;
  }

  /**
   * @stable [03.06.2020]
   * @param {AnyT} value
   * @returns {boolean}
   */
  protected isValueDefined(value: AnyT): boolean {
    return TypeUtils.isDef(value);
  }

  /**
   * @stable [03.06.2020]
   * @returns {boolean}
   */
  protected get isInputValid(): boolean {
    return !this.hasInput || this.input.validity.valid;
  }

  /**
   * @stable [03.06.2020]
   * @returns {boolean}
   */
  protected get isFocusPrevented() {
    return WrapperUtils.isFocusPrevented(this.originalProps);
  }

  /**
   * @stable [05.06.2020]
   * @returns {boolean}
   */
  protected get isBusy(): boolean {
    return WrapperUtils.inProgress(this.originalProps);
  }

  /**
   * @stable [03.06.2020]
   * @returns {boolean}
   */
  protected get isFieldRendered(): boolean {
    return WrapperUtils.isFieldRendered(this.originalProps);
  }

  /**
   * @stable [18.06.2020]
   * @returns {boolean}
   */
  protected get isReadOnly(): boolean {
    return WrapperUtils.isReadOnly(this.originalProps);
  }

  /**
   * @stable [03.06.2020]
   * @returns {boolean}
   */
  protected get hasInput(): boolean {
    return !R.isNil(this.inputRef.current);
  }

  /**
   * @stable [03.06.2020]
   * @returns {TProps}
   */
  protected get settingsProps(): TProps {
    return this.getSettingsProps();
  }

  /**
   * @stable [21.06.2020]
   * @param {AnyT} rawValue
   */
  private validateField(rawValue: AnyT): void {
    this.setState({error: this.validateValueAndSetCustomValidity(rawValue)});
  }

  /**
   * @stable [21.06.2020]
   * @param {AnyT} value
   * @returns {string}
   */
  private validateValueAndSetCustomValidity(value: AnyT): string {
    if (this.hasInput) {
      this.input.setCustomValidity('');
    }
    if (this.isInputValid) {
      return null;
    }
    return this.inputValidationMessage;
  }

  /**
   * @stable [21.06.2020]
   */
  private closeVirtualKeyboard(): void {
    this.setState({keyboardOpen: false}, this.onCloseVirtualKeyboard);
  }

  /**
   * @stable [21.06.2020]
   * @param {IBaseEvent} event
   */
  private onDocumentClickHandler(event: IBaseEvent): void {
    const keyboardEl = this.keyboardRef.current;
    if (!keyboardEl) {
      return;
    }
    const element = event.target as HTMLElement;

    if (this.domAccessor.getParentsAsElements({parentClassName: KeyboardClassNamesEnum.KEYBOARD, element})
        .includes(keyboardEl)) {
      return;
    }
    this.closeVirtualKeyboard();
  }

  /**
   * @stable [21.06.2020]
   */
  private onCloseVirtualKeyboard(): void {
    ConditionUtils.ifNotNilThanValue(this.caretBlinkingTask, (caretBlinkingTask) => caretBlinkingTask.stop());

    ConditionUtils.ifNotNilThanValue(
      this.keyboardListenerUnsubscriber,
      () => {
        this.keyboardListenerUnsubscriber();
        this.keyboardListenerUnsubscriber = null;
      }
    );
  }

  /**
   * @stable [21.06.2020]
   * @param {string} rawValue
   */
  private onKeyboardChange(rawValue: string): void {
    // Synthetic event creation to reduce source code
    const syntheticEvent = {target: {value: rawValue}} as IChangeEvent;

    // To handle the various field types, NumberField, etc..
    this.onChangeManually(this.getRawValueFromEvent(syntheticEvent));
  }

  /**
   * @stable [21.06.2020]
   * @param {string} message
   * @param {string} className
   * @returns {JSX.Element}
   */
  private messageElement(message: string, className?: string): JSX.Element {
    return (
      <div
        title={message}
        className={ClsUtils.joinClassName(FieldClassesEnum.FIELD_MESSAGE, className)}
      >
        {message ? this.t(message) : UniCodesEnum.NO_BREAK_SPACE}
      </div>
    );
  }

  /**
   * @stable [21.06.2020]
   * @returns {JSX.Element}
   */
  private get labelElement(): JSX.Element {
    return ConditionUtils.ifNotNilThanValue(
      this.getLabel(),
      (label) => (
        <label
          className={FieldClassesEnum.FIELD_LABEL}
        >
          {this.t(label)}
        </label>
      )
    );
  }

  /**
   * @stable [21.06.2020]
   * @returns {JSX.Element}
   */
  private get prefixLabelElement(): JSX.Element {
    const {
      prefixLabel,
    } = this.originalProps;

    return (
      ConditionUtils.ifNotNilThanValue(
        prefixLabel,
        () => (
          <span
            className={FieldClassesEnum.FIELD_PREFIX_LABEL}
          >
            {prefixLabel}
          </span>
        )
      )
    );
  }

  /**
   * @stable [21.06.2020]
   * @returns {string}
   */
  private get title(): string {
    const {
      title,
    } = this.originalProps;

    return title || ConditionUtils.orNull(this.isFocusPrevented, () => this.displayValue);
  }

  /**
   * @stable [21.06.2020]
   * @returns {boolean}
   */
  private get isErrorMessageRendered(): boolean {
    return WrapperUtils.isErrorMessageRendered(this.mergedProps);
  }

  /**
   * @stable [21.06.2020]
   * @returns {boolean}
   */
  private get areManualChangesNotPrevented(): boolean {
    return WrapperUtils.areManualChangesNotPrevented(this.originalProps);
  }

  /**
   * @stable [21.06.2020]
   * @returns {boolean}
   */
  private get isChangeable(): boolean {
    return WrapperUtils.isChangeable(this.originalProps);
  }

  /**
   * @stable [21.06.2020]
   * @returns {boolean}
   */
  private get isInvalid(): boolean {
    return !WrapperUtils.isValid(this.originalProps) || !R.isNil(this.error);
  }

  /**
   * @stable [21.06.2020]
   * @returns {boolean}
   */
  private get isInlineKeyboard(): boolean {
    return WrapperUtils.isInline(this.getKeyboardProps());
  }

  /**
   * @stable [21.06.2020]
   * @returns {string}
   */
  private get inputValidationMessage(): string {
    return this.input.validationMessage;
  }

  /**
   * @stable [21.06.2020]
   * @returns {string}
   */
  private get error(): string {
    return this.state.error;
  }
}
