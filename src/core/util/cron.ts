import {
  CRON_PART_TYPE_RANGES,
  CronPartTypesEnum,
  ICronEntity,
  ICronPartEntity,
} from '../definition';
import { getNumberConverter } from '../di/di.services';
import { isNumber } from './type';
import { isObjectNotEmpty } from './object';
import { NUMBER_COMPARATOR } from './sort';
import { orNull } from './cond';

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

/**
 * @stable [15.11.2019]
 *
 *  * * * * * * *
 *  | | | | | |
 *  | | | | | +-- Year              (range: 1900-3000)
 *  | | | | +---- Day of the Week   (range: 1-7, 1 standing for Monday)
 *  | | | +------ Month of the Year (range: 1-12)
 *  | | +-------- Day of the Month  (range: 1-31)
 *  | +---------- Hour              (range: 0-23)
 *  +------------ Minute            (range: 0-59)
 *
 * @param {string} expression
 * @param {Date} from
 * @param {Date} to
 * @returns {ICronEntity}
 */
export const fromCronExpression = (expression: string,
                                   from?: Date,
                                   to?: Date): ICronEntity => {
  if (!isObjectNotEmpty(expression)) {
    return {
      daysOfMonths: [],
      daysOfWeeks: [],
      hours: [],
      minutes: [],
      months: [],
      years: [],
    };
  }
  const parts = expression.replace(/ {2,}/g, ' ').split(' ');
  const minutesPart = parts[0];
  const hoursPart = parts[1];
  const daysOfMonthPart = parts[2];
  const monthsOfYearPart = parts[3];
  const daysOfWeekPart = parts[4];
  const yearsPart = parts[6];

  return {
    daysOfMonths: fromCronPart(daysOfMonthPart, CronPartTypesEnum.DAY_OF_MONTH, from, to),
    daysOfWeeks: fromCronPart(daysOfWeekPart, CronPartTypesEnum.DAY_OF_WEEK, from, to),
    hours: fromCronPart(hoursPart, CronPartTypesEnum.HOUR, from, to),
    minutes: fromCronPart(minutesPart, CronPartTypesEnum.MINUTE, from, to),
    months: fromCronPart(monthsOfYearPart, CronPartTypesEnum.MONTH_OF_YEAR, from, to),
    years: fromCronPart(yearsPart, CronPartTypesEnum.YEAR, from, to),
  };
};

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
  const useRealDates = isObjectNotEmpty(from) || isObjectNotEmpty(to);
  const nc = getNumberConverter();
  const availableRanges = CRON_PART_TYPE_RANGES[partType];

  const values = [];
  cronPart.replace(/ /g, '').split(',').forEach((item) => {
    const repeatingParts = item.split('/');
    const ranges = repeatingParts[0].split('-');
    const isRange = ranges.length > 1;
    const period = orNull(repeatingParts.length > 1, () => nc.number(repeatingParts[1]) as number);
    const isPeriodPresent = isNumber(period);
    const isFullPeriod = ranges[0] === '*';
    const start = isFullPeriod ? availableRanges[0] : nc.number(ranges[0]) as number;
    const end = isFullPeriod ? availableRanges[1] : (isRange ? nc.number(ranges[1]) : start);

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
  });
  return Array.from(new Set(values)).sort(NUMBER_COMPARATOR);
};

/**
 * @stable [15.11.2019]
 * @param {number} value
 * @param {CronPartTypesEnum} partType
 * @returns {boolean}
 */
const ifCronPartApplicable = (value: number, partType: CronPartTypesEnum): boolean => {
  const availableRanges = CRON_PART_TYPE_RANGES[partType];
  return value >= availableRanges[0] && value <= availableRanges[1];
};
