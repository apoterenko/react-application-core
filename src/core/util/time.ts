import * as R from 'ramda';

import {
  UNDEF,
  UNDEF_SYMBOL,
} from '../definitions.interface';
import { ConditionUtils } from './cond';

/**
 * @stable [03.04.2021]
 * @param time
 */
const normalizeTime = (time: string): string => `${time.length > 1 ? time : ['0', time].join('')}`;

/**
 * @stable [03.04.2021]
 * @param time
 */
const fromSecondsToMinutes = (time: number): number => Math.floor(time / 60);

/**
 * @stable [03.04.2021]
 * @param time
 */
const fromSecondsToMinutesAsString = (time: number): string => {
  if (R.isNil(time)) {
    return time;
  }
  const minutes = String(fromSecondsToMinutes(time));
  const seconds = String(time % 60);

  return `${normalizeTime(minutes)}:${normalizeTime(seconds)}`;
};

/**
 * @stable [03.04.2021]
 * @param hour
 * @param pm
 * @param am
 */
const fromHourToUsaHour = (hour: number,
                           pm = ' PM',
                           am = ' AM'): string =>
  hour > 12 ? `${hour - 12}${pm}` : (hour === 12 ? `12${pm}` : `${hour}${am}`);

/**
 * @stable [03.04.2021]
 * @param time1
 * @param time2
 */
const fromTimeToDiffAtSeconds = (time1: string, time2: string): number => {
  if (R.isNil(time1) || R.isNil(time2)) {
    return UNDEF;
  }
  const d1 = new Date(`01/01/2018 ${time1}`);
  const d2 = new Date(`01/01/2018 ${time2}`);

  return Math.abs(d2.getTime() - d1.getTime()) / 1000;
};

/**
 * @stable [03.04.2021]
 * @param time1
 * @param time2
 */
const fromTimeToDiffAtMinutes = (time1: string, time2: string = '00:00'): number =>
  ConditionUtils.ifNotNilThanValue(
    fromTimeToDiffAtSeconds(time1, time2),
    (diffAtSeconds) => diffAtSeconds / 60,
    UNDEF_SYMBOL
  );

/**
 * @utils
 * @stable [03.04.2021]
 */
export class TimeUtils {
  public static readonly fromHourToUsaHour = fromHourToUsaHour;
  public static readonly fromSecondsToMinutes = fromSecondsToMinutes;
  public static readonly fromSecondsToMinutesAsString = fromSecondsToMinutesAsString;
  public static readonly fromTimeToDiffAtMinutes = fromTimeToDiffAtMinutes;
}
