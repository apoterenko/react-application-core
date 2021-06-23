import { DelayedTask } from './task';
import { IVisibilityTaskContextConfigEntity } from '../definition';

export class VisibilityTask<TContextConfigEntity extends IVisibilityTaskContextConfigEntity = IVisibilityTaskContextConfigEntity> {

  private readonly closeTask: DelayedTask;
  private readonly showTask: DelayedTask;
  public ctx: TContextConfigEntity;

  /**
   * @stable [16.06.2021]
   * @param onShow
   * @param onClose
   * @param period
   */
  constructor(private onShow: () => void,
              private onClose: () => void,
              private readonly period = 200) {
    this.closeTask = new DelayedTask(onClose, period);
    this.showTask = new DelayedTask(onShow, period);

    this.onDependentElementEnter = this.onDependentElementEnter.bind(this);
    this.onDependentElementLeave = this.onDependentElementLeave.bind(this);
    this.onTargetElementEnter = this.onTargetElementEnter.bind(this);
    this.onTargetElementLeave = this.onTargetElementLeave.bind(this);
  }

  /**
   * @stable [16.06.2021]
   * @param ctx
   */
  public onTargetElementEnter(ctx: TContextConfigEntity): void {
    this.ctx = ctx;

    this.showTask.start();
    this.closeTask.stop();
  }

  /**
   * @stable [16.06.2021]
   */
  public onTargetElementLeave(): void {
    this.showTask.stop();
    this.closeTask.start();
  }

  /**
   * @stable [16.06.2021]
   */
  public onDependentElementEnter(): void {
    this.closeTask.stop();
  }

  /**
   * @stable [16.06.2021]
   */
  public onDependentElementLeave(): void {
    this.closeTask.start();
  }

  /**
   * @stable [16.06.2021]
   */
  public resetContext(): void {
    this.ctx = null;
  }

  /**
   * @stable [16.06.2021]
   */
  public stop(): void {
    this.closeTask.stop();
    this.showTask.stop();

    this.resetContext();
  }
}
