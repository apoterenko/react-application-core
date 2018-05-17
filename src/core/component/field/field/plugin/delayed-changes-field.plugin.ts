import { sequence, DelayedTask, cancelEvent } from '../../../../util';
import { AnyT, IChangeEvent, IKeyboardEvent } from '../../../../definitions.interface';
import { IUniversalComponentPlugin } from '../../../../entities-definitions.interface';
import { IField } from '../field.interface';
import { IDelayedChangesFieldPluginProps } from './delayed-changes-field.interface';

export class DelayedChangesFieldPlugin implements IUniversalComponentPlugin<IDelayedChangesFieldPluginProps> {
  public static DEFAULT_DELAY_TIMEOUT = 1500;

  private currentValue: AnyT;
  private delayedTask: DelayedTask;

  /**
   * @stable [04.05.2018]
   * @param {IField} component
   */
  constructor(private component: IField) {
    this.delayedTask = new DelayedTask(
      this.doDelay.bind(this),
      this.props.delayTimeout || DelayedChangesFieldPlugin.DEFAULT_DELAY_TIMEOUT
    );
  }

  /**
   * @stable [04.05.2018]
   */
  public componentDidMount(): void {
    this.component.onChange = sequence(this.component.onChange, this.onChange, this);
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
    this.currentValue = event.target.value;
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
   * @returns {IDelayedChangesFieldPluginProps}
   */
  private get props(): IDelayedChangesFieldPluginProps {
    return this.component.props;
  }
}
