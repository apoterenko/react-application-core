import {
  ConditionUtils,
  DelayedTask,
  EventUtils,
  NvlUtils,
  sequence,
} from '../../../../util';
import {
  AnyT,
  IChangeEvent,
} from '../../../../definitions.interface';
import {
  IField,
  IGenericPlugin,
  IKeyboardEvent,
} from '../../../../definition';

export class DelayedChangesFieldPlugin implements IGenericPlugin {
  public static DEFAULT_DELAY_TIMEOUT = 1500;

  private currentValue: AnyT;
  private delayedTask: DelayedTask;

  /**
   * @stable [14.10.2020]
   * @param component
   */
  constructor(private component: IField) {
    this.delayedTask = new DelayedTask(
      this.doDelay.bind(this),
      NvlUtils.nvl(component.props.delayTimeout, DelayedChangesFieldPlugin.DEFAULT_DELAY_TIMEOUT)
    );

    component.onChange = sequence(component.onChange, this.onChange, this);
    component.onChangeManually = sequence(component.onChangeManually, this.onChangeManually, this);
    component.onKeyEnter = sequence(component.onKeyEnter, this.onKeyEnter, this);
  }

  /**
   * @stable [04.05.2018]
   */
  public componentWillUnmount(): void {
    this.delayedTask.stop();
  }

  /**
   * @stable [14.10.2020]
   * @param event
   * @private
   */
  private onKeyEnter(event: IKeyboardEvent): void {
    EventUtils.cancelEvent(event);

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
   * @stable [14.10.2020]
   * @param value
   * @private
   */
  private doDelay(value: AnyT): void {
    ConditionUtils.ifNotNilThanValue(this.component.props.onDelay, (onDelay) => onDelay(value));
  }
}
