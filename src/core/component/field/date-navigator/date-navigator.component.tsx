import * as React from 'react';

import { UNDEF } from '../../../definitions.interface';
import { DelayedTask, toClassName, defValuesFilter, calc, isFn, toType, orNull } from '../../../util';
import { DateField } from '../date-field';
import { FlexLayout } from '../../layout/flex';
import { Button } from '../../button';
import {
  IDateNavigatorProps,
  IDateNavigatorState,
  DateNavigatorTypeEnum,
  IDateNavigatorDisplayValuePayloadEntity,
} from './date-navigator.interface';

export class DateNavigator
  extends DateField<IDateNavigatorProps, IDateNavigatorState> { // Should be able to connect to a Form

  public static defaultProps: IDateNavigatorProps = {
    step: 1,
    pattern: 'D MMMM',
    type: DateNavigatorTypeEnum.DAY,
    time: false,
    preventFocus: true,
    full: false,
    errorMessageRendered: false,
    clearActionRendered: false,
    label: null,
  };

  private delayedTask: DelayedTask;

  /**
   * @stable [29.10.2018]
   * @param {IDateNavigatorProps} props
   */
  constructor(props: IDateNavigatorProps) {
    super(props);

    this.onLeft = this.onLeft.bind(this);
    this.onRight = this.onRight.bind(this);
    this.getDisplayValue = this.getDisplayValue.bind(this);
    this.state = {currentTime: this.settings.dateTime.currentDate};

    if (props.time) {
      this.delayedTask = new DelayedTask(this.doDelay.bind(this), 1000 * 10, true);
    }
  }

  /**
   * @stable [30.10.2018]
   */
  public componentDidMount(): void {
    super.componentDidMount();

    if (isFn(this.delayedTask)) {
      this.delayedTask.start();
    }
  }

  /**
   * @stable [30.10.2018]
   */
  public componentWillUnmount(): void {
    super.componentWillUnmount();

    if (isFn(this.delayedTask)) {
      this.delayedTask.stop();
    }
  }

  /**
   * @stable [08.01.2019]
   * @returns {JSX.Element}
   */
  public render(): JSX.Element {
    const props = this.props;
    return (
      <FlexLayout
        row={true}
        full={props.full}
        alignItemsCenter={true}
      >
        <Button
          icon='arrow_left'
          mini={true}
          onClick={this.onLeft}/>
        <DateField
          {...defValuesFilter({...this.props, type: UNDEF, step: UNDEF, pattern: UNDEF, time: UNDEF})}
          className={toClassName('rac-date-navigator', props.className)}
          format={this.getFieldFormat()}
          displayValue={this.getDisplayValue}/>
        <Button
          icon='arrow_right'
          mini={true}
          onClick={this.onRight}/>
        {
          orNull<JSX.Element>(
            props.time,
            () => (
              <FlexLayout
                row={true}
                alignItemsCenter={true}
                className='rac-date-navigator-clock'
              >
                {this.uiFactory.makeIcon('clock')}
                {this.dc.fromDateTimeToPstTime(this.state.currentTime)}
              </FlexLayout>
            )
          )
        }
      </FlexLayout>
    );
  }

  /**
   * @stable [07.01.2019]
   */
  private onLeft(): void {
    this.doManualChangeDate(-this.props.step);
  }

  /**
   * @stable [07.01.2019]
   */
  private onRight(): void {
    this.doManualChangeDate(this.props.step);
  }

  /**
   * @stable [07.01.2019]
   * @param {number} durationToAdd
   */
  private doManualChangeDate(durationToAdd: number): void {
    let nextValue;
    switch (this.props.type) {
      case DateNavigatorTypeEnum.DAY:
        nextValue = this.dc.tryAddXDays(durationToAdd, this.value, this.getFieldFormat());
        break;
      case DateNavigatorTypeEnum.MONTH:
        nextValue = this.dc.tryAddXMonths(durationToAdd, this.value, this.getFieldFormat());
        break;
    }
    this.onChangeManually(nextValue);
  }

  /**
   * @stable [30.10.2018]
   */
  private doDelay(): void {
    this.setState({currentTime: this.settings.dateTime.currentDate});
  }

  /**
   * @stable [07.01.2019]
   * @returns {string}
   */
  private getDisplayValue(): string {
    const props = this.props;
    let pattern = props.pattern;

    switch (props.type) {
      case DateNavigatorTypeEnum.MONTH:
        pattern = 'MMMM YYYY';
        break;
    }
    const formattedDisplayValue = this.dc.format(this.value, this.getFieldFormat(), pattern);
    return isFn(props.displayValue)
      ? calc(props.displayValue, toType<IDateNavigatorDisplayValuePayloadEntity>({
          displayValue: formattedDisplayValue, value: this.value, type: props.type, pattern,
        }))
      : formattedDisplayValue;
  }
}
