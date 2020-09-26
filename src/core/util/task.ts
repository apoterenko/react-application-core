import { DiServices } from '../di/di.services';
import { IProgressWrapper } from '../definitions.interface';
import { TypeUtils } from './type';

export class DelayedTask
  implements IProgressWrapper {

  private taskId: number;
  private context: unknown;

  /**
   * @stable [26.09.2020]
   * @param task
   * @param period
   * @param repeat
   */
  constructor(private task: (context?: unknown) => void,
              private period = 0,
              private repeat = false) {
  }

  /**
   * @stable [26.09.2020]
   */
  public get progress(): boolean {
    return TypeUtils.isNumber(this.taskId);
  }

  /**
   * @stable [26.09.2020]
   * @param context
   */
  public start<TContext = unknown>(context?: TContext): void {
    this.context = context;
    this.launchTask();
  }

  /**
   * @stable [26.09.2020]
   * @param context
   */
  public startImmediately<TContext = unknown>(context?: TContext): void {
    this.context = context;
    this.launchTask(true);
  }

  /**
   * @stable [26.09.2020]
   */
  public stop(): void {
    if (!TypeUtils.isNumber(this.taskId)) {
      return;
    }

    clearTimeout(this.taskId);
    this.taskId = null;
  }

  /**
   * @stable [26.09.2020]
   */
  private launchTask(startImmediately = false): void {
    this.stop();
    this.taskId = DiServices.environment().window.setTimeout(() => this.onTaskDone(), this.period);

    if (startImmediately) {
      this.callTask();
    }
  }

  /**
   * @stable [26.09.2020]
   */
  private onTaskDone(): void {
    this.callTask();

    if (this.repeat) {
      this.launchTask();
    } else {
      this.taskId = null;
      this.context = null;
    }
  }

  /**
   * @stable [26.09.2020]
   */
  private callTask(): void {
    this.task.call(null, this.context);
  }
}
