import { sequence, DelayedTask, cancelEvent } from '../../../../util';
import { AnyT, IChangeEvent, IKeyboardEvent } from '../../../../definitions.interface';
import { IUniversalField } from '../../../../entities-definitions.interface';
import { IDelayedChangesFieldPluginConfiguration } from '../../../../configurations-definitions.interface';
import { IUniversalPlugin } from '../../../../definition';

export class DelayedChangesFieldPlugin implements IUniversalPlugin<IDelayedChangesFieldPluginConfiguration> {
  public static DEFAULT_DELAY_TIMEOUT = 1500;

  private currentValue: AnyT;
  private delayedTask: DelayedTask;

  /**
   * @stable [18.05.2018]
   * @param {IUniversalField} component
   */
  constructor(private component: IUniversalField) {
    this.delayedTask = new DelayedTask(
      this.doDelay.bind(this),
      this.props.delayTimeout || DelayedChangesFieldPlugin.DEFAULT_DELAY_TIMEOUT
    );

    this.component.onChange = sequence(this.component.onChange, this.onChange, this);
    this.component.onChangeManually = sequence(this.component.onChangeManually, this.onChangeManually, this);
    this.component.onKeyEnter = sequence(this.component.onKeyEnter, this.onKeyEnter, this);
  }

  /**
   * @stable [04.05.2018]
   */
  public componentWillUnmount(): void {
    this.delayedTask.stop();
  }

  /**
   * @stable [04.05.2018]
   * @param {IKeyboardEvent} event
   */
  private onKeyEnter(event: IKeyboardEvent): void {
    cancelEvent(event);
    this.delayedTask.stop();
    this.doDelay(this.currentValue);
  }

  /**
   * @stable [04.05.2018]
   * @param {IChangeEvent} event
   */
  private onChange(event: IChangeEvent): void {
    this.onChangeManually(event.target.value);
  }

  /**
   * @stable [18.05.2018]
   */
  private onChangeManually(value: string): void {
    this.currentValue = value;
    this.delayedTask.start();
  }

  /**
   * @stable [04.05.2018]
   * @param {AnyT} value
   */
  private doDelay(value: AnyT): void {
    if (this.props.onDelay) {
      this.props.onDelay(value);
    }
  }

  /**
   * @stable [04.05.2018]
   * @returns {IDelayedChangesFieldPluginConfiguration}
   */
  private get props(): IDelayedChangesFieldPluginConfiguration {
    return this.component.props;
  }
}
