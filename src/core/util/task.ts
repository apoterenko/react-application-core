import * as R from 'ramda';

export class DelayedTask {

  private taskId: number;

  constructor(private task: () => void, private period: number, private repeat = false) {
  }

  public start(): void {
    this.launchTask();
  }

  public stop(): void {
    if (R.isNil(this.taskId)) {
      return;
    }
    clearTimeout(this.taskId);
    this.taskId = null;
  }

  private launchTask(): void {
    this.stop();
    this.taskId = setTimeout(() => this.onLaunchTask(), this.period);
  }

  private onLaunchTask(): void {
    this.task.call(null);
    if (this.repeat) {
      this.launchTask();
    }
  }
}
