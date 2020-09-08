import * as R from 'ramda';

import { RegexpConstants } from '../definition/regexp-definition.interface';

/**
 * @stable [02.10.2019]
 * @param {AnyT} value
 * @returns {boolean}
 */
export const isDef = (value: unknown): boolean => !isUndef(value);

/**
 * @stable [02.10.2019]
 * @param {AnyT} value
 * @returns {boolean}
 */
export const isUndef = (value: unknown): boolean => typeof value === 'undefined';

/**
 * @stable [02.10.2019]
 * @param {AnyT} value
 * @returns {boolean}
 */
export const isFn = (value: unknown): boolean => typeof value === 'function';

/**
 * @stable [07.09.2020]
 * @param value
 */
const isNumber = (value: unknown): boolean => typeof value === 'number' && !isNaN(value);

/**
 * @stable [07.09.2020]
 * @param value
 */
const isNotNumber = (value: unknown): boolean => !isNumber(value);

/**
 * @stable [07.09.2020]
 * @param value
 */
const isPositiveNumber = (value: unknown): boolean => isNumber(value) && value >= 0;

/**
 * @stable [07.09.2020]
 * @param value
 */
const isPositiveNumberLike = (value: unknown): boolean => RegexpConstants.POSITIVE_NUMBER.test(`${value}`);

/**
 * @stable [22.07.2020]
 * @param {AnyT} value
 * @returns {boolean}
 */
const isPositiveOrNegativeNumberLike = (value: unknown): boolean => RegexpConstants.POSITIVE_OR_NEGATIVE_NUMBER.test(`${value}`);

/**
 * @stable [07.09.2020]
 * @param value
 */
const isPositiveOrNegativeOptionalNumberLike = (value: unknown): boolean =>
  R.isNil(value) || isPositiveOrNegativeNumberLike(value);

/**
 * @stable [07.09.2020]
 * @param value
 */
const isPositiveOptionalNumberLike = (value: unknown): boolean =>
  R.isNil(value) || isPositiveNumberLike(value);

/**
 * @stable [06.12.2019]
 * @param {AnyT} value
 * @returns {boolean}
 */
const isBoolean = (value: unknown): boolean => typeof value === 'boolean';

/**
 * @stable [17.05.2020]
 * @param {AnyT} value
 * @returns {boolean}
 */
const isString = (value: unknown): boolean => typeof value === 'string';

/**
 * @stable [29.08.2020]
 * @param v
 */
const isPrimitive = (v: unknown): boolean => isNumber(v) || isString(v) || isBoolean(v);

/**
 * @stable [29.08.2020]
 * @param v
 */
const isObject = (v: unknown): boolean => Object.prototype.toString.call(v) === '[object Object]';

/**
 * @stable [29.08.2020]
 * @param v
 */
const isEvent = (v: unknown): boolean => v instanceof Event;

/**
 * @stable [06.12.2018]
 * @param {TResult} result
 * @returns {TResult}
 */
export const asType = <TResult>(result: TResult): TResult => result;

/**
 * @stable [16.05.2020]
 */
export class TypeUtils {
  public static readonly asType = asType;                                                                   /* @stable [08.09.2020] */
  public static readonly isBoolean = isBoolean;                                                             /* @stable [12.06.2020] */
  public static readonly isDef = isDef;                                                                     /* @stable [16.05.2020] */
  public static readonly isEvent = isEvent;                                                                 /* @stable [29.08.2020] */
  public static readonly isFn = isFn;                                                                       /* @stable [16.05.2020] */
  public static readonly isNotNumber = isNotNumber;                                                         /* @stable [07.09.2020] */
  public static readonly isNumber = isNumber;                                                               /* @stable [16.05.2020] */
  public static readonly isObject = isObject;                                                               /* @stable [16.05.2020] */
  public static readonly isPositiveNumber = isPositiveNumber;                                               /* @stable [07.09.2020] */
  public static readonly isPositiveNumberLike = isPositiveNumberLike;                                       /* @stable [07.09.2020] */
  public static readonly isPositiveOptionalNumberLike = isPositiveOptionalNumberLike;                       /* @stable [07.09.2020] */
  public static readonly isPositiveOrNegativeNumberLike = isPositiveOrNegativeNumberLike;                   /* @stable [22.07.2020] */
  public static readonly isPositiveOrNegativeOptionalNumberLike = isPositiveOrNegativeOptionalNumberLike;   /* @stable [07.09.2020] */
  public static readonly isPrimitive = isPrimitive;                                                         /* @stable [16.05.2020] */
  public static readonly isString = isString;                                                               /* @stable [16.05.2020] */
  public static readonly isUndef = isUndef;                                                                 /* @stable [16.05.2020] */
}
