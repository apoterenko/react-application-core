import * as R from 'ramda';
import { injectable } from 'inversify';
import {
  ILogger,
  LoggerFactory,
} from 'ts-smart-logger';

import {
  DI_TYPES,
  lazyInject,
} from '../../di';
import {
  EventsEnum,
  IDomAccessor,
  IEnvironment,
  IUserActivityConfigEntity,
  IUserActivityManager,
  TouchEventsEnum,
} from '../../definition';
import {
  DelayedTask,
  ifNotNilThanValue,
  isFn,
} from '../../util';

@injectable()
export class UserActivityManager implements IUserActivityManager {
  private static readonly logger = LoggerFactory.makeLogger('UserActivityManager');

  @lazyInject(DI_TYPES.DomAccessor) private readonly domAccessor: IDomAccessor;
  @lazyInject(DI_TYPES.Environment) private readonly environment: IEnvironment;

  private suspended: boolean;
  private inactivityTask: DelayedTask;
  private mouseDownEventUnsubscriber: () => void;
  private mouseMoveEventUnsubscriber: () => void;
  private touchMoveEventUnsubscriber: () => void;
  private touchStartEventUnsubscriber: () => void;

  /**
   * @stable [19.01.2020]
   */
  constructor() {
    this.onUserActivate = this.onUserActivate.bind(this);
  }

  /**
   * @stable [19.01.2020]
   * @param {IUserActivityConfigEntity} cfg
   */
  public spy(cfg: IUserActivityConfigEntity): void {
    if (!R.isNil(this.inactivityTask)) {
      this.cancel();
    }
    const {callback, timeout} = cfg;

    this.touchStartEventUnsubscriber = this.domAccessor.captureEvent({
      eventName: TouchEventsEnum.TOUCH_START,
      element: this.environment.document,
      callback: this.onUserActivate,
    });
    this.touchMoveEventUnsubscriber = this.domAccessor.captureEvent({
      eventName: TouchEventsEnum.TOUCH_MOVE,
      element: this.environment.document,
      callback: this.onUserActivate,
    });
    this.mouseDownEventUnsubscriber = this.domAccessor.captureEvent({
      eventName: EventsEnum.MOUSE_DOWN,
      element: this.environment.document,
      callback: this.onUserActivate,
    });
    this.mouseMoveEventUnsubscriber = this.domAccessor.captureEvent({
      eventName: EventsEnum.MOUSE_MOVE,
      element: this.environment.document,
      callback: this.onUserActivate,
    });

    this.inactivityTask = new DelayedTask(this.onUserDeactivate.bind(this, callback), timeout * 1000);
    this.inactivityTask.start();

    UserActivityManager.logger.debug('[$$UserActivityManager][spy] The config:', cfg);
  }

  /**
   * @stable [19.01.2020]
   */
  public suspend(): void {
    ifNotNilThanValue(
      this.inactivityTask,
      (inactivityTask) => {
        this.suspended = true;
        inactivityTask.stop();

        UserActivityManager.logger.debug('[$$UserActivityManager][suspend]');
      }
    );
  }

  /**
   * @stable [19.01.2020]
   */
  public resume(): void {
    ifNotNilThanValue(
      this.inactivityTask,
      (inactivityTask) => {
        this.suspended = false;
        inactivityTask.start();

        UserActivityManager.logger.debug('[$$UserActivityManager][resume]');
      }
    );
  }

  /**
   * @stable [19.01.2020]
   */
  public cancel(): void {
    this.suspended = false;

    ifNotNilThanValue(this.inactivityTask, (inactivityTask) => inactivityTask.stop());
    this.inactivityTask = null;

    if (isFn(this.touchStartEventUnsubscriber)) {
      this.touchStartEventUnsubscriber();
      this.touchStartEventUnsubscriber = null;
    }
    if (isFn(this.touchMoveEventUnsubscriber)) {
      this.touchMoveEventUnsubscriber();
      this.touchMoveEventUnsubscriber = null;
    }
    if (isFn(this.mouseDownEventUnsubscriber)) {
      this.mouseDownEventUnsubscriber();
      this.mouseDownEventUnsubscriber = null;
    }
    if (isFn(this.mouseMoveEventUnsubscriber)) {
      this.mouseMoveEventUnsubscriber();
      this.mouseMoveEventUnsubscriber = null;
    }

    UserActivityManager.logger.debug('[$$UserActivityManager][cancel]');
  }

  /**
   * @stable [19.01.2020]
   * @param {() => void} callback
   */
  private onUserDeactivate(callback: () => void): void {
    this.cancel();
    callback();
  }

  /**
   * @stable [19.01.2020]
   */
  private onUserActivate(): void {
    if (this.suspended) {
      return;
    }
    this.inactivityTask.start();
  }
}
