import * as React from 'react';
import * as R from 'ramda';
import * as Printf from 'sprintf-js';
import {
  ILogger,
  LoggerFactory,
} from 'ts-smart-logger';

import {
  DelayedTask,
  ifNilThanValue,
  isDef,
  isDisplayValueRenderedOnly,
  isFieldInactive,
  isFn,
  isFocused,
  isPlainValueApplied,
  isSyntheticCursorUsed,
  isVisible,
  notNilValuesFilter,
} from '../../../util';
import { IGenericField2 } from '../../../entities-definitions.interface';
import { IUniversalFieldProps } from '../../../configurations-definitions.interface';
import {
  AnyT,
  IFocusEvent,
  IKeyboardEvent,
} from '../../../definitions.interface';
import {
  IUniversalFieldState,
} from './field.interface';
import {
  FieldConstants,
  IBaseEvent,
} from '../../../definition';
import { Field } from './field.component';

export class UniversalField<TProps extends IUniversalFieldProps,
  TState extends IUniversalFieldState>
  extends Field<TProps, TState>
  implements IGenericField2<TProps, TState> {

  protected static logger = LoggerFactory.makeLogger('UniversalField');
  private static DEFAULT_CARET_BLINKING_FREQUENCY_TIMEOUT = 400;

  private caretBlinkingTask: DelayedTask; // Used with a synthetic keyboard together

  /**
   * @stable [17.06.2018]
   * @param {TProps} props
   */
  constructor(props: TProps) {
    super(props);

    this.onChange = this.onChange.bind(this);
    this.onFocus = this.onFocus.bind(this);
    this.onBlur = this.onBlur.bind(this);
    this.onKeyUp = this.onKeyUp.bind(this);
    this.onKeyDown = this.onKeyDown.bind(this);
    this.closeVirtualKeyboard = this.closeVirtualKeyboard.bind(this);
    this.onCloseVirtualKeyboard = this.onCloseVirtualKeyboard.bind(this);

    if (this.isKeyboardUsed && this.isSyntheticCursorUsed) {
      this.caretBlinkingTask = new DelayedTask(
        this.setCaretVisibility.bind(this),
        props.caretBlinkingFrequencyTimeout || UniversalField.DEFAULT_CARET_BLINKING_FREQUENCY_TIMEOUT,
        true
      );
    }
  }

  /**
   * @stable [04.09.2018]
   * @param {TProps} prevProps
   * @param {TState} prevState
   */
  public componentDidUpdate(prevProps: TProps, prevState: TState): void {
    super.componentDidUpdate(prevProps, prevState);

    const {
      useKeyboard,
      value,
    } = prevProps;

    const $isKeyboardUsed = this.isKeyboardUsed;
    if ($isKeyboardUsed && this.isKeyboardOpen() && !R.equals(this.value, value)) {
      this.refreshCaretPosition();
    }
    if (useKeyboard && !$isKeyboardUsed) {
      this.closeVirtualKeyboard();
    }
  }

  /**
   * @stable [18.06.2018]
   * @param {IKeyboardEvent} event
   */
  public onKeyBackspace(event: IKeyboardEvent): void {
    const props = this.props;
    if (isFn(props.onKeyBackspace)) {
      props.onKeyBackspace(event);
    }
  }

  /**
   * @stable [18.06.2018]
   * @param {IKeyboardEvent} event
   */
  public onKeyUp(event: IKeyboardEvent): void {
    const props = this.props;
    if (isFn(props.onKeyUp)) {
      props.onKeyUp(event);
    }
  }

  /**
   * @stable [03.09.2018]
   * @param {IKeyboardEvent} event
   */
  public onKeyDown(event: IKeyboardEvent): void {
    const props = this.props;
    if (isFn(props.onKeyDown)) {
      props.onKeyDown(event);
    }
  }

  /**
   * @stable [16.01.2020]
   * @param {IBaseEvent} event
   */
  public onKeyEnter(event: IBaseEvent): void {
    const props = this.props;
    if (isFn(props.onKeyEnter)) {
      props.onKeyEnter(event);
    }
  }

  /**
   * @stable [04.09.2018]
   * @param {IKeyboardEvent} event
   */
  public onKeyTab(event: IKeyboardEvent): void {
    const props = this.props;
    if (isFn(props.onKeyTab)) {
      props.onKeyTab(event);
    }
  }

  /**
   * @stable [11.01.2020]
   * @param {IBaseEvent} event
   */
  public onKeyEscape(event: IBaseEvent): void {
    const props = this.props;
    if (isFn(props.onKeyEscape)) {
      props.onKeyEscape(event);
    }
  }

  /**
   * @stable [18.06.2018]
   * @param {IKeyboardEvent} event
   */
  public onKeyArrowDown(event: IKeyboardEvent): void {
    const props = this.props;
    if (isFn(props.onKeyArrowDown)) {
      props.onKeyArrowDown(event);
    }
  }

  /**
   * @stable [18.06.2018]
   * @param {IKeyboardEvent} event
   */
  public onKeyArrowUp(event: IKeyboardEvent): void {
    const props = this.props;
    if (isFn(props.onKeyArrowUp)) {
      props.onKeyArrowUp(event);
    }
  }

  /**
   * @stable [29.10.2019]
   * @param {boolean} usePrintf
   * @param {AnyT} args
   * @returns {string}
   */
  protected buildDisplayMessage(usePrintf: boolean, ...args: AnyT[]): string {
    return usePrintf
      ? Printf.sprintf(this.t(this.props.displayMessage), ...args)
      : FieldConstants.DISPLAY_EMPTY_VALUE;
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
   * @stable [28.10.2019]
   * @returns {boolean}
   */
  protected get isInactive(): boolean {
    return isFieldInactive(this.props);
  }

  /**
   * @stable [28.10.2019]
   * @returns {boolean}
   */
  protected get isActive(): boolean {
    return !this.isInactive;
  }

  /**
   * @stable [30.10.2019]
   * @returns {boolean}
   */
  protected get isFocused(): boolean {
    return this.isKeyboardUsed ? this.isKeyboardOpen() : isFocused(this.state);
  }

  /**
   * @stable [25.10.2019]
   * @returns {boolean}
   */
  protected get isVisible(): boolean {
    return isVisible(this.props);
  }

  /**
   * @stable [30.10.2019]
   * @param {IFocusEvent} event
   */
  protected onFocus(event: IFocusEvent): void {
    if (this.isFocusPrevented || this.isKeyboardUsed) {
      this.removeFocus(); // Prevent native keyboard opening during use of a synthetic keyboard

      if (this.isKeyboardUsed) {
        this.openVirtualKeyboard();
      }
    } else {
      this.setState({focused: true});
    }

    const props = this.props;
    if (isFn(props.onFocus)) {
      props.onFocus(event);
    }
  }

  /**
   * @stable [30.10.2019]
   * @param {IFocusEvent} event
   */
  protected onBlur(event: IFocusEvent): void {
    this.setState({focused: false});

    const props = this.props;
    if (isFn(props.onBlur)) {
      props.onBlur(event);
    }
  }

  /**
   * @stable [22.01.2020]
   * @returns {JSX.Element}
   */
  protected get keyboardElement(): JSX.Element {
    return null;
  }

  /**
   * @react-native-compatible
   * @stable [28.01.2020]
   * @returns {React.ReactNode}
   */
  protected get displayValueElement(): React.ReactNode {
    if (!this.isDisplayValueRenderedOnly) {
      return null;
    }
    const result = this.decoratedDisplayValue;
    return R.isNil(result)
      ? (this.isBusy ? this.getWaitMessageElement() : result)
      : result;
  }

  /**
   * @stable [23.12.2019]
   * @react-native-compatible
   * @returns {React.ReactNode}
   */
  protected getWaitMessageElement(): React.ReactNode {
    return this.settings.messages.PLEASE_WAIT;
  }

  /**
   * @stable [28.10.2019]
   */
  protected openVirtualKeyboard(callback?: () => void): void {
    if (this.isKeyboardOpen()) {
      return;
    }
    this.setState({keyboardOpen: true}, () => {
      if (isFn(callback)) {
        callback();
      }
      if (isDef(this.caretBlinkingTask)) {
        this.caretBlinkingTask.start();

        /**
         * @bugfix [08.05.2019]
         * Need to refresh a caret position right after keyboard opening
         */
        this.refreshCaretPosition();
      }
    });
  }

  /**
   * @stable [28.10.2019]
   */
  protected closeVirtualKeyboard(): void {
    this.setState({keyboardOpen: false}, this.onCloseVirtualKeyboard);
  }

  /**
   * @stable [28.10.2019]
   */
  protected onCloseVirtualKeyboard(): void {
    if (isDef(this.caretBlinkingTask)) {
      this.caretBlinkingTask.stop();
    }
  }

  /**
   * @stable [28.01.2020]
   * @returns {boolean}
   */
  protected get isPlainValueApplied(): boolean {
    return isPlainValueApplied(this.props);
  }

  /**
   * @stable [28.01.2020]
   * @returns {boolean}
   */
  protected get isDisplayValueRenderedOnly() {
    return isDisplayValueRenderedOnly(this.props);
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
   * @stable [30.10.2019]
   * @returns {boolean}
   */
  protected get isSyntheticCursorUsed(): boolean {
    return isSyntheticCursorUsed(this.props);
  }

  /**
   * @stable [21.12.2019]
   * @returns {boolean}
   */
  protected get isDisplayValueDefined(): boolean {
    return isDef(this.props.displayValue);
  }

  /**
   * @stable [09.11.2019]
   */
  private setCaretVisibility(): void {
    this.setState((prevState) => notNilValuesFilter<IUniversalFieldState, IUniversalFieldState>({
      caretVisibility: !prevState.caretVisibility,
      caretPosition: ifNilThanValue(prevState.caretPosition, () => this.getCaretPosition()),
    }));
  }
}
