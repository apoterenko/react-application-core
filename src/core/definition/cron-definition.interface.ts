import { ITypeWrapper } from '../definitions.interface';

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
 * @stable [15.11.2019]
 */
export const CRON_PART_TYPE_RANGES = Object.freeze<{[cronPartType: string]: number[]}>({
  [CronPartTypesEnum.MINUTE]: [0, 59],
  [CronPartTypesEnum.HOUR]: [0, 23],
  [CronPartTypesEnum.DAY_OF_MONTH]: [1, 31],
  [CronPartTypesEnum.MONTH_OF_YEAR]: [1, 12],
  [CronPartTypesEnum.DAY_OF_WEEK]: [0, 6],  // 0 - Sunday, 6 - Saturday
  [CronPartTypesEnum.YEAR]: [1900, 2100],
});

/**
 * @stable [15.11.2019]
 */
export interface ICronEntity {
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
export interface ICronPartEntity
  extends ITypeWrapper<CronPartTypesEnum> {
}
