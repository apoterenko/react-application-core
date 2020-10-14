import * as React from 'react';
import * as R from 'ramda';
import * as Printf from 'sprintf-js';

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
  IFieldInputProps,
  IFieldProps,
  IFieldState,
  IFocusEvent,
  IGenericFieldEntity,
  IKeyboardEvent,
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
  FilterUtils,
  TypeUtils,
  ValueUtils,
  WrapperUtils,
} from '../../../util';
import { Info } from '../../info/info.component';
import { EnhancedGenericComponent } from '../../base/enhanced-generic.component';
import { Keyboard } from '../../keyboard/keyboard.component';

export class Field<TProps extends IFieldProps, TState extends IFieldState>
  extends EnhancedGenericComponent<TProps, TState>
  implements IField<TProps, TState> {

  public static readonly defaultProps: IFieldProps = {
    fieldRendered: true,
    plainValue: true,
    useCursor: true,
    full: true,
    useKeyboardOnMobilePlatformOnly: false,
  };

  /**/
  protected readonly inputRef = React.createRef<InputElementT | IMaskedInputCtor>();
  /**/
  protected caretBlinkingTask: DelayedTask; // Used with a synthetic keyboard together
  protected keyboardListenerUnsubscriber: () => void;
  /**/
  protected readonly inputMirrorRef = React.createRef<HTMLElement>(); // TODO -> private
  private readonly keyboardRef = React.createRef<HTMLElement>();

  /**
   * @stable [14.10.2020]
   * @param originalProps
   */
  constructor(originalProps: TProps) {
    super(originalProps);

    this.state = {} as TState;

    this.closeVirtualKeyboard = this.closeVirtualKeyboard.bind(this);
    this.onBlur = this.onBlur.bind(this);
    this.onChange = this.onChange.bind(this);
    this.onChangeManually = this.onChangeManually.bind(this);
    this.onClick = this.onClick.bind(this);
    this.onCloseVirtualKeyboard = this.onCloseVirtualKeyboard.bind(this);
    this.onDocumentClickHandler = this.onDocumentClickHandler.bind(this);
    this.onFocus = this.onFocus.bind(this);
    this.onKeyboardChange = this.onKeyboardChange.bind(this);
    this.onKeyDown = this.onKeyDown.bind(this);
    this.onKeyUp = this.onKeyUp.bind(this);

    if (this.isKeyboardAndCursorUsed) {
      const {
        caretBlinkingFrequency,
      } = this.mergedProps;

      this.caretBlinkingTask = new DelayedTask(
        this.setCaretVisibility.bind(this),
        caretBlinkingFrequency || 400,
        true
      );
    }
  }

  /**
   * @stable [21.08.2020]
   */
  public render(): JSX.Element {
    return (
      <div
        className={this.getFieldClassName()}
        onClick={this.domAccessor.cancelEvent}
      >
        {this.originalChildren}
        {this.displayValueElement}
        {this.selfElement}
        {ConditionUtils.ifNotNilThanValue(this.originalProps.message, (message) => this.messageElement(message))}
        {ConditionUtils.orNull(
          this.isErrorMessageRendered,
          () => this.messageElement(this.error, FieldClassesEnum.ERROR_MESSAGE)
        )}
        {this.attachmentElement}
        {ConditionUtils.orNull(this.isKeyboardUsed && this.isKeyboardOpen, () => this.keyboardElement)}
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
   * @stable [13.10.2020]
   * @param prevProps
   * @param prevState
   */
  public componentDidUpdate(prevProps: TProps, prevState: TState): void {
    if (this.isKeyboardUsed) {
      if (this.isKeyboardOpen && !R.equals(this.originalProps.value, prevProps.value)) {
        this.refreshCaretPosition();
      }
    } else if (prevProps.useKeyboard) {
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
   * @stable [14.10.2020]
   * @param currentRawValue
   */
  public onChangeManually<TValue = unknown>(currentRawValue: TValue): void {
    if (this.areManualChangesPrevented) {
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
   * @stable [14.10.2020]
   * @param event
   */
  public getRawValueFromEvent(event: ChangeEventT): AnyT {
    return event.target.value;
  }

  /**
   * @stable [14.10.2020]
   */
  public get value(): AnyT {
    const {
      value,
    } = this.originalProps;

    return this.isValueDefined(value) ? value : this.defaultValue;
  }

  /**
   * @stable [14.10.2020]
   * @param event
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

    ConditionUtils.ifNotNilThanValue(this.originalProps.onKeyDown, (onKeyDown) => onKeyDown(event));
  }

  /**
   * @stable [14.10.2020]
   * @param event
   */
  public onKeyEnter(event: IBaseEvent): void {
    ConditionUtils.ifNotNilThanValue(this.originalProps.onKeyEnter, (onKeyEnter) => onKeyEnter(event));
  }

  /**
   * @stable [14.10.2020]
   * @param event
   * @private
   */
  public onKeyUp(event: IKeyboardEvent): void {
    ConditionUtils.ifNotNilThanValue(this.originalProps.onKeyUp, (onKeyUp) => onKeyUp(event));
  }

  /**
   * @stable [14.10.2020]
   * @param event
   */
  public onKeyBackspace(event: IKeyboardEvent): void {
    ConditionUtils.ifNotNilThanValue(this.originalProps.onKeyBackspace, (onKeyBackspace) => onKeyBackspace(event));
  }

  /**
   * @stable [14.10.2020]
   * @param event
   */
  public onKeyTab(event: IKeyboardEvent): void {
    ConditionUtils.ifNotNilThanValue(this.originalProps.onKeyTab, (onKeyTab) => onKeyTab(event));
  }

  /**
   * @stable [14.10.2020]
   * @param event
   */
  public onKeyEscape(event: IBaseEvent): void {
    ConditionUtils.ifNotNilThanValue(this.originalProps.onKeyEscape, (onKeyEscape) => onKeyEscape(event));
  }

  /**
   * @stable [14.10.2020]
   * @param event
   */
  public onKeyArrowDown(event: IKeyboardEvent): void {
    ConditionUtils.ifNotNilThanValue(this.originalProps.onKeyArrowDown, (onKeyArrowDown) => onKeyArrowDown(event));
  }

  /**
   * @stable [14.10.2020]
   * @param event
   */
  public onKeyArrowUp(event: IKeyboardEvent): void {
    ConditionUtils.ifNotNilThanValue(this.originalProps.onKeyArrowUp, (onKeyArrowUp) => onKeyArrowUp(event));
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

  /**
   * @stable [07.10.2020]
   */
  protected getFieldPattern(): string {
    return this.originalProps.pattern;
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

  /**
   * @stable [14.10.2020]
   * @param event
   * @protected
   */
  protected onBlur(event: IFocusEvent): void {
    this.setState(
      {focused: false},
      () => ConditionUtils.ifNotNilThanValue(this.originalProps.onBlur, (onBlur) => onBlur(event))
    );
  }

  protected openVirtualKeyboard(): void {
    if (this.isKeyboardOpen) {
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

      if (TypeUtils.isDef(this.caretBlinkingTask)) {
        this.caretBlinkingTask.start();

        // Need to refresh a caret position right after keyboard opening
        this.refreshCaretPosition();
      }
    });
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
   * @stable [07.10.2020]
   */
  protected getInputElementProps(): FieldComposedInputAttributesT {
    const $props = this.originalProps;
    const {
      name,
      tabIndex,
      type = 'text',
    } = $props;
    const {
      autoComplete = 'off',
      maxLength,
      minLength,
    } = this.mergedProps;

    const disabled = this.isDisabled;
    const isActive = this.isActive;
    const pattern = this.getFieldPattern();
    const placeholder = ConditionUtils.orUndef($props.placeholder && !this.isBusy, () => this.t($props.placeholder));
    const readOnly = !isActive;
    const ref = this.inputRef as React.RefObject<HTMLInputElement & HTMLTextAreaElement>;
    const required = this.isRequired;
    const value = this.displayValue;

    return FilterUtils.defValuesFilter<FieldComposedInputAttributesT, FieldComposedInputAttributesT>({
      autoComplete,
      className: FieldClassesEnum.INPUT,
      disabled,
      maxLength,
      minLength,
      name,
      pattern,
      placeholder,
      readOnly,
      ref,
      required,
      tabIndex,
      type,
      value,
      ...(
        isActive
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
  }

  /**
   * @stable [14.10.2020]
   * @protected
   */
  protected get actionsElement(): JSX.Element {
    return null;
  }

  /**
   * @stable [14.10.2020]
   * @protected
   */
  protected getInputElement(): JSX.Element {
    return <input {...this.getInputElementProps() as IFieldInputProps}/>;
  }

  /**
   * @stable [14.10.2020]
   * @param usePrintf
   * @param args
   * @protected
   */
  protected buildDisplayMessage(usePrintf: boolean, ...args: AnyT[]): string {
    return usePrintf
      ? Printf.sprintf(this.t(this.originalProps.displayMessage), ...args)
      : FieldConstants.DISPLAY_EMPTY_VALUE;
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
      label && FieldClassesEnum.LABELED,
      this.isBusy && FieldClassesEnum.BUSY,
      this.isChangeable ? FieldClassesEnum.CHANGEABLE : FieldClassesEnum.NOT_CHANGEABLE,
      this.isDisabled && FieldClassesEnum.DISABLED,
      this.isFocused ? FieldClassesEnum.FOCUSED : FieldClassesEnum.NOT_FOCUSED,
      this.isFocusPrevented && FieldClassesEnum.PREVENT_FOCUS,
      this.isInvalid && FieldClassesEnum.INVALID,
      this.isRequired && FieldClassesEnum.REQUIRED,
      this.isValuePresent ? FieldClassesEnum.VALUE_PRESENT : FieldClassesEnum.VALUE_NOT_PRESENT,
      CalcUtils.calc<string>(className)
    );
  }

  /**
   * @stable [21.08.2020]
   */
  protected getLabel(): string {
    return this.originalProps.label;
  }

  /**
   * @stable [21.08.2020]
   */
  protected getFieldMask(): (string | RegExp)[] {
    return this.originalProps.mask;
  }

  /**
   * @stable [21.08.2020]
   */
  protected getKeyboardProps(): IKeyboardProps {
    return this.mergedProps.keyboardConfiguration || {};
  }

  /**
   * @stable [21.08.2020]
   */
  protected getComponentsSettingsProps(): TProps {
    return this.componentsSettings.field as TProps;
  }

  /**
   * @stable [21.08.2020]
   */
  protected get inputAttachmentElement(): JSX.Element {
    return null;
  }

  /**
   * @stable [21.08.2020]
   */
  protected get attachmentElement(): JSX.Element {
    return null;
  }

  /**
   * @stable [21.08.2020]
   */
  protected get mirrorInputElement(): JSX.Element {
    return null;
  }

  /**
   * @stable [13.10.2020]
   * @protected
   */
  protected get isCursorUsed(): boolean {
    return this.originalProps.useCursor;
  }

  /**
   * @stable [07.10.2020]
   */
  protected get isKeyboardAndCursorUsed(): boolean {
    return this.isKeyboardUsed && this.isCursorUsed;
  }

  /**
   * @stable [07.10.2020]
   */
  protected get emptyValue(): AnyT {
    const {
      emptyValue,
    } = this.originalProps;

    return TypeUtils.isDef(emptyValue) ? emptyValue : this.originalEmptyValue;
  }

  /**
   * @stable [07.10.2020]
   */
  protected get originalEmptyValue(): AnyT {
    return FieldConstants.DISPLAY_EMPTY_VALUE;
  }

  /**
   * @stable [07.10.2020]
   */
  protected get defaultValue(): AnyT {
    return this.originalProps.defaultValue;
  }

  /**
   * @stable [07.10.2020]
   */
  protected get displayValue(): AnyT {
    return !this.isValuePresent || (this.isFocusPrevented && this.isBusy)
      ? FieldConstants.DISPLAY_EMPTY_VALUE
      : this.decoratedDisplayValue;
  }

  /**
   * @stable [14.10.2020]
   * @param value
   */
  protected isValueObject(value: AnyT): boolean {
    return TypeUtils.isObject(value);
  }

  /**
   * @stable [14.10.2020]
   */
  protected get isPlainValueApplied(): boolean {
    return this.originalProps.plainValue;
  }

  /**
   * @stable [14.10.2020]
   */
  protected get isValuePresent(): boolean {
    return ValueUtils.isValuePresent(this.value, this.emptyValue);
  }

  /**
   * @stable [07.10.2020]
   */
  protected get isDisabled(): boolean {
    return this.originalProps.disabled;
  }

  /**
   * @stable [07.10.2020]
   */
  protected get isValueNotPresent(): boolean {
    return !this.isValuePresent;
  }

  /**
   * @stable [07.10.2020]
   * @param value
   */
  protected isValueDefined(value: AnyT): boolean {
    return TypeUtils.isDef(value);
  }

  /**
   * @stable [14.10.2020]
   * @protected
   */
  protected get isFocusPrevented() {
    return this.originalProps.preventFocus;
  }

  /**
   * @stable [14.10.2020]
   * @protected
   */
  protected get isBusy(): boolean {
    return this.originalProps.progress;
  }

  /**
   * @stable [21.08.2020]
   */
  protected get isReadOnly(): boolean {
    return WrapperUtils.isReadOnly(this.originalProps);
  }

  /**
   * @stable [14.10.2020]
   * @protected
   */
  protected get isInactive(): boolean {
    return FieldUtils.isInactive(this.originalProps);
  }

  /**
   * @stable [14.10.2020]
   * @protected
   */
  protected get isDisplayValueDefined(): boolean {
    return TypeUtils.isDef(this.originalProps.displayValue);
  }

  /**
   * @stable [14.10.2020]
   * @protected
   */
  protected get componentsSettingsProps(): TProps {
    return this.getComponentsSettingsProps();
  }

  /**
   * @stable [21.06.2020]
   */
  private refreshCaretPosition(): void {
    this.setState(
      {caretPosition: this.caretPosition},
      () => this.input.scrollLeft = this.input.scrollWidth
    );
  }

  /**
   * @stable [21.06.2020]
   */
  private setCaretVisibility(): void {
    this.setState((prevState) => FilterUtils.notNilValuesFilter<IFieldState, IFieldState>({
      caretVisibility: !prevState.caretVisibility,
      caretPosition: ConditionUtils.ifNilThanValue(prevState.caretPosition, () => this.caretPosition),
    }));
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
    return this.input.validationMessage;
  }

  /**
   * @stable [21.06.2020]
   */
  private closeVirtualKeyboard(): void {
    this.setState({keyboardOpen: false}, this.onCloseVirtualKeyboard);
  }

  /**
   * @stable [14.10.2020]
   * @param currentRawValue
   * @private
   */
  private onChangeValue(currentRawValue: unknown): void {
    const originalProps = this.originalProps;
    const {
      name,
      onChange,
      onFormChange,
    } = originalProps;

    const actualFieldValue = FieldUtils.asActualFieldValue({
      ...originalProps as IGenericFieldEntity,
      emptyValue: this.emptyValue,
      value: currentRawValue,
    });

    this.validateField(actualFieldValue);

    ConditionUtils.ifNotNilThanValue(onChange, () => onChange(actualFieldValue));
    ConditionUtils.ifNotNilThanValue(onFormChange, () => onFormChange(name, actualFieldValue));
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
   * @stable [21.08.2020]
   * @param message
   * @param className
   */
  private messageElement(message: string, className?: string): JSX.Element {
    return (
      <div
        title={message}
        className={ClsUtils.joinClassName(FieldClassesEnum.MESSAGE, className)}
      >
        {message ? this.t(message) : UniCodesEnum.NO_BREAK_SPACE}
      </div>
    );
  }

  /**
   * @stable [21.08.2020]
   */
  private get selfElement(): JSX.Element {
    if (this.isFieldRendered) {
      return (
        <div
          ref={this.actualRef}
          style={this.originalProps.style}
          title={this.title}
          className={FieldClassesEnum.SELF}
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
   * @stable [21.08.2020]
   */
  private get labelElement(): JSX.Element {
    return ConditionUtils.ifNotNilThanValue(
      this.getLabel(),
      (label) => (
        <label className={FieldClassesEnum.LABEL}>
          {this.t(label)}
        </label>
      )
    );
  }

  /**
   * @stable [14.10.2020]
   */
  private get prefixLabelElement(): JSX.Element {
    return (
      ConditionUtils.ifNotNilThanValue(
        this.originalProps.prefixLabel,
        (prefixLabel) => (
          <span className={FieldClassesEnum.PREFIX_LABEL}>
            {prefixLabel}
          </span>
        )
      )
    );
  }

  /**
   * @stable [21.06.2020]
   * @returns {JSX.Element}
   */
  private get inputCaretElement(): JSX.Element {
    const {
      caretPosition,
      caretVisibility,
    } = this.state;

    return ConditionUtils.ifNotNilThanValue(
      caretPosition,
      () => ConditionUtils.orNull(
        this.isCursorUsed && this.isKeyboardOpen && caretVisibility,
        () => {
          const textOffset = 2;
          const paddingLeft = parseFloat(this.domAccessor.getProperty(this.input, 'paddingLeft'));
          const left = caretPosition + paddingLeft - textOffset;

          return (
            <div
              className={FieldClassesEnum.INPUT_CARET}
              style={{left}}
            >
              |
            </div>
          );
        }
      )
    );
  }

  /**
   * @stable [14.10.2020]
   */
  private get displayValueElement(): React.ReactNode {
    if (!this.originalProps.displayValueRenderedOnly) {
      return null;
    }
    const result = this.decoratedDisplayValue;

    return R.isNil(result)
      ? (this.isBusy ? this.settings.messages.PLEASE_WAIT : result)
      : result;
  }

  /**
   * @stable [21.08.2020]
   */
  private get progressInfoElement(): JSX.Element {
    return ConditionUtils.orNull(this.isBusy, () => <Info progress={true}/>);
  }

  /**
   * @stable [14.10.2020]
   */
  private get inputWrapperElement(): JSX.Element {
    if (this.isFieldRendered) {
      return (
        <div
          className={FieldClassesEnum.INPUT_WRAPPER}
        >
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
   * @stable [21.08.2020]
   */
  private get title(): string {
    const {
      title,
    } = this.originalProps;

    return title || ConditionUtils.orNull(this.isFocusPrevented, () => this.displayValue);
  }

  /**
   * @stable [14.10.2020]
   * @private
   */
  private get caretPosition(): number {
    const da = this.domAccessor;

    return this.isValuePresent
      ? Math.min(da.getWidth(this.inputMirrorRef.current), da.getWidth(this.input))
      : 0;
  }

  /**
   * @stable [21.08.2020]
   */
  private get isErrorMessageRendered(): boolean {
    return WrapperUtils.isErrorMessageRendered(this.mergedProps);
  }

  /**
   * @stable [21.06.2020]
   * @returns {boolean}
   */
  private get isInvalid(): boolean {
    return !WrapperUtils.isValid(this.originalProps) || !R.isNil(this.error);
  }

  /**
   * @stable [14.10.2020]
   */
  private get isFocused(): boolean {
    return this.isKeyboardUsed ? this.isKeyboardOpen : this.state.focused;
  }

  /**
   * @stable [21.08.2020]
   */
  private get isInlineKeyboard(): boolean {
    return this.getKeyboardProps().inline;
  }

  /**
   * @stable [14.10.2020]
   */
  private get hasInput(): boolean {
    return !R.isNil(this.inputRef.current);
  }

  /**
   * @stable [14.10.2020]
   */
  private get isChangeable(): boolean {
    return WrapperUtils.isChangeable(this.originalProps);
  }

  /**
   * @stable [13.10.2020]
   */
  private get isKeyboardOpen(): boolean {
    return this.state.keyboardOpen || this.isInlineKeyboard;
  }

  /**
   * @stable [14.10.2020]
   */
  private get isFieldRendered(): boolean {
    return this.originalProps.fieldRendered;
  }

  /**
   * @stable [14.10.2020]
   */
  private get isRequired(): boolean {
    return this.originalProps.required;
  }

  /**
   * @stable [14.10.2020]
   * @private
   */
  private get isInputValid(): boolean {
    return !this.hasInput || this.input.validity.valid;
  }

  /**
   * @stable [14.10.2020]
   */
  private get isActive(): boolean {
    return !this.isInactive;
  }

  /**
   * @stable [14.10.2020]
   */
  private get isKeyboardUsed() {
    const {
      useKeyboard,
    } = this.originalProps;

    if (this.mergedProps.useKeyboardOnMobilePlatformOnly) {
      if (this.environment.mobilePlatform) {
        return useKeyboard;
      } else {
        return false;
      }
    } else {
      return useKeyboard;
    }
  }

  /**
   * @stable [14.10.2020]
   * @private
   */
  private get areManualChangesPrevented(): boolean {
    return this.originalProps.preventManualChanges;
  }

  /**
   * @stable [14.10.2020]
   */
  private get error(): string {
    return this.state.error;
  }
}
