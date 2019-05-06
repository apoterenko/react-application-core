/**
 * @stable [05.05.2019]
 * @param {number} num
 * @param {number} precision
 * @returns {number}
 */
export const roundByPrecision = (num: number, precision = 2) =>
  Math.round(num * (10 * precision)) / (10 * precision);

/**
 * @stable [05.05.2019]
 * @param {number} num
 * @param {number} divider
 * @returns {number}
 */
export const roundDownByDivider = (num: number, divider: number): number =>
  Math.floor(num - num % divider);
