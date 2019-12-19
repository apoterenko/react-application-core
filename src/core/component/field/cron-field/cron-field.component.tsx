import * as React from 'react';
import * as R from 'ramda';

import { ICronFieldProps } from './cron-field.interface';
import {
  CronEntity,
  ifNotNilThanValue,
  isDef,
  joinClassName,
} from '../../../util';
import { Button } from '../../button';
import { Field } from '../field/field.component';
import {
  CRON_ALL_DAYS_OF_MONTH_VALUES,
  CRON_ALL_DAYS_OF_WEEK_VALUES,
  CronPeriodsEnum,
  ICronEntity,
} from '../../../definition';

export class CronField extends Field<ICronFieldProps> {
  public static readonly defaultProps: ICronFieldProps = {
    period: CronPeriodsEnum.MONTHLY,
    returnNeverExecutablePeriodAsEmptyValue: true,
    type: 'hidden',
  };

  private static readonly WEEK_DAYS_COUNT = 7;
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
  protected getDefaultValue(): string {
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
   * @stable [15.12.2019]
   * @returns {JSX.Element}
   */
  protected getInputAttachmentElement(): JSX.Element {
    const cronEntity = this.newCronEntity;
    return (
      <div className='rac-cron-days'>
        <div className='rac-cron-days-body'>
        {
          this.days.map((cronDay, index) => (
            <Button
              key={cronDay}
              rippled={false}
              className={joinClassName(
                'rac-cron-day-action',
                ((index + 1) % CronField.WEEK_DAYS_COUNT !== 0) && 'rac-cron-day-action-offset',
                this.isDaySelected(cronEntity, cronDay) && 'rac-cron-day-selected-action'
              )}
              onClick={() => this.onDaySelect(cronDay)}>
              {this.getDayDisplayValue(cronDay)}
            </Button>
          ))
        }
        </div>
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
   * @stable [15.12.2019]
   * @param {number} day
   */
  private onDaySelect(day: number): void {
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
   * @stable [16.12.2019]
   * @param {number} cronDay
   * @returns {React.ReactNode}
   */
  private getDayDisplayValue(cronDay: number): React.ReactNode {
    switch (this.props.period) {
      case CronPeriodsEnum.WEEKLY:
        return this.dc.getLocalizedWeekdayShortest(cronDay);
    }
    return cronDay;
  }
}
