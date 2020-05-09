import {
  cancelEvent,
  DelayedTask,
  sequence,
} from '../../../../util';
import {
  AnyT,
  IChangeEvent,
  IKeyboardEvent,
} from '../../../../definitions.interface';
import { IGenericField2 } from '../../../../entities-definitions.interface';
import { IGenericPlugin } from '../../../../definition';

export class DelayedChangesFieldPlugin implements IGenericPlugin {
  public static DEFAULT_DELAY_TIMEOUT = 1500;

  private currentValue: AnyT;
  private delayedTask: DelayedTask;

  /**
   * @stable [18.05.2018]
   * @param {IGenericField2} component
   */
  constructor(private component: IGenericField2<AnyT>) { // TODO Fix props typings
    this.delayedTask = new DelayedTask(
      this.doDelay.bind(this),
      component.props.delayTimeout || DelayedChangesFieldPlugin.DEFAULT_DELAY_TIMEOUT
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
    if (this.component.props.onDelay) {
      this.component.props.onDelay(value);
    }
  }
}
