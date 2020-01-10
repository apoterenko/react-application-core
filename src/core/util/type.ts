import {
  AnyT,
} from '../definitions.interface';
import { REGEXP } from '../definition/settings-definition.interface';

/**
 * @stable [02.10.2019]
 * @param {AnyT} value
 * @returns {boolean}
 */
export const isDef = (value: AnyT): boolean => !isUndef(value);

/**
 * @stable [02.10.2019]
 * @param {AnyT} value
 * @returns {boolean}
 */
export const isUndef = (value: AnyT): boolean => typeof value === 'undefined';

/**
 * @stable [02.10.2019]
 * @param {AnyT} value
 * @returns {boolean}
 */
export const isFn = (value: AnyT): boolean => typeof value === 'function';

/**
 * @stable [01.08.2018]
 * @param {AnyT} value
 * @returns {boolean}
 */
export const isNumber = (value: AnyT): boolean => typeof value === 'number';

/**
 * @stable [06.12.2019]
 * @param {AnyT} value
 * @returns {boolean}
 */
export const isDigit = (value: AnyT): boolean => isNumber(value) && REGEXP.DIGITAL.test(String(value));

/**
 * @stable [01.08.2018]
 * @param {AnyT} value
 * @returns {boolean}
 */
export const isNumberLike = (value: AnyT): boolean => /^-?[0-9]\d*(\.\d+)?$/.test(String(value));

/**
 * @stable [06.12.2019]
 * @param {AnyT} value
 * @returns {boolean}
 */
export const isPriceLike = (value: AnyT): boolean => REGEXP.PRICE.test(String(value));

/**
 * @stable [06.12.2019]
 * @param {AnyT} value
 * @returns {boolean}
 */
export const isBoolean = (value: AnyT): boolean => typeof value === 'boolean';

/**
 * @stable [23.09.2019]
 * @param {AnyT} value
 * @returns {boolean}
 */
export const isString = (value: AnyT): boolean => typeof value === 'string';

/**
 * @stable [03.10.2019]
 * @param {AnyT} v
 * @returns {boolean}
 */
export const isPrimitive = (v: AnyT): boolean => isNumber(v) || isString(v) || isBoolean(v);

/**
 * @stable [03.10.2019]
 * @param {AnyT} v
 * @returns {boolean}
 */
export const isObject = (v: AnyT): boolean => Object.prototype.toString.call(v) === '[object Object]';

/**
 * @stable [06.12.2018]
 * @param {TResult} result
 * @returns {TResult}
 */
export const toType = <TResult>(result: TResult): TResult => result;
