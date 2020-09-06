import * as R from 'ramda';

import {
  CRON_ALL_DAYS_OF_MONTH_VALUES,
  CRON_ALL_DAYS_OF_WEEK_VALUES,
  CRON_ALL_HOURS_VALUES,
  CRON_ALL_MINUTES_VALUES,
  CRON_ALL_MONTHS_OF_YEAR_VALUES,
  CRON_ALL_VALUES_SYMBOL,
  CRON_ALL_YEARS_VALUES,
  CRON_LAST_DAY_OF_MONTH,
  CRON_LAST_DAY_SYMBOL,
  CRON_NEVER_EXECUTABLE_SYMBOL,
  CRON_PART_TYPE_RANGES,
  CRON_PART_TYPE_RANGES_VALUES,
  CronPartTypesEnum,
  CronPeriodsEnum,
  ICronEntity,
  ICronPlainEntity,
} from '../definition';
import { getNumberConverter } from '../di/di.services';
import { TypeUtils } from './type';
import { isObjectNotEmpty } from './object';
import { join } from './join';
import {
  NUMBER_COMPARATOR,
  VALUE_ASC_SORTER_FN,
  VALUE_DESC_SORTER,
} from './sort';
import { orNull } from './cond';
import { StringNumberT } from '../definitions.interface';

// Examples:
//   1) * * * * * *
//      Each minute
//
//   2) */10 9-17 1 * *
//      At every 10th minute past every hour from 9 through 17 on day-of-month 1
//
//   3) */10,*/2,1-2 9-17 1 * *
//      At every 10th minute, every 2nd minute, and every minute from 1 through 2 past
//      every hour from 9 through 17 on day-of-month 1
//
//   4)  1-59/2 * * * *
//       At every 2nd minute from 1 through 59 ("Выполняется по нечётным минутам")
//
//   5)  * * * * 2L,4L
//       Every minute of the last Tuesday and Thursday of the month.
//
//   6)  0 0 26,27,31 * 2L,4L
//       At 00:00 on day-of-month 26, 27, and 31 if are the last Tuesday and Thursday of every month (intersection of dates).
//       For example:
//       "2019-12-26T00:00:00+00:00"
//       "2019-12-31T00:00:00+00:00"
//       "2020-02-27T00:00:00+00:00"
//       "2020-03-26T00:00:00+00:00"
//       "2020-03-31T00:00:00+00:00"
//
//   7)  0 0 L * *
//       The last day of the month.
//

/**
 * @stable [15.11.2019]
 *
 *  * * * * * * *
 *  | | | | | |
 *  | | | | | +-- Year              (range: 1900-3000)
 *  | | | | +---- Day of the Week   (range: 0-6 (Sunday to Saturday))
 *  | | | +------ Month of the Year (range: 1-12)
 *  | | +-------- Day of the Month  (range: 1-31)
 *  | +---------- Hour              (range: 0-23)
 *  +------------ Minute            (range: 0-59)
 *
 *  Last days:
 *  Also, one other character is sometimes available to the DoM and DoW parameters: L. It is used differently for each
 *  parameter, however.
 *  - For DoM, a lone “L” means the last day of the month.
 *  - For DoW, the “L” is added to the day number to indicate the last day of the month. For example, “1L” would indicate
 *    the last Monday of the month.
 *
 * @param {string} expression
 * @param {Date} from
 * @param {Date} to
 * @returns {ICronEntity}
 */
export const fromCronExpression = (expression?: string,
                                   from?: Date,
                                   to?: Date): ICronPlainEntity =>
  CronEntity.newInstance()
    .withDateFrom(from)
    .withDateTo(to)
    .fromExpression(expression)
    .asPlainObject();

/**
 * @stable [15.12.2019]
 * @param {number[]} values
 * @param {CronPartTypesEnum} partType
 * @param {boolean} returnNeverExecutablePeriodAsEmptyValue
 * @returns {string}
 */
const toCronPart = (values: number[],
                    partType: CronPartTypesEnum,
                    returnNeverExecutablePeriodAsEmptyValue = false): string => {
  if (!isObjectNotEmpty(values)) {
    return returnNeverExecutablePeriodAsEmptyValue
      ? CRON_NEVER_EXECUTABLE_SYMBOL
      : CRON_ALL_VALUES_SYMBOL;   // We can't set never executable period
  }
  const areAllValuesSelected0 = areAllCronValuesSelected(values, partType);
  let result: StringNumberT[] = areAllValuesSelected0
    ? [CRON_ALL_VALUES_SYMBOL]
    : values;

  if (!areAllValuesSelected0) {
    switch (partType) {
      case CronPartTypesEnum.DAY_OF_MONTH:
        if (values.includes(CRON_LAST_DAY_OF_MONTH)) {
          const filteredValues = values.filter((v) => v !== CRON_LAST_DAY_OF_MONTH);
          if (R.isEmpty(filteredValues)) {
            result = [CRON_LAST_DAY_SYMBOL];
          } else {
            result = [...filteredValues, CRON_LAST_DAY_SYMBOL];
          }
        }
        break;
      case CronPartTypesEnum.DAY_OF_WEEK:
        const lastDays = R
          .sort<number>(VALUE_DESC_SORTER, values.filter((v) => v < 0))
          .map((v) => `${toCronLastDayOfWeek(v)}${CRON_LAST_DAY_SYMBOL}`);
        const positiveDays = values.filter((v) => v >= 0);
        result = [
          ...positiveDays,
          ...lastDays
        ];
        break;
    }
  }
  return join(tryingToPack(result), ',');
};

/**
 * @stable [14.12.2019]
 * @param {number} v
 * @returns {number}
 */
const toCronLastDayOfWeek = (v: number): number => v * -1 - 1;

/**
 * @stable [15.11.2019]
 * @param {string} cronPart
 * @param {CronPartTypesEnum} partType
 * @param {Date} from
 * @param {Date} to
 * @returns {number[]}
 */
const fromCronPart = (cronPart: string,
                      partType: CronPartTypesEnum,
                      from: Date,
                      to: Date): number[] => {
  if (!isObjectNotEmpty(cronPart)) {
    return [];
  }
  const nc = getNumberConverter();
  const availableRanges = CRON_PART_TYPE_RANGES[partType];

  const values = [];
  cronPart.replace(/ /g, '').split(',').forEach((item) => {
    const repeatingParts = item.split('/');
    const ranges = repeatingParts[0].split('-');
    if (ranges[0] === CRON_NEVER_EXECUTABLE_SYMBOL) {
      return;
    }
    const period = orNull(repeatingParts.length > 1, () => nc.number(repeatingParts[1]) as number);
    /**/
    const lastDaysParts = item.split(CRON_LAST_DAY_SYMBOL);
    const lastDay = orNull(lastDaysParts.length > 1, () => {
      const lastDayPart = lastDaysParts[0];
      return R.isEmpty(lastDayPart)
        ? CRON_LAST_DAY_OF_MONTH // For LDoM
        : toCronLastDayOfWeek(nc.number(lastDayPart) as number); // For LDoW
    });
    /**/
    if (!R.isNil(lastDay)) {
      values.push(lastDay);
    } else {
      const isFullPeriod = ranges[0] === CRON_ALL_VALUES_SYMBOL;
      const start = isFullPeriod ? availableRanges[0] : nc.number(ranges[0]) as number;
      const end = isFullPeriod ? availableRanges[1] : (ranges.length > 1 ? nc.number(ranges[1]) : start);
      const isPeriodPresent = TypeUtils.isNumber(period);

      let j = start;
      for (let i = start; i <= end; i++) {
        if (isPeriodPresent) {
          if (i === start || i === j) {
            values.push(i);
            j += period;
          }
        } else {
          values.push(i);
        }
      }
    }
  });
  return Array.from(new Set(values)).sort(NUMBER_COMPARATOR);
};

/**
 * @stable [14.12.2019]
 * @param {number[]} parts
 * @param {CronPartTypesEnum} partType
 * @returns {boolean}
 */
const areAllCronValuesSelected = (parts: number[], partType: CronPartTypesEnum): boolean => {
  const availableValues = CRON_PART_TYPE_RANGES_VALUES[partType];
  return R.intersection(parts, availableValues).length === availableValues.length;
};

/**
 * @stable [14.12.2019]
 * @param {StringNumberT[]} values
 * @returns {StringNumberT[]}
 */
const tryingToPack = (values: StringNumberT[]): StringNumberT[] => {
  const ranges: StringNumberT[][] = [];
  let range: StringNumberT[] = [];
  values.forEach((value) => {
    if (TypeUtils.isNumber(value)) {
      if (R.isEmpty(range)) {
        range = [value];
        ranges.push(range);
      } else {
        if (R.equals((R.last(range) as number) + 1, value)) {
          range.push(value);
        } else {
          range = [value];
          ranges.push(range);
        }
      }
    } else {
      ranges.push([value]);
      range = [];
    }
  });

  let result = [];
  ranges.forEach((range0) => {
    if (range0.length <= 2) {
      result = [
        ...result,
        ...range0
      ];
    } else {
      result = [
        ...result,
        `${range0[0]}-${R.last(range0)}`
      ];
    }
  });
  return result;
};

/**
 * @stable [14.12.2019]
 */
export class CronEntity implements ICronEntity {
  public static newInstance(): CronEntity {
    return new CronEntity();
  }

  public daysOfMonths = CRON_ALL_DAYS_OF_MONTH_VALUES;
  public daysOfWeeks = CRON_ALL_DAYS_OF_WEEK_VALUES;
  public hours = CRON_ALL_HOURS_VALUES;
  public minutes = CRON_ALL_MINUTES_VALUES;
  public months = CRON_ALL_MONTHS_OF_YEAR_VALUES;
  public years = CRON_ALL_YEARS_VALUES;
  public allDaysOfMonth = true;
  public allDaysOfWeek  = true;
  public allHours  = true;
  public allMinutes = true;
  public allMonths = true;
  public allYears = true;

  private expression: string;
  private from: Date;
  private to: Date;

  /**
   * @stable [15.12.2019]
   * @param {Date} to
   * @returns {CronEntity}
   */
  public withDateTo(to: Date): CronEntity {
    this.to = to;
    return this;
  }

  /**
   * @stable [15.12.2019]
   * @param {Date} from
   * @returns {CronEntity}
   */
  public withDateFrom(from: Date): CronEntity {
    this.from = from;
    return this;
  }

  /**
   * @stable [15.12.2019]
   * @param {string} expression
   * @returns {CronEntity}
   */
  public fromExpression(expression?: string): ICronEntity {
    if (!isObjectNotEmpty(expression)) {
      return this
        .withMinutes()
        .withHours()
        .withMonths()
        .withYears()
        .withDaysOfMonths()
        .withDaysOfWeeks();
    }
    this.expression = expression;
    const parts = expression.replace(/ {2,}/g, ' ').split(' ');
    return this
      .withMinutes(...fromCronPart(parts[0], CronPartTypesEnum.MINUTE, this.from, this.to))
      .withHours(...fromCronPart(parts[1], CronPartTypesEnum.HOUR, this.from, this.to))
      .withMonths(...fromCronPart(parts[3], CronPartTypesEnum.MONTH_OF_YEAR, this.from, this.to))
      .withYears(...fromCronPart(parts[5], CronPartTypesEnum.YEAR, this.from, this.to))
      .withDaysOfMonths(...fromCronPart(parts[2], CronPartTypesEnum.DAY_OF_MONTH, this.from, this.to))
      .withDaysOfWeeks(...fromCronPart(parts[4], CronPartTypesEnum.DAY_OF_WEEK, this.from, this.to));
  }

  /**
   * @stable [15.12.2019]
   * @param {boolean} returnNeverExecutablePeriodAsEmptyValue
   * @returns {string}
   */
  public toExpression(returnNeverExecutablePeriodAsEmptyValue?: boolean): string {
    return join([
      toCronPart(this.minutes, CronPartTypesEnum.MINUTE, returnNeverExecutablePeriodAsEmptyValue),
      toCronPart(this.hours, CronPartTypesEnum.HOUR, returnNeverExecutablePeriodAsEmptyValue),
      toCronPart(this.daysOfMonths, CronPartTypesEnum.DAY_OF_MONTH, returnNeverExecutablePeriodAsEmptyValue),
      toCronPart(this.months, CronPartTypesEnum.MONTH_OF_YEAR, returnNeverExecutablePeriodAsEmptyValue),
      toCronPart(this.daysOfWeeks, CronPartTypesEnum.DAY_OF_WEEK, returnNeverExecutablePeriodAsEmptyValue),
      toCronPart(this.years, CronPartTypesEnum.YEAR, returnNeverExecutablePeriodAsEmptyValue)
    ], ' ');
  }

  /**
   * @stable [14.12.2019]
   * @returns {ICronPlainEntity}
   */
  public asPlainObject(): ICronPlainEntity {
    return {
      allDaysOfMonth: this.allDaysOfMonth,
      allDaysOfWeek: this.allDaysOfWeek,
      allHours: this.allHours,
      allMinutes: this.allMinutes,
      allMonths: this.allMonths,
      allYears: this.allYears,
      daysOfMonths: this.daysOfMonths,
      daysOfWeeks: this.daysOfWeeks,
      hours: this.hours,
      minutes: this.minutes,
      months: this.months,
      years: this.years,
    };
  }

  /**
   * @stable [19.12.2019]
   * @returns {CronPeriodsEnum}
   */
  public asPeriodType(): CronPeriodsEnum {
    if (this.minutes.length === 1 && this.hours.length === 1) {
      if (this.daysOfMonths.length === 1 && this.months.length === 1) {
        if (this.years.length === 1) {
          return CronPeriodsEnum.NO_REPETITIONS;
        }
        return CronPeriodsEnum.YEARLY;
      }
      if (this.allYears && this.allMonths) {
        if (!this.allDaysOfMonth) {
          return CronPeriodsEnum.MONTHLY;
        } else if (!this.allDaysOfWeek) {
          return CronPeriodsEnum.WEEKLY;
        }
        return CronPeriodsEnum.DAILY;
      }
    }
    return CronPeriodsEnum.COMPLEX_RULE;
  }

  /**
   * @stable [14.12.2019]
   * @param {number} values
   * @returns {CronEntity}
   */
  public withMonths(...values: number[]): CronEntity {
    this.months = this.normalize(values);
    this.refreshAllMonths();
    return this;
  }

  /**
   * @stable [14.12.2019]
   * @param {number} values
   * @returns {CronEntity}
   */
  public withYears(...values: number[]): CronEntity {
    this.years = this.normalize(values);
    this.refreshAllYears();
    return this;
  }

  /**
   * @stable [14.12.2019]
   * @param {number} values
   * @returns {CronEntity}
   */
  public withMinutes(...values: number[]): CronEntity {
    this.minutes = this.normalize(values);
    this.refreshAllMinutes();
    return this;
  }

  /**
   * @stable [14.12.2019]
   * @param {number} values
   * @returns {CronEntity}
   */
  public withHours(...values: number[]): CronEntity {
    this.hours = this.normalize(values);
    this.refreshAllHours();
    return this;
  }

  /**
   * @stable [14.12.2019]
   * @param {number} values
   * @returns {CronEntity}
   */
  public withDaysOfWeeks(...values: number[]): CronEntity {
    this.daysOfWeeks = this.normalize(values);
    this.refreshAllDaysOfWeek();
    return this;
  }

  /**
   * @stable [14.12.2019]
   * @param {number} values
   * @returns {CronEntity}
   */
  public withLastDaysOfWeeks(...values: number[]): CronEntity {
    this.daysOfWeeks = this.normalize(values.map((v) => toCronLastDayOfWeek(v)));
    this.refreshAllDaysOfWeek();
    return this;
  }

  /**
   * @stable [14.12.2019]
   * @param {number} values
   * @returns {CronEntity}
   */
  public withDaysOfMonths(...values: number[]): CronEntity {
    this.daysOfMonths = this.normalize(values);
    this.refreshAllDaysOfMonth();
    return this;
  }

  /**
   * @stable [14.12.2019]
   * @param {number[]} extraValues
   * @returns {CronEntity}
   */
  public withLastDayOfMonth(...extraValues: number[]): CronEntity {
    this.daysOfMonths = this.normalize([
      CRON_LAST_DAY_OF_MONTH,
      ...extraValues
    ]);
    this.refreshAllDaysOfMonth();
    return this;
  }

  /**
   * @stable [15.12.2019]
   * @param {number} value
   * @returns {boolean}
   */
  public hasDayOfMonth(value: number): boolean {
    return this.daysOfMonths.includes(value);
  }

  /**
   * @stable [15.12.2019]
   * @param {number} value
   * @returns {boolean}
   */
  public hasDayOfWeek(value: number): boolean {
    return this.daysOfWeeks.includes(value);
  }

  /**
   * @stable [15.12.2019]
   * @param {number} values
   * @returns {CronEntity}
   */
  public addDaysOfMonths(...values: number[]): CronEntity {
    this.withDaysOfMonths(...this.daysOfMonths, ...values);
    return this;
  }

  /**
   * @stable [15.12.2019]
   * @param {number} values
   * @returns {CronEntity}
   */
  public addDaysOfWeeks(...values: number[]): CronEntity {
    this.withDaysOfWeeks(...this.daysOfWeeks, ...values);
    return this;
  }

  /**
   * @stable [15.12.2019]
   * @param {number} values
   * @returns {CronEntity}
   */
  public excludeDaysOfMonths(...values: number[]): CronEntity {
    this.daysOfMonths = this.excludeValues(this.daysOfMonths, ...values);
    this.refreshAllDaysOfMonth();
    return this;
  }

  /**
   * @stable [15.12.2019]
   * @param {number} values
   * @returns {CronEntity}
   */
  public excludeDaysOfWeeks(...values: number[]): CronEntity {
    this.daysOfWeeks = this.excludeValues(this.daysOfWeeks, ...values);
    this.refreshAllDaysOfWeek();
    return this;
  }

  /**
   * @stable [15.12.2019]
   * @param {number[]} values
   * @param {number[]} excludedValues
   * @returns {number[]}
   */
  private excludeValues(values: number[], ...excludedValues: number[]): number[] {
    return this.normalize(R.filter((day) => !excludedValues.includes(day), values));
  }

  /**
   * @stable [14.12.2019]
   * @param {number} values
   * @returns {CronEntity}
   */
  private normalize(values: number[]): number[] {
    return R.sort(VALUE_ASC_SORTER_FN, Array.from(new Set(values)));
  }

  /**
   * @stable [14.12.2019]
   */
  private refreshAllDaysOfWeek(): void {
    this.allDaysOfWeek = areAllCronValuesSelected(this.daysOfWeeks, CronPartTypesEnum.DAY_OF_WEEK);
  }

  /**
   * @stable [14.12.2019]
   */
  private refreshAllDaysOfMonth(): void {
    this.allDaysOfMonth = areAllCronValuesSelected(this.daysOfMonths, CronPartTypesEnum.DAY_OF_MONTH);
  }

  /**
   * @stable [14.12.2019]
   */
  private refreshAllHours(): void {
    this.allHours = areAllCronValuesSelected(this.hours, CronPartTypesEnum.HOUR);
  }

  /**
   * @stable [14.12.2019]
   */
  private refreshAllMinutes(): void {
    this.allMinutes = areAllCronValuesSelected(this.minutes, CronPartTypesEnum.MINUTE);
  }

  /**
   * @stable [14.12.2019]
   */
  private refreshAllYears(): void {
    this.allYears = areAllCronValuesSelected(this.years, CronPartTypesEnum.YEAR);
  }

  /**
   * @stable [14.12.2019]
   */
  private refreshAllMonths(): void {
    this.allMonths = areAllCronValuesSelected(this.months, CronPartTypesEnum.MONTH_OF_YEAR);
  }
}
