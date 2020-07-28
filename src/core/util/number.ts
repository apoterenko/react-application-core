import {
  ONE_DOLLAR_VALUE,
} from '../definitions.interface';
import { DefaultEntities } from '../definition/default-definition.interface';

/**
 * @stable [24.07.2020]
 * @param num
 * @param precision
 */
const roundByPrecision = (num: number, precision = DefaultEntities.CURRENCY_PRECISION_VALUE): number =>
  Number(`${Math.round(Number(`${num}e${precision}`))}e-${precision}`);

/**
 * @stable [05.05.2019]
 * @param {number} num
 * @param {number} divider
 * @returns {number}
 */
export const roundDownByDivider = (num: number, divider: number): number =>
  Math.floor(num - num % divider);

/**
 * @stable [24.07.2020]
 * @param num
 */
const invert = (num: number): number => num === 0 ? num : num * -1; // To exclude the "-0" case

/**
 * @stable [24.07.2020]
 * @param num
 * @param precision
 */
const invertCurrency = (num: number, precision = DefaultEntities.CURRENCY_PRECISION_VALUE): number =>
  invert(roundByPrecision(num, precision));

/**
 * @stable [26.06.2019]
 * @param {number} value
 * @param {number} total
 * @returns {number}
 */
export const percent = (value: number, total: number): number => total === 0 ? 0 : (value * 100) / total;

/**
 * @stable [12.09.2019]
 * @param {number} value
 * @param {number} total
 * @returns {number}
 */
export const proportion = (value: number, total: number) => (value * total) / 100;

/**
 * @stable [12.09.2019]
 * @param {number} value
 * @param {number} total
 * @returns {number}
 */
export const residueRoundDownByDivider = (value: number, total: number): number => total - roundDownByDivider(total, value);

/**
 * @stable [12.09.2019]
 * @param {number} value
 * @param {number} total
 * @param {number} offValue
 * @returns {number}
 */
export const roundedProportion = (value: number, total: number, offValue = ONE_DOLLAR_VALUE): number => {
  const result0 = proportion(value, total);
  return result0 + residueRoundDownByDivider(offValue, total - result0);
};

/**
 * @stable [12.09.2019]
 * @param {number} value
 * @param {number} total
 * @param {number} offValue
 * @param {number} precisionValue
 * @returns {number}
 */
export const roundedByPrecisionProportion = (value: number,
                                             total: number,
                                             offValue = ONE_DOLLAR_VALUE,
                                             precisionValue = DefaultEntities.CURRENCY_PRECISION_VALUE): number =>
  roundByPrecision(roundedProportion(value, total, offValue), precisionValue);

/**
 * @stable [29.06.2020]
 */
export class NumberUtils {
  public static readonly invert = invert;
  public static readonly invertCurrency = invertCurrency;
  public static readonly roundByPrecision = roundByPrecision;
}
