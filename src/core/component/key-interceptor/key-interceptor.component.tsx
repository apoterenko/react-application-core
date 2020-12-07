import * as React from 'react';
import { LoggerFactory } from 'ts-smart-logger';

import { GenericComponent } from '../base/generic.component';
import {
  DelayedTask,
  TypeUtils,
} from '../../util';
import { EventsEnum } from '../../definition';
import { IKeyInterceptorProps } from './key-interceptor.interface';

export class KeyInterceptor extends GenericComponent<IKeyInterceptorProps> {

  public static readonly defaultProps: IKeyInterceptorProps = {
    delayTimeout: 300,
    robotDetectionMinSymbolsCount: 3,
  };
  private static readonly logger = LoggerFactory.makeLogger('KeyInterceptor');

  private static ENTER_KEY_CODE = 13;
  private static ENTER_KEY_CODES = [
    10,
    KeyInterceptor.ENTER_KEY_CODE
  ];
  private static SPECIAL_KEY_CODES = [
    8,  // backspace
    9,  // tab
    16, // shift
    17, // ctrl
    18  // alt
  ];

  private readonly delayedTask: DelayedTask;
  private unSubscriber: () => void;
  private defaultUnSubscriber: () => void;
  private buffer = '';

  /**
   * @stable [21.11.2020]
   * @param originalProps
   */
  constructor(originalProps: IKeyInterceptorProps) {
    super(originalProps);

    this.onEventCapture = this.onEventCapture.bind(this);
    this.onDefaultEventCapture = this.onDefaultEventCapture.bind(this);
    this.delayedTask = new DelayedTask(this.onCheckBuffer.bind(this), originalProps.delayTimeout);
  }

  /**
   * @stable [18.05.2020]
   */
  public componentDidMount(): void {
    this.defaultUnSubscriber = this.eventManager.subscribe(
      this.environment.document,
      EventsEnum.KEY_DOWN,
      this.onDefaultEventCapture
    );
    this.unSubscriber = this.eventManager.subscribe(
      this.environment.document,
      EventsEnum.KEY_PRESS,
      this.onEventCapture
    );
  }

  /**
   * @stable [18.05.2020]
   */
  public componentWillUnmount(): void {
    this.delayedTask.stop();

    if (TypeUtils.isFn(this.defaultUnSubscriber)) {
      this.defaultUnSubscriber();
      this.defaultUnSubscriber = null;
    }
    if (TypeUtils.isFn(this.unSubscriber)) {
      this.unSubscriber();
      this.unSubscriber = null;
    }
  }

  /**
   * @stable [21.11.2020]
   */
  public render(): JSX.Element {
    return null;
  }

  /**
   * @stable [22.11.2020]
   * @param e
   * @private
   */
  private onDefaultEventCapture(e: KeyboardEvent): void {
    if (this.domAccessor.isAlreadyFocused()) {
      // Don't interfere with normal input typings
      return;
    }
    // https://support.google.com/chrome/answer/157179?co=GENIE.Platform%3DDesktop&hl=en
    // Open a new tab, and jump to it	Ctrl + t
    // Open the Downloads page in a new tab	Ctrl + j
    // Jump to a specific tab	Ctrl + 1 through Ctrl + 8
    // Jump to the rightmost tab	Ctrl + 9

    if (e.ctrlKey && /[jmt1-9]/i.test(e.key)) {
      this.domAccessor.cancelEvent(e); // Disable keyboard shortcuts of Chrome, ...

      // Simulate 13 key event
      this.domAccessor.dispatchEvent({
        event: new KeyboardEvent(EventsEnum.KEY_PRESS, {keyCode: KeyInterceptor.ENTER_KEY_CODE} as KeyboardEvent),
        element: this.environment.document,
      });
    }
  }

  /**
   * @stable [21.11.2020]
   * @param e
   * @private
   */
  private onEventCapture(e: KeyboardEvent): void {
    if (this.domAccessor.isAlreadyFocused()) {
      // Don't interfere with normal input typings
      return;
    }
    this.domAccessor.cancelEvent(e);

    const keyCode = e.keyCode;
    if (KeyInterceptor.SPECIAL_KEY_CODES.includes(keyCode)) {
      return;
    }

    const {
      ignoreEnterKey,
    } = this.originalProps;
    let char = e.key;

    if (KeyInterceptor.ENTER_KEY_CODES.includes(keyCode)) {
      if (ignoreEnterKey) { // TODO Remove this props?
        KeyInterceptor.logger.debug('[$KeyInterceptor][onEventCapture] Ignore enter key code and exit.');
        return;
      }
      char = '\n';
    }
    this.buffer = `${this.buffer}${char}`;
    this.delayedTask.start();
  }

  /**
   * @stable [21.11.2020]
   * @private
   */
  private onCheckBuffer(): void {
    const {
      onSelect,
      robotDetectionMinSymbolsCount,
    } = this.originalProps;

    if (this.buffer.length >= robotDetectionMinSymbolsCount) {
      if (TypeUtils.isFn(onSelect)) {
        const finalValue = this.buffer.trim();  // Normalize a buffer in some specific case

        KeyInterceptor.logger.debug('[$KeyInterceptor][onCheckBuffer] Final value:', finalValue);
        onSelect(finalValue);
      }
    }
    this.buffer = '';
  }
}
