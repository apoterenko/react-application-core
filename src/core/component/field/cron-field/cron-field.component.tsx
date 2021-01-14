import * as React from 'react';
import * as R from 'ramda';

import {
  ClsUtils,
  ConditionUtils,
  CronEntity,
  PropsUtils,
  TypeUtils,
} from '../../../util';
import { Field } from '../field/field.component';
import {
  CRON_ALL_DAYS_OF_MONTH_VALUES,
  CRON_ALL_DAYS_OF_WEEK_VALUES,
  CronFieldClassesEnum,
  CronPeriodsEnum,
  ICalendarDayEntity,
  ICalendarEntity,
  ICronEntity,
  ICronFieldProps,
} from '../../../definition';
import { Calendar } from '../../calendar';

/**
 * @component-impl
 * @stable [28.12.2020]
 */
export class CronField extends Field<ICronFieldProps> {

  /**
   * @stable [28.12.2020]
   */
  public static readonly defaultProps = PropsUtils.mergeWithParentDefaultProps<ICronFieldProps>({
    period: CronPeriodsEnum.MONTHLY,
    returnNeverExecutablePeriodAsEmptyValue: true,
    type: 'hidden',
  }, Field);

  /**
   * @stable [28.12.2020]
   */
  private static readonly DEFAULT_VALUES_FACTORIES: Record<number, (returnNeverExecutablePeriodAsEmptyValue: boolean) => string> =
    {
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

  /**
   * @stable [28.12.2020]
   * @param originalProps
   */
  constructor(originalProps: ICronFieldProps) {
    super(originalProps);

    this.getCalendarCellElement = this.getCalendarCellElement.bind(this);
    this.onDaySelect = this.onDaySelect.bind(this);
  }

  /**
   * @stable [28.12.2020]
   * @param value
   * @protected
   */
  protected isValueDefined(value: string): boolean {
    return !R.isNil(value);
  }

  /**
   * @stable [15.12.2019]
   * @returns {string}
   */
  protected get defaultValue(): string {
    const {
      defaultValue,
      period,
    } = this.originalProps;

    return TypeUtils.isDef(defaultValue)
      ? defaultValue
      : (
        ConditionUtils.ifNotNilThanValue(
          CronField.DEFAULT_VALUES_FACTORIES[period],
          (factory) => factory(this.returnNeverExecutablePeriodAsEmptyValue),
          defaultValue
        )
      );
  }

  /**
   * @stable [28.12.2020]
   * @protected
   */
  protected get inputAttachmentElement(): JSX.Element {
    const cronEntity = this.newCronEntity;
    return (
      <Calendar
        showOnlyCurrentDays={true}
        selectedDays={this.days.filter((day) => this.isDaySelected(cronEntity, day))}
        className={CronFieldClassesEnum.CALENDAR}
        gridConfiguration={{
          wrapperClassName: CronFieldClassesEnum.CALENDAR_WRAPPER,
        }}
        calendarEntity={this.calendarEntity}
        renderer={this.getCalendarCellElement}
        onSelect={this.onDaySelect}/>
    );
  }

  /**
   * @stable [28.12.2020]
   * @protected
   */
  protected getFieldClassName(): string {
    return ClsUtils.joinClassName(
      super.getFieldClassName(),
      CronFieldClassesEnum.CRON_FIELD
    );
  }

  /**
   * @stable [28.12.2020]
   * @param calendarDayEntity
   * @private
   */
  private onDaySelect(calendarDayEntity: ICalendarDayEntity): void {
    const {
      cronDay,
      day,
    } = calendarDayEntity;
    const {
      period,
    } = this.originalProps;

    const cronEntity = this.newCronEntity;

    switch (period) {
      case CronPeriodsEnum.WEEKLY:
        if (cronEntity.hasDayOfWeek(cronDay)) {
          cronEntity.excludeDaysOfWeeks(cronDay);
        } else {
          cronEntity.addDaysOfWeeks(cronDay);
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
    this.onChangeManually(
      cronEntity.toExpression(this.returnNeverExecutablePeriodAsEmptyValue)
    );
  }

  /**
   * @stable [28.12.2020]
   * @private
   */
  private get returnNeverExecutablePeriodAsEmptyValue(): boolean {
    return this.originalProps.returnNeverExecutablePeriodAsEmptyValue;
  }

  /**
   * @stable [28.12.2020]
   * @param entity
   * @param day
   * @private
   */
  private isDaySelected(entity: ICronEntity, day: number): boolean {
    switch (this.originalProps.period) {
      case CronPeriodsEnum.WEEKLY:
        return entity.hasDayOfWeek(this.dc.asCronDay({index: day, isoWeek: this.isoWeek}));
    }
    return entity.hasDayOfMonth(day);
  }

  /**
   * @stable [28.12.2020]
   * @param weekDayEntity
   * @private
   */
  private getCalendarCellElement(weekDayEntity: ICalendarDayEntity): JSX.Element {
    const {
      date,
      day,
    } = weekDayEntity;

    return (
      <React.Fragment>
        {
          date
            ? date.getDate()
            : this.dc.getWeekdayShortest({index: day, isoWeek: this.isoWeek})
        }
      </React.Fragment>
    );
  }

  /**
   * @stable [28.12.2020]
   * @private
   */
  private get calendarEntity(): ICalendarEntity {
    switch (this.originalProps.period) {
      case CronPeriodsEnum.WEEKLY:
        return this.dc.asCalendarWeekEntity({isoWeek: this.isoWeek});
    }
    return null;
  }

  /**
   * @stable [28.12.2020]
   * @private
   */
  private get days(): number[] {
    switch (this.originalProps.period) {
      case CronPeriodsEnum.WEEKLY:
        return CRON_ALL_DAYS_OF_WEEK_VALUES;
    }
    return CRON_ALL_DAYS_OF_MONTH_VALUES;
  }

  /**
   * @stable [28.12.2020]
   * @private
   */
  private get newCronEntity(): ICronEntity {
    return CronEntity.newInstance().fromExpression(this.value);
  }

  /**
   * @stable [28.12.2020]
   * @private
   */
  private get isoWeek(): boolean {
    return this.originalProps.isoWeek;
  }
}
