import * as R from 'ramda';
import * as Printf from 'sprintf-js';
import { LoggerFactory, ILogger } from 'ts-smart-logger';

import { isDef, isFn, isUndef, orDefault, orNull, DelayedTask, defValuesFilter, orUndef } from '../../../util';
import {
  IUniversalField,
  IUniversalFieldDisplayValueConverter,
} from '../../../entities-definitions.interface';
import { IUniversalFieldProps } from '../../../props-definitions.interface';
import { AnyT, IKeyValue, CLEAR_DIRTY_CHANGES_VALUE } from '../../../definitions.interface';
import { FIELD_EMPTY_VALUE, FIELD_EMPTY_ERROR_VALUE, IUniversalFieldState } from './field.interface';
import { UniversalComponent } from '../../base/universal.component';
import { toActualChangedValue } from './field.support';

export abstract class UniversalField<TComponent extends IUniversalField<TProps, TState>,
                                     TProps extends IUniversalFieldProps<TKeyboardEvent,
                                                                         TFocusEvent,
                                                                         TBasicEvent>,
                                     TState extends IUniversalFieldState,
                                     TKeyboardEvent,
                                     TFocusEvent,
                                     TBasicEvent>
  extends UniversalComponent<TComponent, TProps, TState>
  implements IUniversalField<TProps, TState> {

  protected static logger = LoggerFactory.makeLogger(UniversalField);
  private static DEFAULT_CARET_BLINKING_FREQUENCY_TIMEOUT = 200;

  private caretBlinkingTask: DelayedTask; // Used with a synthetic keyboard together

  /**
   * @stable [17.06.2018]
   * @param {TProps} props
   */
  constructor(props: TProps) {
    super(props);

    this.onClick = this.onClick.bind(this);
    this.onChange = this.onChange.bind(this);
    this.onChangeManually = this.onChangeManually.bind(this);
    this.onFocus = this.onFocus.bind(this);
    this.onBlur = this.onBlur.bind(this);
    this.onKeyUp = this.onKeyUp.bind(this);
    this.onKeyDown = this.onKeyDown.bind(this);
    this.closeSyntheticKeyboard = this.closeSyntheticKeyboard.bind(this);

    this.state = {} as TState;

    if (props.useKeyboard) {
      this.caretBlinkingTask = new DelayedTask(
        this.setCaretVisibility.bind(this),
        props.caretBlinkingFrequencyTimeout || UniversalField.DEFAULT_CARET_BLINKING_FREQUENCY_TIMEOUT,
        true
      );
    }
  }

  /**
   * @stable [04.09.2018]
   */
  public componentWillUnmount(): void {
    super.componentWillUnmount();
    this.onCloseKeyboard();
  }

  /**
   * @stable [20.08.2018]
   */
  public componentDidMount(): void {
    super.componentDidMount();

    // Need to invoke a user validator if it exists (After F5, etc...)
    this.validateValueAndSetCustomValidity(this.value);

    if (this.props.autoFocus) {
      this.setFocus();              // The manual "autoFocus" replacing
    }
  }

  /**
   * @stable [04.09.2018]
   * @param {TProps} prevProps
   * @param {TState} prevState
   */
  public componentDidUpdate(prevProps: TProps, prevState: TState): void {
    super.componentDidUpdate(prevProps, prevState);

    if (this.props.useKeyboard
          && this.state.keyboardOpened
          && !R.equals(this.value, prevProps.value)) {
      // Refresh a caret position according to a changed value
      this.refreshCaretPosition();
    }
  }

  /**
   * @stable [17.06.2018]
   */
  public resetError(): void {
    this.validateField(CLEAR_DIRTY_CHANGES_VALUE);
  }

  /**
   * @stable [20.08.2018]
   */
  public clearValue(): void {
    this.setFocus();    // UX

    if (this.isValuePresent()) {
      this.onChangeManually(this.getEmptyValue());
    }

    const props = this.props;
    if (isFn(props.onClear)) {
      props.onClear();
    }
  }

  /**
   * @stable [27.07.2018]
   * @param {AnyT} event
   */
  public onChange(event: AnyT): void {
    this.onChangeValue(this.getRawValueFromEvent(event));
  }

  /**
   * @stable [17.06.2018]
   * @param {AnyT} currentRawValue
   * @param {AnyT} context
   */
  public onChangeManually(currentRawValue: AnyT, context?: AnyT): void {
    this.onChangeValue(currentRawValue);
  }

  /**
   * @stable [17.06.2018]
   * @returns {AnyT}
   */
  public get value(): AnyT {
    return this.props.value;
  }

  /**
   * @stable [18.06.2018]
   * @param {TKeyboardEvent} event
   */
  public onKeyBackspace(event: TKeyboardEvent): void {
    const props = this.props;
    if (isFn(props.onKeyBackspace)) {
      props.onKeyBackspace(event);
    }
  }

  /**
   * @stable [18.06.2018]
   * @param {TKeyboardEvent} event
   */
  public onKeyUp(event: TKeyboardEvent): void {
    const props = this.props;
    if (isFn(props.onKeyUp)) {
      props.onKeyUp(event);
    }
  }

  /**
   * @stable [03.09.2018]
   * @param {TKeyboardEvent} event
   */
  public onKeyDown(event: TKeyboardEvent): void {
    const props = this.props;
    if (isFn(props.onKeyDown)) {
      props.onKeyDown(event);
    }
  }

  /**
   * @stable [18.06.2018]
   * @param {TKeyboardEvent} event
   */
  public onKeyEnter(event: TKeyboardEvent): void {
    const props = this.props;
    if (isFn(props.onKeyEnter)) {
      props.onKeyEnter(event);
    }
  }

  /**
   * @stable [04.09.2018]
   * @param {TKeyboardEvent} event
   */
  public onKeyTab(event: TKeyboardEvent): void {
    const props = this.props;
    if (isFn(props.onKeyTab)) {
      props.onKeyTab(event);
    }
  }

  /**
   * @stable [18.06.2018]
   * @param {TKeyboardEvent} event
   */
  public onKeyEscape(event: TKeyboardEvent): void {
    const props = this.props;
    if (isFn(props.onKeyEscape)) {
      props.onKeyEscape(event);
    }
  }

  /**
   * @stable [18.06.2018]
   * @param {TKeyboardEvent} event
   */
  public onKeyArrowDown(event: TKeyboardEvent): void {
    const props = this.props;
    if (isFn(props.onKeyArrowDown)) {
      props.onKeyArrowDown(event);
    }
  }

  /**
   * @stable [18.06.2018]
   * @param {TKeyboardEvent} event
   */
  public onKeyArrowUp(event: TKeyboardEvent): void {
    const props = this.props;
    if (isFn(props.onKeyArrowUp)) {
      props.onKeyArrowUp(event);
    }
  }

  /**
   * @stable [17.06.2018]
   * @param {AnyT} event
   * @returns {AnyT}
   */
  public abstract getRawValueFromEvent(event: AnyT): AnyT;

  /**
   * @stable [06.06.2018]
   */
  public abstract setFocus(): void;

  /**
   * @stable [18.06.2018]
   * @param {boolean} usePrintf
   * @param {AnyT} args
   * @returns {string}
   */
  public printfDisplayMessage(usePrintf: boolean, ...args: AnyT[]): string {
    return orDefault<string, string>(
      usePrintf,
      () => Printf.sprintf(this.t(this.props.displayMessage), ...args),
      FIELD_EMPTY_VALUE
    );
  }

  /**
   * The state may be an external storage and the value must be able to be serialized.
   *
   * @stable [17.06.2018]
   * @param {AnyT} rawValue
   * @returns {AnyT}
   */
  protected toSerializedValue(rawValue: AnyT): AnyT {
    return rawValue;
  }

  /**
   * @stable [17.06.2018]
   * @param {AnyT} value
   * @returns {boolean}
   */
  protected isValuePresent(value = this.value): boolean {
    return isDef(value) && !R.equals(value, this.getEmptyValue());
  }

  /**
   * @stable [18.06.2018]
   * @returns {boolean}
   */
  protected isFieldFocused(): boolean {
    return this.state.keyboardOpened  // User input typing emulation mode
      || this.hasInputFocus()         // If a native input has focus
      || this.isValuePresent();
  }

  /**
   * @stable [02.08.2018]
   * @returns {boolean}
   */
  protected isFieldRequired(): boolean {
    const props = this.props;
    return isFn(props.required) ? (props.required as (() => boolean))() : props.required as boolean;
  }

  /**
   * @stable [17.06.2018]
   * @returns {AnyT}
   */
  protected getEmptyValue(): AnyT {
    return FIELD_EMPTY_VALUE;
  }

  /**
   * @stable [18.06.2018]
   * @returns {AnyT}
   */
  protected get definiteValue(): AnyT {
    return isUndef(this.value) ? this.getEmptyValue() : this.value;
  }

  /**
   * @stable [31.07.2018]
   * @param {AnyT} value
   * @returns {string}
   */
  protected validateValueAndSetCustomValidity(value: AnyT): string {
    const props = this.props;
    let error = FIELD_EMPTY_ERROR_VALUE;

    this.setNativeInputValidity('');

    if (this.isInputValid()) {
      error = isFn(props.validate) ? props.validate(value) : error;
      if (R.isNil(error)) {
        error = this.validateValue(value); // The custom internal validator
      }

      if (!R.isNil(error)) {
        this.setNativeInputValidity(error);
      }
    } else {
      error = this.getNativeInputValidationMessage();
    }
    return error;
  }

  /**
   * @stable [31.07.2018]
   * @param {AnyT} value
   * @returns {string}
   */
  protected validateValue(value: AnyT): string {
    return FIELD_EMPTY_ERROR_VALUE;
  }

  /**
   * @stable [03.09.2018]
   * @returns {boolean}
   */
  protected isInputValid(): boolean {
    return true;
  }

  /**
   * @stable [31.07.2018]
   * @returns {string}
   */
  protected getNativeInputValidationMessage(): string {
    return FIELD_EMPTY_ERROR_VALUE;
  }

  /**
   * @stable [31.07.2018]
   * @param {string} error
   */
  protected setNativeInputValidity(error: string): void {
    // Do nothing
  }

  /**
   * @stable [17.06.2018]
   * @returns {Array<string | RegExp>}
   */
  protected getFieldMask(): Array<string | RegExp> {
    return this.props.mask;
  }

  /**
   * @stable [17.06.2018]
   * @returns {string}
   */
  protected getFieldPattern(): string {
    return this.props.pattern;
  }

  /**
   * @stable [18.06.2018]
   * @returns {AnyT}
   */
  protected get displayValue(): AnyT {
    return this.toDisplayValue(this.value);
  }

  /**
   * @stable [18.06.2018]
   * @param {AnyT} value
   * @param {AnyT} context
   * @returns {AnyT}
   */
  protected toDisplayValue(value: AnyT, context?: AnyT): AnyT {
    const props = this.props;
    const displayValue = props.displayValue;

    return this.inProgress()
      ? FIELD_EMPTY_VALUE // The dictionaries data is cleaned before request
      : (
        this.isValuePresent(value)
          ? (isUndef(displayValue)
              ? value
              : (isFn(displayValue)
                  ? (displayValue as IUniversalFieldDisplayValueConverter)(value, this)
                  : displayValue))
          : FIELD_EMPTY_VALUE
      );
  }

  /**
   * @stable [03.09.2018]
   * @returns {boolean}
   */
  protected isInactive(): boolean {
    const props = this.props;
    return props.disabled || props.readOnly || this.inProgress();
  }

  /**
   * @stable [18.06.2018]
   * @returns {boolean}
   */
  protected inProgress(): boolean {
    const props = this.props;
    return props.progress === true;
  }

  /**
   * @stable [04.09.2018]
   * @param {TFocusEvent} event
   */
  protected onFocus(event: TFocusEvent): void {
    const props = this.props;

    if (props.preventFocus || props.useKeyboard) {
      this.removeFocus();             // Prevent native keyboard opening when using a synthetic keyboard
      this.openSyntheticKeyboard();   // "useKeyboard" props checking inside
    }
    if (isFn(props.onFocus)) {
      props.onFocus(event);
    }
  }

  /**
   * @stable [18.06.2018]
   * @param {TFocusEvent} event
   */
  protected onBlur(event: TFocusEvent): void {
    const props = this.props;
    if (isFn(props.onBlur)) {
      props.onBlur(event);
    }
  }

  /**
   * @stable [18.06.2018]
   * @param {TBasicEvent} event
   */
  protected onClick(event: TBasicEvent): void {
    const props = this.props;
    if (isFn(props.onClick)) {
      props.onClick(event);
    }
  }

  /**
   * @stable [03.09.2018]
   * @returns {JSX.Element}
   */
  protected getInputAttachmentElement(): JSX.Element {
    return null;
  }

  /**
   * @stable [03.09.2018]
   * @returns {JSX.Element}
   */
  protected toKeyboardElement(): JSX.Element {
    return null;
  }

  /**
   * @stable [04.09.2018]
   */
  protected openSyntheticKeyboard(): boolean {
    if (this.state.keyboardOpened) {
      return false;
    }
    this.setState({keyboardOpened: true}, () => this.caretBlinkingTask.start());

    UniversalField.logger.debug(
      `[$UniversalField][openSyntheticKeyboard] A keyboard for the field "${this.props.name}" will be opened soon.`
    );
    return true;
  }

  /**
   * @stable [04.09.2018]
   */
  protected closeSyntheticKeyboard(): void {
    if (!this.props.useKeyboard) {
      return;
    }
    this.setState({keyboardOpened: false});
    this.onCloseKeyboard();
  }

  /**
   * @stable [04.09.2018]
   */
  protected onCloseKeyboard(): boolean {
    if (this.props.useKeyboard) {
      this.caretBlinkingTask.stop();

      UniversalField.logger.debug(
        `[$UniversalField][onCloseKeyboard] A keyboard for the field "${this.props.name}" has been closed.`
      );
      return true;
    }
    return false;
  }

  /**
   * @stable [03.09.2018]
   * @returns {JSX.Element}
   */
  protected getKeyboardElement(): JSX.Element {
    return (
      orNull<JSX.Element>(
        this.props.useKeyboard && this.state.keyboardOpened,
        () => this.toKeyboardElement(),
      )
    );
  }

  /**
   * @stable [03.09.2018]
   * @returns {JSX.Element}
   */
  protected getErrorMessageElement(): JSX.Element {
    return orNull<JSX.Element>(
      !this.props.notUseErrorMessage,
      () => this.toMessageElement(this.error, this.uiFactory.fieldValidationText)
    );
  }

  /**
   * @stable [03.09.2018]
   * @returns {JSX.Element}
   */
  protected getMessageElement(): JSX.Element {
    const props = this.props;
    const message = props.message;
    return orNull<JSX.Element>(message, () => this.toMessageElement(message));
  }

  /**
   * @stable [03.09.2018]
   * @returns {string}
   */
  protected get error(): string {
    return this.state.error;
  }

  /**
   * @stable [04.09.2018]
   */
  protected refreshCaretPosition(): void {
    this.setState({caretPosition: this.getCaretPosition()});

    UniversalField.logger.debug(
      `[$UniversalField][refreshCaretPosition] A caret position for the field ${this.props.name} had been refreshed.".`
    );
  }

  /**
   * @stable [04.09.2018]
   * @returns {number}
   */
  protected getCaretPosition(): number {
    // Need to implement
    return 0;
  }

  /**
   * @stable [18.06.2018]
   * @returns {boolean}
   */
  protected abstract hasInputFocus(): boolean;

  /**
   * @stable [03.09.2018]
   */
  protected abstract removeFocus(): void;

  /**
   * @stable [03.09.2018]
   * @param {string} message
   * @param {string | IKeyValue} styles
   * @returns {JSX.Element}
   */
  protected abstract toMessageElement(message: string, styles?: string | IKeyValue): JSX.Element;

  /**
   * @stable [31.07.2018]
   * @param {AnyT} currentRawValue
   */
  private onChangeValue(currentRawValue: AnyT): void {
    const props = this.props;
    const actualChangedValue = toActualChangedValue({
      value: currentRawValue,
      emptyValue: this.getEmptyValue(),
      originalValue: props.originalValue,
      canReturnClearDirtyChangesValue: props.canReturnClearDirtyChangesValue,
    });

    this.validateField(actualChangedValue);
    this.propsOnChange(actualChangedValue);
    this.propsChangeForm(actualChangedValue);      // Notify the form about changes
  }

  /**
   * @stable [31.07.2018]
   * @param {AnyT} rawValue
   */
  private validateField(rawValue: AnyT): void {
    // State value cannot take an undefined value then we should pass a null value at least
    this.setState({error: this.validateValueAndSetCustomValidity(rawValue)});
  }

  /**
   * @stable [17.06.2018]
   * @param {AnyT} rawValue
   */
  private propsChangeForm(rawValue: AnyT): void {
    const props = this.props;
    if (!isFn(props.changeForm)) {
      return;
    }
    props.changeForm(props.name, this.toSerializedValue(rawValue), props.validationGroup);
  }

  /**
   * @stable [17.06.2018]
   * @param {AnyT} rawValue
   */
  private propsOnChange(rawValue: AnyT): void {
    const props = this.props;
    if (props.onChange) {
      props.onChange(rawValue);
    }
  }

  /**
   * @stable [04.09.2018]
   */
  private setCaretVisibility(): void {
    this.setState(defValuesFilter<IUniversalFieldState, IUniversalFieldState>({
      caretVisibility: !this.state.caretVisibility,

      // Lazy initialization to do not use a setTimeout
      caretPosition: orUndef<number>(R.isNil(this.state.caretPosition), () => this.getCaretPosition()),
    }));
  }
}
