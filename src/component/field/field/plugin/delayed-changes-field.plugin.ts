import { sequence } from 'core/util';
import { IField } from 'core/component/field';
import { IComponentPlugin } from 'core/component/plugin';
import { AnyT, ChangeEventT, KeyboardEventT } from 'core/definition.interface';

import { IDelayedChangesFieldPluginInternalProps } from './delayed-changes-field.interface';

export type DelayedChangesFieldT = IField<IDelayedChangesFieldPluginInternalProps, {}, {}>;

export class DelayedChangesFieldPlugin implements IComponentPlugin<DelayedChangesFieldT,
                                                                   IDelayedChangesFieldPluginInternalProps,
                                                                   {}> {
  public static DEFAULT_DELAY_TIMEOUT = 1500;

  private taskId: number;
  private currentValue: AnyT;

  constructor(private component: DelayedChangesFieldT) {
    if (!this.props.onDelay) {
      throw Error('The property "onDelay" does not exist!');
    }
  }

  public componentWillMount(): void {
    this.component.onChange = sequence(this.component.onChange, this.onChange, this);
    this.component.onKeyEnter = sequence(this.component.onKeyEnter, this.onKeyEnter, this);
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
    this.props.onDelay(value);
  }

  private get props(): IDelayedChangesFieldPluginInternalProps {
    return this.component.props;
  }
}
