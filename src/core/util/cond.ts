import * as R from 'ramda';

import {
  AnyT,
  UNDEF,
  UNDEF_SYMBOL,
} from '../definitions.interface';
import { isFn } from '../util';
import { calc } from './calc';
import { isObjectNotEmpty } from './object';

/**
 * @stable [05.04.2020]
 * @param {AnyT} condition
 * @param {string | (() => string)} result
 * @returns {string}
 */
export const orEmpty = (condition: AnyT, result: string | (() => string)) =>
  condition ? calc(result) : '';

/**
 * @stable [05.04.2020]
 * @param {AnyT} condition
 * @param {(() => TResult) | TResult} result
 * @returns {TResult}
 */
export const orNull = <TResult>(condition: AnyT, result: TResult | (() => TResult)): TResult =>
  condition ? calc(result) : null;

/**
 * @stable [05.04.2020]
 * @param {AnyT} condition
 * @param {(() => TResult) | TResult} result
 * @returns {TResult}
 */
export const orUndef = <TResult>(condition: AnyT, result: TResult | (() => TResult)): TResult =>
  condition ? calc(result) : UNDEF;

/**
 * @deprecated
 */
export function orDefault<TResult1, TResult2>(cond: boolean,
                                              result1: TResult1|(() => TResult1),
                                              result2: TResult2|(() => TResult2)): TResult1|TResult2 {
  return cond
      ? (isFn(result1) ? (result1 as () => TResult1)() : result1 as TResult1)
      : (isFn(result2) ? (result2 as () => TResult2)() : result2 as TResult2);
}

/**
 * @stable [10.08.2019]
 * @param {TValue} value
 * @param {(value: TValue) => TResult} callback
 * @param {any} defaultValue
 * @returns {TResult}
 */
export const ifNotNilThanValue = <TValue, TResult>(value: TValue,
                                                   callback: (value: TValue) => TResult,
                                                   defaultValue = null): TResult =>
  !R.isNil(value)
    ? callback(value)
    : (defaultValue === UNDEF_SYMBOL ? UNDEF : defaultValue);

/**
 * @stable [30.07.2019]
 * @param {TValue} value
 * @param {(value: TValue) => TResult} callback
 * @param {any} defaultValue
 * @returns {TResult}
 */
export const ifNilThanValue = <TValue, TResult>(value: TValue,
                                                callback: (value: TValue) => TResult,
                                                defaultValue = null): TResult =>
  R.isNil(value)
    ? callback(value)
    : (defaultValue === UNDEF_SYMBOL ? UNDEF : defaultValue);

/**
 * @stable [17.10.2019]
 * @param {TValue} value
 * @param {(value: TValue) => TResult} callback
 * @param {any} defaultValue
 * @returns {TResult}
 */
export const ifNotEmptyThanValue = <TValue, TResult>(value: TValue,
                                                     callback: (value: TValue) => TResult,
                                                     defaultValue = null): TResult =>
  isObjectNotEmpty(value)
    ? callback(value)
    : (defaultValue === UNDEF_SYMBOL ? UNDEF : defaultValue);

/**
 * @stable [04.04.2020]
 * @param {boolean} value
 * @param {(value: boolean) => TResult} callback
 * @param {any} defaultValue
 * @returns {TResult}
 */
export const ifNotFalseThanValue = <TResult>(value: boolean,
                                             callback: (value: boolean) => TResult,
                                             defaultValue = null): TResult =>
  value !== false
    ? callback(value)
    : (defaultValue === UNDEF_SYMBOL ? UNDEF : defaultValue);

/**
 * @stable [29.03.2019]
 * @param {boolean} value
 * @param {(value: boolean) => TResult} callback
 * @param {any} defaultValue
 * @returns {TResult}
 */
export const ifNotTrueThanValue = <TResult>(value: boolean,
                                            callback: (value: boolean) => TResult,
                                            defaultValue = null): TResult =>
  value !== true ? callback(value) : defaultValue;

/**
 * @stable [16.05.2020]
 */
export class ConditionUtils {
  public static readonly ifNotEmptyThanValue = ifNotEmptyThanValue;               /* @stable [16.05.2020] */
  public static readonly ifNotNilThanValue = ifNotNilThanValue;                   /* @stable [16.05.2020] */
  public static readonly orNull = orNull;                                         /* @stable [18.05.2020] */
}
