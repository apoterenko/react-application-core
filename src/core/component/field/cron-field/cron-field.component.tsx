import * as React from 'react';
import * as R from 'ramda';

import { ICronFieldProps } from './cron-field.interface';
import {
  CronEntity,
  ifNotNilThanValue,
  isDef,
  joinClassName,
  makeArray,
} from '../../../util';
import { Field } from '../field/field.component';
import {
  CRON_ALL_DAYS_OF_MONTH_VALUES,
  CRON_ALL_DAYS_OF_WEEK_VALUES,
  CronPeriodsEnum,
  ICalendarDayEntity,
  ICalendarEntity,
  ICalendarWeekEntity,
  ICronEntity,
} from '../../../definition';
import { Calendar } from '../../calendar';

export class CronField extends Field<ICronFieldProps> {

  public static readonly defaultProps: ICronFieldProps = {
    period: CronPeriodsEnum.MONTHLY,
    returnNeverExecutablePeriodAsEmptyValue: true,
    type: 'hidden',
  };

  private static readonly DEFAULT_VALUES_FACTORIES: Record<number, (returnNeverExecutablePeriodAsEmptyValue: boolean) => string> = {
    [CronPeriodsEnum.MONTHLY]: (returnNeverExecutablePeriodAsEmptyValue: boolean): string =>
      CronEntity.newInstance()
        .withMinutes(0)
        .withHours(0)
        .withDaysOfMonths()
        .toExpression(returnNeverExecutablePeriodAsEmptyValue),
    [CronPeriodsEnum.WEEKLY]: (returnNeverExecutablePeriodAsEmptyValue: boolean): string =>
      CronEntity.newInstance()
        .withMinutes(0)
        .withHours(0)
        .withDaysOfWeeks()
        .toExpression(returnNeverExecutablePeriodAsEmptyValue),
  };
  private static readonly DEFAULT_WEEKLY_DAYS: ICalendarWeekEntity[] = [{
    id: 0,
    ...R.mergeAll(makeArray(7).map((_, index): ICalendarWeekEntity => ({[index]: {current: true, value: index}}))),
  }];

  /**
   * @stable [04.01.2020]
   * @param {ICronFieldProps} props
   */
  constructor(props: ICronFieldProps) {
    super(props);

    this.onDaySelect = this.onDaySelect.bind(this);
    this.getCalendarCellElement = this.getCalendarCellElement.bind(this);
  }

  /**
   * @stable [15.12.2019]
   * @param {string} value
   * @returns {boolean}
   */
  protected isValueDefined(value: string): boolean {
    return !R.isNil(value);
  }

  /**
   * @stable [15.12.2019]
   * @returns {string}
   */
  protected get defaultValue(): string {
    const {defaultValue, period} = this.props;
    return isDef(defaultValue)
      ? defaultValue
      : (
        ifNotNilThanValue(
          CronField.DEFAULT_VALUES_FACTORIES[period],
          (factory) => factory(this.returnNeverExecutablePeriodAsEmptyValue),
          defaultValue
        )
      );
  }

  /**
   * @stable [03.01.2020]
   * @returns {JSX.Element}
   */
  protected getInputAttachmentElement(): JSX.Element {
    const cronEntity = this.newCronEntity;
    return (
      <div className='rac-cron-calendar-wrapper'>
        <Calendar
          showOnlyCurrentDays={true}
          selectedDays={this.days.filter((cronDay) => this.isDaySelected(cronEntity, cronDay))}
          className='rac-cron-calendar'
          calendarEntity={this.calendarEntity}
          renderer={this.getCalendarCellElement}
          onSelect={this.onDaySelect}/>
      </div>
    );
  }

  /**
   * @stable [15.12.2019]
   * @returns {string}
   */
  protected getFieldClassName(): string {
    return joinClassName(super.getFieldClassName(), 'rac-cron-field');
  }

  /**
   * @stable [03.01.2020]
   * @param {ICalendarDayEntity} calendarDayEntity
   */
  private onDaySelect(calendarDayEntity: ICalendarDayEntity): void {
    const day = calendarDayEntity.value;
    const cronEntity = this.newCronEntity;

    switch (this.props.period) {
      case CronPeriodsEnum.WEEKLY:
        if (cronEntity.hasDayOfWeek(day)) {
          cronEntity.excludeDaysOfWeeks(day);
        } else {
          cronEntity.addDaysOfWeeks(day);
        }
        break;
      case CronPeriodsEnum.MONTHLY:
        if (cronEntity.hasDayOfMonth(day)) {
          cronEntity.excludeDaysOfMonths(day);
        } else {
          cronEntity.addDaysOfMonths(day);
        }
        break;
    }
    this.onChangeManually(cronEntity.toExpression(this.returnNeverExecutablePeriodAsEmptyValue));
  }

  /**
   * @stable [15.12.2019]
   * @returns {ICronEntity}
   */
  private get newCronEntity(): ICronEntity {
    return CronEntity.newInstance().fromExpression(this.value);
  }

  /**
   * @stable [15.12.2019]
   * @returns {boolean}
   */
  private get returnNeverExecutablePeriodAsEmptyValue(): boolean {
    return this.props.returnNeverExecutablePeriodAsEmptyValue;
  }

  /**
   * @stable [15.12.2019]
   * @returns {number[]}
   */
  private get days(): number[] {
    switch (this.props.period) {
      case CronPeriodsEnum.WEEKLY:
        return CRON_ALL_DAYS_OF_WEEK_VALUES;
    }
    return CRON_ALL_DAYS_OF_MONTH_VALUES;
  }

  /**
   * @stable [15.12.2019]
   * @param {ICronEntity} entity
   * @param {number} cronDay
   * @returns {boolean}
   */
  private isDaySelected(entity: ICronEntity, cronDay: number): boolean {
    switch (this.props.period) {
      case CronPeriodsEnum.WEEKLY:
        return entity.hasDayOfWeek(cronDay);
    }
    return entity.hasDayOfMonth(cronDay);
  }

  /**
   * @stable [04.01.2020]
   * @param {ICalendarDayEntity} weekDayEntity
   * @returns {JSX.Element}
   */
  private getCalendarCellElement(weekDayEntity: ICalendarDayEntity): JSX.Element {
    return (
      <React.Fragment>
        {weekDayEntity.date ? weekDayEntity.date.getDate() : this.dc.getLocalizedShortestWeekday({index: weekDayEntity.value})}
      </React.Fragment>
    );
  }

  /**
   * @stable [04.01.2020]
   * @returns {ICalendarEntity}
   */
  private get calendarEntity(): ICalendarEntity {
    switch (this.props.period) {
      case CronPeriodsEnum.WEEKLY:
        return {
          days: CronField.DEFAULT_WEEKLY_DAYS,
          daysLabels: this.dc.getLocalizedShortestWeekdays(),
        };
    }
    return null;
  }
}
