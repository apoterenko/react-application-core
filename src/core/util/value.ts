/**
 * @stable [27.03.2020]
 * @param {boolean} value
 * @returns {boolean}
 */
export const $isValid = (value: boolean): boolean => value !== false;

/**
 * @stable [27.03.2020]
 * @param {boolean} value
 * @returns {boolean}
 */
export const $areEffectsPrevented = (value: boolean): boolean => value === true;
