import * as R from 'ramda';

import { AnyT, StringNumberT, UNDEF, UNDEF_SYMBOL } from '../definitions.interface';
import { isFn } from '../util';
import { calc } from './calc';

/**
 * @stable [25.10.2018]
 * @param {AnyT} condition
 * @param {string | (() => string)} result
 * @returns {string}
 */
export const orEmpty = (condition: AnyT, result: string|(() => string)) => condition ? calc(result) : '';

export function orNull<TResult>(condition: AnyT, result: TResult|(() => TResult)): TResult {
  return condition ? (isFn(result) ? (result as () => TResult)() : result as TResult) : null;
}

export function orUndef<TResult>(condition: AnyT, result: TResult|(() => TResult)): TResult {
  return condition ? (isFn(result) ? (result as () => TResult)() : result as TResult) : undefined;
}

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
  R.isNil(value) ? callback(value) : defaultValue;

/**
 * @stable [16.02.2019]
 * @param {TValue} value
 * @param {(value: TValue) => TResult} callback
 * @param {any} defaultValue
 * @returns {TResult}
 */
export const ifNotEmptyThanValue = <TValue, TResult> (value: TValue,
                                                      callback: (value: TValue) => TResult,
                                                      defaultValue = null): TResult =>
  !R.isNil(value) && !R.isEmpty(value) ? callback(value) : defaultValue;

/**
 * @stable [25.02.2019]
 * @param {boolean} value
 * @param {(value: boolean) => TResult} callback
 * @param {any} defaultValue
 * @returns {TResult}
 */
export const ifNotFalseThanValue = <TResult>(value: boolean,
                                             callback: (value: boolean) => TResult,
                                             defaultValue = null): TResult =>
  value !== false ? callback(value) : defaultValue;

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
 * @stable [26.06.2019]
 * @param {StringNumberT} value
 * @returns {StringNumberT}
 */
export const ifEmptyThanNull = (value: StringNumberT): StringNumberT => value === ''
  ? null
  : value;
