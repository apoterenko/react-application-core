import * as R from 'ramda';
import * as Printf from 'sprintf-js';
import { LoggerFactory, ILogger } from 'ts-smart-logger';

import {
  calc,
  defValuesFilter,
  DelayedTask,
  ifNotNilThanValue,
  isDef,
  isFn,
  isUndef,
  orDefault,
  orNull,
  orUndef,
} from '../../../util';
import { IUniversalField } from '../../../entities-definitions.interface';
import { IUniversalFieldProps } from '../../../props-definitions.interface';
import { AnyT, IKeyValue, CLEAR_DIRTY_CHANGES_VALUE } from '../../../definitions.interface';
import { FIELD_DISPLAY_EMPTY_VALUE, FIELD_EMPTY_ERROR_VALUE, IUniversalFieldState } from './field.interface';
import { UniversalComponent } from '../../base/universal.component';
import {
  isFieldInactive,
  isFieldInProgress,
  isFieldRequired,
  isFieldChangeable,
  toActualChangedValue,
  isFieldDisabled,
  isFieldVisible,
} from './field.support';

export abstract class UniversalField<TProps extends IUniversalFieldProps<TKeyboardEvent,
                                                                         TFocusEvent,
                                                                         TBasicEvent>,
                                     TState extends IUniversalFieldState,
                                     TKeyboardEvent,
                                     TFocusEvent,
                                     TBasicEvent>
  extends UniversalComponent<TProps, TState>
  implements IUniversalField<TProps, TState> {

  protected static logger = LoggerFactory.makeLogger('UniversalField');
  private static DEFAULT_CARET_BLINKING_FREQUENCY_TIMEOUT = 400;

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

    if (props.useKeyboard && this.useSyntheticCursor) {
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

    const useKeyboard = this.props.useKeyboard;
    if (useKeyboard && this.state.keyboardOpened && !R.equals(this.value, prevProps.value)) {
      this.refreshCaretPosition();
    }

    if (prevProps.useKeyboard && !useKeyboard) {
      this.closeSyntheticKeyboard();
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
   * @stable [07.01.2018]
   * @param {AnyT} currentRawValue
   */
  public onChangeManually(currentRawValue: AnyT): void {
    if (this.props.preventManualChanges !== true) {
      this.onChangeValue(currentRawValue);
    }
  }

  /**
   * @stable [22.10.2018]
   * @returns {AnyT}
   */
  public get value(): AnyT {
    const props = this.props;
    const state = this.state;
    const value = isDef(state.bufferedValue) ? state.bufferedValue : props.value;
    return isDef(value) ? value : props.defaultValue;
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
      FIELD_DISPLAY_EMPTY_VALUE
    );
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
   * @stable [18.12.2018]
   * @returns {boolean}
   */
  protected isNotDefaultValuePresent(): boolean {
    const props = this.props;
    return isDef(props.value) && isDef(props.defaultValue) && !R.equals(props.value, props.defaultValue);
  }

  /**
   * @stable [05.10.2018]
   * @returns {boolean}
   */
  protected isFieldRequired(): boolean {
    return isFieldRequired(this.props);
  }

  /**
   * @stable [05.10.2018]
   * @returns {boolean}
   */
  protected isFieldInvalid(): boolean {
    return !R.isNil(this.error);
  }

  /**
   * @stable [17.06.2018]
   * @returns {AnyT}
   */
  protected getEmptyValue(): AnyT {
    return FIELD_DISPLAY_EMPTY_VALUE;
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
   * @stable [07.01.2019]
   * @param {AnyT} value
   * @returns {AnyT}
   */
  protected toDisplayValue(value: AnyT): AnyT {
    return this.inProgress() || !this.isValuePresent(value)
      ? FIELD_DISPLAY_EMPTY_VALUE  // The dictionaries data is cleaned before request
      : this.getDecoratedValue(value);
  }

  /**
   * @stable [12.02.2019]
   * @param {AnyT} value
   * @param {boolean} returnDisplayValue
   * @returns {AnyT}
   */
  protected getDecoratedValue(value: AnyT, returnDisplayValue = true): AnyT {
    const props = this.props;
    const displayValue = props.displayValue;
    const decoratedValue = this.decorateValueBeforeDisplaying(value);
    return isFn(displayValue)
      ? calc(displayValue, decoratedValue)
      : (
        returnDisplayValue
          ? (R.isNil(displayValue) ? decoratedValue : this.decorateValueBeforeDisplaying(displayValue))
          : decoratedValue
      );
  }

  /**
   * @stable [07.01.2018]
   * @returns {boolean}
   */
  protected get hasDisplayValue(): boolean {
    return isDef(this.props.displayValue);
  }

  /**
   * @stable [07.01.2018]
   * @param {AnyT} value
   * @returns {AnyT}
   */
  protected decorateValueBeforeDisplaying(value: AnyT): AnyT {
    return value;
  }

  /**
   * @stable [06.10.2018]
   * @returns {boolean}
   */
  protected isFieldInactive(): boolean {
    return isFieldInactive(this.props);
  }

  /**
   * @stable [10.06.2019]
   * @returns {boolean}
   */
  protected isFieldDisabled(): boolean {
    return isFieldDisabled(this.props);
  }

  /**
   * @stable [06.10.2018]
   * @returns {boolean}
   */
  protected isFieldChangeable(): boolean {
    return isFieldChangeable(this.props);
  }

  /**
   * @stable [27.01.2019]
   * @returns {boolean}
   */
  protected isFieldFocused(): boolean {
    return this.props.useKeyboard ? this.isKeyboardOpened() : this.state.focused;
  }

  /**
   * @stable [18.06.2019]
   * @returns {boolean}
   */
  protected isFieldVisible(): boolean {
    return isFieldVisible(this.props);
  }

  /**
   * @stable [06.10.2018]
   * @returns {boolean}
   */
  protected inProgress(): boolean {
    return isFieldInProgress(this.props);
  }

  /**
   * @stable [04.09.2018]
   * @param {TFocusEvent} event
   */
  protected onFocus(event: TFocusEvent): void {
    const props = this.props;

    if (props.preventFocus || props.useKeyboard) {
      // Prevent native keyboard opening when using a synthetic keyboard
      this.removeFocus();

      if (props.useKeyboard) {
        this.openSyntheticKeyboard();
      }
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
    if (props.bufferValue) {
      this.submitBufferedValue();
      this.setState({bufferedValue: CLEAR_DIRTY_CHANGES_VALUE});
    }

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
  protected keyboardElement(): JSX.Element {
    return null;
  }

  /**
   * @stable [08.05.2019]
   */
  protected openSyntheticKeyboard(): boolean {
    if (this.state.keyboardOpened) {
      return false;
    }
    this.setState({keyboardOpened: true}, () => {
      if (isDef(this.caretBlinkingTask)) {
        this.caretBlinkingTask.start();

        /**
         * @bugfix [08.05.2019]
         * Need to refresh a caret position right after keyboard opening
         */
        this.refreshCaretPosition();
      }
    });
    UniversalField.logger.debug(
      `[$UniversalField][openSyntheticKeyboard] A keyboard to the field "${this.props.name}" is about to be opened.`
    );
    return true;
  }

  /**
   * @stable [04.09.2018]
   */
  protected closeSyntheticKeyboard(): void {
    this.setState({keyboardOpened: false});
    this.onCloseKeyboard();
  }

  /**
   * @stable [04.09.2018]
   */
  protected onCloseKeyboard(): void {
    if (isDef(this.caretBlinkingTask)) {
      this.caretBlinkingTask.stop();
    }
    if (this.props.useKeyboard) {
      UniversalField.logger.debug(
        `[$UniversalField][onCloseKeyboard] A keyboard for the field "${this.props.name}" has been closed.`
      );
    }
  }

  /**
   * @stable [03.09.2018]
   * @returns {JSX.Element}
   */
  protected getKeyboardElement(): JSX.Element {
    return orNull<JSX.Element>(
      this.props.useKeyboard && this.isKeyboardOpened(),
      () => this.keyboardElement(),
    );
  }

  /**
   * @stable [13.01.2019]
   * @returns {boolean}
   */
  protected isKeyboardOpened(): boolean {
    return this.state.keyboardOpened;
  }

  /**
   * @stable [03.09.2018]
   * @returns {JSX.Element}
   */
  protected getErrorMessageElement(): JSX.Element {
    return orNull<JSX.Element>(
      this.props.errorMessageRendered !== false,
      () => this.toMessageElement(this.error, 'rac-field-error-text')
    );
  }

  /**
   * @stable [03.09.2018]
   * @returns {JSX.Element}
   */
  protected getMessageElement(): JSX.Element {
    return ifNotNilThanValue(this.props.message, (message) => this.toMessageElement(message));
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
    const caretPosition = this.getCaretPosition();
    this.setState({caretPosition});

    UniversalField.logger.debug(
      `[$UniversalField][refreshCaretPosition] A caret position ${caretPosition} for the field ${
        this.props.name} had been refreshed.`
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
   * @stable [14.01.2019]
   * @returns {boolean}
   */
  protected get useSyntheticCursor(): boolean {
    return this.props.useSyntheticCursor !== false;
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
   * @stable [22.03.2019]
   * @param {string} message
   * @param {string} className
   * @returns {JSX.Element}
   */
  protected abstract toMessageElement(message: string, className?: string): JSX.Element;

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

    if (props.bufferValue) {
      this.setState({bufferedValue: actualChangedValue});
    } else {
      this.submitBufferedValue(actualChangedValue);
    }
  }

  /**
   * @stable [25.05.2019]
   * @param {any | AnyT | boolean} actualChangedValue
   */
  private submitBufferedValue(actualChangedValue = this.state.bufferedValue): void {
    this.validateField(actualChangedValue);
    this.propsOnChange(actualChangedValue);
    this.propsChangeForm(actualChangedValue);      // Notify a form about the changes
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
    props.changeForm(props.name, props.dispatchValue ? props.dispatchValue(rawValue) : rawValue, props.validationGroup);
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
