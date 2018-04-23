import { sequence } from '../../../../util';
import { AnyT, ChangeEventT, KeyboardEventT } from '../../../../definitions.interface';
import { IField } from '../field.interface';
import { IDelayedChangesFieldPluginInternalProps } from './delayed-changes-field.interface';
import { IUniversalComponentPlugin } from '../../../../entities-definitions.interface';

export class DelayedChangesFieldPlugin implements IUniversalComponentPlugin<IDelayedChangesFieldPluginInternalProps> {
  public static DEFAULT_DELAY_TIMEOUT = 1500;

  private taskId: number;
  private currentValue: AnyT;

  constructor(private component: IField<IDelayedChangesFieldPluginInternalProps, {}>) {
  }

  public componentWillMount(): void {
    this.component.onChange = sequence(this.component.onChange, this.onChange, this);
    this.component.onKeyEnter = sequence(this.component.onKeyEnter, this.onKeyEnter, this);
  }

  public componentWillUnmount(): void {
    this.clearTask();
  }

  private onKeyEnter(event: KeyboardEventT): void {
    this.component.stopEvent(event);
    this.clearTask();
    this.propsOnDelay(this.currentValue);
  }

  private onChange(event: ChangeEventT): void {
    this.currentValue = event.target.value;
    this.launchTask();
  }

  private launchTask(): void {
    this.clearTask();
    this.taskId = window.setTimeout(
        this.propsOnDelay.bind(this),
        this.props.delayTimeout || DelayedChangesFieldPlugin.DEFAULT_DELAY_TIMEOUT,
        this.currentValue,
    );
  }

  private clearTask(): void {
    if (this.taskId) {
      window.clearTimeout(this.taskId);
    }
  }

  private propsOnDelay(value: AnyT): void {
    if (this.props.onDelay) {
      this.props.onDelay(value);
    }
  }

  private get props(): IDelayedChangesFieldPluginInternalProps {
    return this.component.props;
  }
}
