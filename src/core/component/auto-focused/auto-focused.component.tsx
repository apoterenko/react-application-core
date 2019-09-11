import * as React from 'react';
import { LoggerFactory } from 'ts-smart-logger';

import { BaseComponent } from '../base';
import { DelayedTask, orNull, isFn } from '../../util';
import { DI_TYPES, lazyInject } from '../../di';
import { ENV } from '../../env';
import { FIELD_DISPLAY_EMPTY_VALUE } from '../../definition';
import { IAutoFocusedProps } from './auto-focused.interface';
import { IAutoFocusedState } from './auto-focused.interface';
import { IEventManager } from '../../event';
import { IField, TextField, DelayedChangesFieldPlugin } from '../field';
import { IKeyboardEvent } from '../../definitions.interface';

export class AutoFocused extends BaseComponent<IAutoFocusedProps, IAutoFocusedState> {

  public static readonly defaultProps: IAutoFocusedProps = {
    delayTimeout: 300,
  };
  private static logger = LoggerFactory.makeLogger('AutoFocused');

  private static IOS_SAFARI_CAPTURE_EVENT = 'keydown';
  private static DEFAULT_CAPTURE_EVENT = 'keypress';
  private static ROBOT_DETECTION_MIN_SYMBOLS_COUNT = 3;
  private static ENTER_KEY_CODES = [10, 13];
  private static SPECIAL_KEY_CODES = [
    8,  // backspace
    9,  // tab
    16, // shift
    17, // ctrl
    18  // alt
  ];

  @lazyInject(DI_TYPES.EventManager) private readonly eventManager: IEventManager;

  private delayedTask: DelayedTask;
  private unSubscriber: () => void;

  /**
   * @stable [05.05.2018]
   * @param props
   */
  constructor(props) {
    super(props);
    this.onDelay = this.onDelay.bind(this);
    this.captureEventListener = this.captureEventListener.bind(this);

    this.state = {focusedFieldValue: ''};
    this.delayedTask = new DelayedTask(this.onDelayedTask.bind(this), props.delayTimeout, !props.useRobotMode);
  }

  /**
   * @stable [05.05.2018]
   */
  public componentDidMount(): void {
    super.componentDidMount();

    if (this.props.useRobotMode) {
      this.unSubscriber = this.eventManager.subscribe(document, this.captureEvent, this.captureEventListener);
    } else {
      this.delayedTask.start();
    }
  }

  /**
   * @stable [05.05.2018]
   */
  public componentWillUnmount(): void {
    this.delayedTask.stop();
    if (isFn(this.unSubscriber)) {
      this.unSubscriber();
    }

    super.componentWillUnmount();
  }

  /**
   * @stable [04.05.2018]
   * @returns {JSX.Element}
   */
  public render(): JSX.Element {
    const props = this.props;
    return (
      orNull<JSX.Element>(
        !props.useRobotMode,
        () => (
          <div className='rac-invisible'>
            <TextField ref='autoFocusedField'
                       value={this.state.focusedFieldValue}
                       onChange={(value) => this.setState({focusedFieldValue: value})}
                       plugins={[DelayedChangesFieldPlugin]}
                       delayTimeout={props.delayTimeout}
                       onDelay={this.onDelay}/>
          </div>
        )
      )
    );
  }

  /**
   * @stable [05.05.2018]
   * @param {IKeyboardEvent} e
   */
  private captureEventListener(e: KeyboardEvent): void {
    if (this.alreadyFocused) {
      // Don't interfere with normal input mode
      return;
    }
    const props = this.props;
    let char = e.key;
    const keyCode = e.keyCode;

    if (AutoFocused.SPECIAL_KEY_CODES.includes(keyCode)) {
      return;
    }
    if (AutoFocused.ENTER_KEY_CODES.includes(keyCode)) {
      if (props.ignoreEnterKey) {
        AutoFocused.logger.debug('[$AutoFocused][captureEventListener] Ignore enter key code and exit.');
        return;
      }
      char = '\n';
    }
    this.delayedTask.start();
    this.setState({focusedFieldValue: this.state.focusedFieldValue + char});
  }

  /**
   * @stable [04.05.2018]
   */
  private onDelayedTask(): void {
    if (this.props.useRobotMode) {
      const focusedFieldValue = this.state.focusedFieldValue;
      if (focusedFieldValue.length >= AutoFocused.ROBOT_DETECTION_MIN_SYMBOLS_COUNT) {
        this.onDelay();
      } else {
        this.clearField();
      }
    } else {
      if (this.alreadyFocused) {
        return;
      }
      this.autoFocusedField.setFocus();
    }
  }

  /**
   * @stable [04.05.2018]
   */
  private onDelay(): void {
    const onSelect = this.props.onSelect;
    if (onSelect) {
      onSelect(this.state.focusedFieldValue);
    }
    this.clearField();
  }

  /**
   * @stable [05.05.2018]
   */
  private clearField(): void {
    this.setState({focusedFieldValue: FIELD_DISPLAY_EMPTY_VALUE});
  }

  /**
   * @stable [04.05.2018]
   * @returns {IField}
   */
  private get autoFocusedField(): IField {
    return this.refs.autoFocusedField as IField;
  }

  /**
   * @stable [05.05.2018]
   * @returns {boolean}
   */
  private get alreadyFocused(): boolean {
    const activeElement = document.activeElement;
    return activeElement instanceof HTMLInputElement
      || activeElement instanceof HTMLTextAreaElement;
  }

  /**
   * @stable [11.09.2019]
   * @returns {string}
   */
  private get captureEvent(): string {
    // iOS Safari doesn't support space key at least
    // keypress -> keydown
    // https://developer.mozilla.org/en-US/docs/Web/API/Document/keypress_event
    // Since this event has been deprecated, you should look to use beforeinput or keydown instead.
    return ENV.safariPlatform && ENV.iosPlatform
      ? AutoFocused.IOS_SAFARI_CAPTURE_EVENT
      : AutoFocused.DEFAULT_CAPTURE_EVENT;
  }
}
