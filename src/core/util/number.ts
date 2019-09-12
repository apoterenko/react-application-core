import {
  DEFAULT_CURRENCY_PRECISION_VALUE,
  ONE_DOLLAR_VALUE,
} from '../definitions.interface';

/**
 * @stable [05.05.2019]
 * @param {number} num
 * @param {number} precision
 * @returns {number}
 */
export const roundByPrecision = (num: number, precision = DEFAULT_CURRENCY_PRECISION_VALUE): number =>
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
 * @stable [13.05.2019]
 * @param {number} num
 * @param {number} precision
 * @returns {number}
 */
export const invertCurrency = (num: number, precision = DEFAULT_CURRENCY_PRECISION_VALUE): number => {
  const result = roundByPrecision(num, precision); // To exclude the "-0" case
  return result === 0 ? result : result * -1;
};

/**
 * @stable [26.06.2019]
 * @param {number} value
 * @param {number} total
 * @returns {number}
 */
export const proportion = (value: number, total: number): number => total === 0 ? 0 : (value * 100) / total;

/**
 * @stable [12.09.2019]
 * @param {number} value
 * @param {number} total
 * @returns {number}
 */
export const percentValue = (value: number, total: number) => (value * total) / 100;

/**
 * @stable [26.06.2019]
 * @param {number} value
 * @param {number} total
 * @returns {number}
 */
export const roundedProportion = (value: number, total: number): number => Math.round(proportion(value, total));

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
export const percentRoundedValue = (value: number, total: number, offValue = ONE_DOLLAR_VALUE): number => {
  const result0 = percentValue(value, total);
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
export const percentRoundedByPrecisionValue = (value: number,
                                               total: number,
                                               offValue = ONE_DOLLAR_VALUE,
                                               precisionValue = DEFAULT_CURRENCY_PRECISION_VALUE): number =>
  roundByPrecision(percentRoundedValue(value, total, offValue), precisionValue);
