import * as R from 'ramda';

import {
  UNDEF,
  UNDEF_SYMBOL,
} from '../definitions.interface';
import { ConditionUtils } from './cond';

/**
 * @stable [02.03.2019]
 * @param {number} hour
 * @param {string} pm
 * @param {string} am
 * @returns {string}
 */
export const asUSATime = (hour: number,
                          pm = ' PM',
                          am = ' AM'): string =>
  hour > 12 ? `${hour - 12}${pm}` : (hour === 12 ? `12${pm}` : `${hour}${am}`);

/**
 * @stable [20.03.2021]
 * @param time
 */
const normalizeTime = (time: string): string => `${time.length > 1 ? time : ['0', time].join('')}`;

/**
 * @stable [20.03.2021]
 * @param time
 */
const timeAtMinutesAsString = (time: number): string => {
  if (R.isNil(time)) {
    return time;
  }
  const minutes = String(Math.floor(time / 60));
  const seconds = String(time % 60);

  return `${normalizeTime(minutes)}:${normalizeTime(seconds)}`;
};

/**
 * @stable [20.03.2021]
 * @param time1
 * @param time2
 */
const asDiffAtSeconds = (time1: string, time2: string): number => {
  if (R.isNil(time1) || R.isNil(time2)) {
    return UNDEF;
  }
  const d1 = new Date(`01/01/2018 ${time1}`);
  const d2 = new Date(`01/01/2018 ${time2}`);

  return Math.abs(d2.getTime() - d1.getTime()) / 1000;
};

/**
 * @stable [20.03.2021]
 * @param time1
 * @param time2
 */
const asDiffAtMinutes = (time1: string, time2: string = '00:00'): number =>
  ConditionUtils.ifNotNilThanValue(
    asDiffAtSeconds(time1, time2),
    (diffAtSeconds) => diffAtSeconds / 60,
    UNDEF_SYMBOL
  );

/**
 * @stable [20.03.2021]
 */
export class TimeUtils {
  public static readonly asDiffAtMinutes = asDiffAtMinutes;
  public static readonly timeAtMinutesAsString = timeAtMinutesAsString;
}
