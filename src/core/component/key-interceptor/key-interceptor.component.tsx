import * as React from 'react';
import { LoggerFactory } from 'ts-smart-logger';

import { GenericBaseComponent } from '../base/generic-base.component';
import {
  DelayedTask,
  isFn,
} from '../../util';
import {
  EventsEnum,
  FieldConstants,
} from '../../definition';
import { IKeyInterceptorProps } from './key-interceptor.interface';

export class KeyInterceptor extends GenericBaseComponent<IKeyInterceptorProps> {

  public static readonly defaultProps: IKeyInterceptorProps = {
    delayTimeout: 300,
    robotDetectionMinSymbolsCount: 3,
  };
  private static readonly logger = LoggerFactory.makeLogger('KeyInterceptor');

  private static IOS12_SAFARI_CAPTURE_EVENT = EventsEnum.KEY_DOWN;
  private static DEFAULT_CAPTURE_EVENT = EventsEnum.KEY_PRESS;
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
  private buffer = FieldConstants.DISPLAY_EMPTY_VALUE;

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
   * @stable [18.05.2020]
   */
  public componentDidMount(): void {
    this.unSubscriber = this.eventManager.subscribe(
      this.environment.document,
      this.captureEvent,
      this.onEventCapture
    );
  }

  /**
   * @stable [18.05.2020]
   */
  public componentWillUnmount(): void {
    this.delayedTask.stop();

    if (isFn(this.unSubscriber)) {
      this.unSubscriber();
      this.unSubscriber = null;
    }
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
    const props = this.props;
    if (this.buffer.length >= props.robotDetectionMinSymbolsCount) {
      const onSelect = props.onSelect;
      if (isFn(onSelect)) {
        const normalizedValue = this.buffer.trim(); // Normalize a buffer in some specific case (production issue fix (!))
        onSelect(normalizedValue);
      }
    }
    this.buffer = FieldConstants.DISPLAY_EMPTY_VALUE;
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
      ? KeyInterceptor.IOS12_SAFARI_CAPTURE_EVENT
      : KeyInterceptor.DEFAULT_CAPTURE_EVENT;
  }

  /**
   * @stable [08.10.2019]
   * @returns {boolean}
   */
  private get isCaptureFilterDisabled(): boolean {
    const env = this.environment;
    return env.safariOrSafariMobilePlatform && env.iosPlatform && !env.ios13Platform;
  }
}
