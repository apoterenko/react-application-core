/**
 * @stable [05.05.2019]
 * @param {number} num
 * @param {number} precision
 * @returns {number}
 */
export const roundByPrecision = (num: number, precision = 2): number =>
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
export const invertCurrency = (num: number, precision = 2): number => {
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
 * @stable [26.06.2019]
 * @param {number} value
 * @param {number} total
 * @returns {number}
 */
export const roundedProportion = (value: number, total: number): number => Math.round(proportion(value, total));
