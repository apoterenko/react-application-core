import * as R from 'ramda';

/**
 * @stable [15.11.2019]
 */
export enum CronPartTypesEnum {
  DAY_OF_MONTH,
  DAY_OF_WEEK,
  HOUR,
  MINUTE,
  MONTH_OF_YEAR,
  YEAR,
}

/**
 * @stable [15.12.2019]
 */
export enum CronPeriodsEnum {
  COMPLEX_RULE,
  DAILY,
  MONTHLY,
  NO_REPETITIONS,
  WEEKLY,
  YEARLY,
}

/**
 * @stable [14.12.2019]
 */
export const CRON_ALL_VALUES_SYMBOL = '*';
export const CRON_LAST_DAY_OF_MONTH = 0;
export const CRON_LAST_DAY_SYMBOL = 'L';
export const CRON_NEVER_EXECUTABLE_SYMBOL = 'N';

/**
 * @stable [15.11.2019]
 */
export const CRON_PART_TYPE_RANGES = Object.freeze<{[cronPartType: string]: number[]}>({
  [CronPartTypesEnum.MINUTE]: [0, 59],
  [CronPartTypesEnum.HOUR]: [0, 23],
  [CronPartTypesEnum.DAY_OF_MONTH]: [1, 31],  // 0 - The last day of month
  [CronPartTypesEnum.MONTH_OF_YEAR]: [1, 12],
  [CronPartTypesEnum.DAY_OF_WEEK]: [0, 6],    // -7 - The last Saturday of the month
                                              // -6 - The last Friday of the month
                                              // -5 - The last Thursday of the month
                                              // -4 - The last Wednesday of the month
                                              // -3 - The last Tuesday of the month
                                              // -2 - The last Monday of the month
                                              // -1 - The last Sunday of the month
                                              // 0 - Sunday
                                              // 6 - Saturday
  [CronPartTypesEnum.YEAR]: [1900, 2100],
});

/**
 * @stable [14.12.2019]
 */
export const CRON_PART_TYPE_RANGES_VALUES = Object.freeze<{ [cronPartType: string]: number[] }>(
  ((): { [cronPartType: string]: number[] } => {
    const result = Object.create(null);
    R.forEachObjIndexed((value, key) => {
      const allValues = [];
      for (let index = value[0]; index <= value[1]; index++) {
        allValues.push(index);
      }
      result[key] = allValues;
    }, CRON_PART_TYPE_RANGES);
    return result;
  })()
);

/**
 * @stable [14.12.2019]
 */
export const CRON_ALL_DAYS_OF_MONTH_VALUES = CRON_PART_TYPE_RANGES_VALUES[CronPartTypesEnum.DAY_OF_MONTH];
export const CRON_ALL_DAYS_OF_WEEK_VALUES = CRON_PART_TYPE_RANGES_VALUES[CronPartTypesEnum.DAY_OF_WEEK];
export const CRON_ALL_HOURS_VALUES = CRON_PART_TYPE_RANGES_VALUES[CronPartTypesEnum.HOUR];
export const CRON_ALL_MINUTES_VALUES = CRON_PART_TYPE_RANGES_VALUES[CronPartTypesEnum.MINUTE];
export const CRON_ALL_MONTHS_OF_YEAR_VALUES = CRON_PART_TYPE_RANGES_VALUES[CronPartTypesEnum.MONTH_OF_YEAR];
export const CRON_ALL_YEARS_VALUES = CRON_PART_TYPE_RANGES_VALUES[CronPartTypesEnum.YEAR];

/**
 * @stable [15.12.2019]
 */
export interface ICronPlainEntity {
  allDaysOfMonth?: boolean;
  allDaysOfWeek?: boolean;
  allHours?: boolean;
  allMinutes?: boolean;
  allMonths?: boolean;
  allYears?: boolean;
  daysOfMonths: number[];
  daysOfWeeks: number[];
  hours: number[];
  minutes: number[];
  months: number[];
  years: number[];
}

/**
 * @stable [15.11.2019]
 */
export interface ICronEntity<
    // @ts-ignore TODO
    TEntity extends ICronEntity = ICronEntity<TEntity>
  > extends ICronPlainEntity {
  addDaysOfMonths(...values: number[]): TEntity;
  addDaysOfWeeks(...values: number[]): TEntity;
  asPeriodType(): CronPeriodsEnum;
  asPlainObject(): ICronPlainEntity;
  excludeDaysOfMonths(...values: number[]): TEntity;
  excludeDaysOfWeeks(...values: number[]): TEntity;
  fromExpression(expression?: string): TEntity;
  hasDayOfMonth(value: number): boolean;
  hasDayOfWeek(value: number): boolean;
  toExpression(returnNeverExecutablePeriodAsEmptyValue?: boolean): string;
}
