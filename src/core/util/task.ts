import * as R from 'ramda';

import { AnyT } from '../definitions.interface';

export class DelayedTask {

  private taskId: number;
  private context: AnyT;

  /**
   * @stable [29.07.2018]
   * @param {(context?: AnyT) => void} task
   * @param {number} period
   * @param {boolean} repeat
   */
  constructor(private task: (context?: AnyT) => void, private period: number = 0, private repeat = false) {
  }

  /**
   * @stable [29.07.2018]
   * @param {AnyT} context
   */
  public start(context?: AnyT): void {
    this.context = context;
    this.launchTask();
  }

  /**
   * @stable [29.07.2018]
   */
  public stop(): void {
    if (R.isNil(this.taskId)) {
      return;
    }
    clearTimeout(this.taskId);
    this.taskId = null;
  }

  /**
   * @stable [29.07.2018]
   */
  private launchTask(): void {
    this.stop();
    this.taskId = setTimeout(() => this.onLaunchTask(), this.period);
  }

  /**
   * @stable [29.07.2018]
   */
  private onLaunchTask(): void {
    this.task.call(null, this.context);

    if (this.repeat) {
      this.launchTask();
    } else {
      this.taskId = null;
      this.context = null;
    }
  }
}
