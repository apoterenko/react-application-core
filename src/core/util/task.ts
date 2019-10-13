import * as R from 'ramda';

import {
  AnyT,
  IProgressWrapper,
} from '../definitions.interface';

export class DelayedTask
  implements IProgressWrapper {

  private taskId: number;
  private context: AnyT;

  /**
   * @stable [13.10.2019]
   * @param {(context?: AnyT) => void} task
   * @param {number} period
   * @param {boolean} repeat
   */
  constructor(private task: (context?: AnyT) => void,
              private period = 0,
              private repeat = false) {
  }

  /**
   * @stable [13.10.2019]
   * @returns {boolean}
   */
  public get progress(): boolean {
    return !R.isNil(this.taskId);
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
    this.taskId = setTimeout(() => this.onTaskDone(), this.period);
  }

  /**
   * @stable [29.07.2018]
   */
  private onTaskDone(): void {
    this.task.call(null, this.context);

    if (this.repeat) {
      this.launchTask();
    } else {
      this.taskId = null;
      this.context = null;
    }
  }
}
