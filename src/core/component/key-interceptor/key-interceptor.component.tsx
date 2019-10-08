import * as React from 'react';
import { LoggerFactory } from 'ts-smart-logger';

import { UniversalComponent } from '../base/universal.component';
import { DelayedTask, isFn } from '../../util';
import {
  EventsEnum,
  FIELD_DISPLAY_EMPTY_VALUE,
} from '../../definition';
import { IKeyInterceptorProps } from './key-interceptor.interface';

export class KeyInterceptor extends UniversalComponent<IKeyInterceptorProps> {

  public static readonly defaultProps: IKeyInterceptorProps = {
    delayTimeout: 300,
    robotDetectionMinSymbolsCount: 3,
  };
  private static readonly logger = LoggerFactory.makeLogger('KeyInterceptor');

  private static IOS_SAFARI_CAPTURE_EVENT = EventsEnum.KEYDOWN;
  private static DEFAULT_CAPTURE_EVENT = EventsEnum.KEYPRESS;
  private static ENTER_KEY_CODES = [10, 13];
  private static SPECIAL_KEY_CODES = [
    8,  // backspace
    9,  // tab
    16, // shift
    17, // ctrl
    18  // alt
  ];

  private delayedTask: DelayedTask;
  private unSubscriber: () => void;
  private buffer = FIELD_DISPLAY_EMPTY_VALUE;

  /**
   * @stable [05.05.2018]
   * @param props
   */
  constructor(props) {
    super(props);
    this.onEventCapture = this.onEventCapture.bind(this);

    this.delayedTask = new DelayedTask(this.onCheckBuffer.bind(this), props.delayTimeout);
  }

  /**
   * @stable [05.05.2018]
   */
  public componentDidMount(): void {
    super.componentDidMount();

    this.unSubscriber = this.eventManager.subscribe(
      this.environment.document,
      this.captureEvent,
      this.onEventCapture
    );
  }

  /**
   * @stable [05.05.2018]
   */
  public componentWillUnmount(): void {
    this.delayedTask.stop();
    if (isFn(this.unSubscriber)) {
      this.unSubscriber();
      this.unSubscriber = null;
    }
    super.componentWillUnmount();
  }

  /**
   * @stable [08.10.2019]
   * @returns {JSX.Element}
   */
  public render(): JSX.Element {
    return null;
  }

  /**
   * @stable [08.10.2019]
   * @param {KeyboardEvent} e
   */
  private onEventCapture(e: KeyboardEvent): void {
    if (this.domAccessor.isAlreadyFocused()) {
      // Don't interfere with normal input typings
      return;
    }
    const keyCode = e.keyCode;
    if (KeyInterceptor.SPECIAL_KEY_CODES.includes(keyCode)) {
      return;
    }

    const props = this.props;
    let char = e.key;
    if (KeyInterceptor.ENTER_KEY_CODES.includes(keyCode)) {
      if (props.ignoreEnterKey) {
        KeyInterceptor.logger.debug('[$KeyInterceptor][onEventCapture] Ignore enter key code and exit.');
        return;
      }
      char = '\n';
    }
    this.buffer = `${this.buffer}${char}`;
    this.delayedTask.start();
  }

  /**
   * @stable [08.10.2019]
   */
  private onCheckBuffer(): void {
    if (this.buffer.length >= this.props.robotDetectionMinSymbolsCount) {
      const onSelect = this.props.onSelect;
      if (isFn(onSelect)) {
        onSelect(this.buffer);
      }
    }
    this.buffer = FIELD_DISPLAY_EMPTY_VALUE;
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
    return this.isCaptureFilterDisabled
      ? KeyInterceptor.IOS_SAFARI_CAPTURE_EVENT
      : KeyInterceptor.DEFAULT_CAPTURE_EVENT;
  }

  /**
   * @stable [08.10.2019]
   * @returns {boolean}
   */
  private get isCaptureFilterDisabled(): boolean {
    return this.environment.safariPlatform && this.environment.iosPlatform;
  }
}
