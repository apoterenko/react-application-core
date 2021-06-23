import * as R from 'ramda';

import {
  UNDEF,
  UNDEF_SYMBOL,
} from '../definitions.interface';
import { CalcUtils } from './calc';
import { ObjectUtils } from './object';
import { TypeUtils } from './type';

/**
 * @stable [21.12.2020]
 * @param condition
 * @param result
 */
const orEmpty = (condition: unknown, result: string | (() => string)) =>
  condition ? CalcUtils.calc(result) : '';

/**
 * @stable [21.12.2020]
 * @param condition
 * @param result
 */
export const orNull = <TResult>(condition: unknown, result: TResult | (() => TResult)): TResult =>
  condition ? CalcUtils.calc(result) : null;

/**
 * @stable [21.12.2020]
 * @param condition
 * @param result
 */
const orUndef = <TResult>(condition: unknown, result: TResult | (() => TResult)): TResult =>
  condition ? CalcUtils.calc(result) : UNDEF;

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
 * @stable [16.06.2021]
 * @param value
 * @param callback
 * @param defaultValue
 */
const ifNilThanValue = <TValue, TResult>(value: TValue,
                                         callback: (value: TValue) => TResult,
                                         defaultValue = null): TResult =>
  R.isNil(value)
    ? callback(value)
    : (defaultValue === UNDEF_SYMBOL ? UNDEF : defaultValue);

/**
 * @stable [16.06.2021]
 * @param value
 * @param callback
 * @param defaultValue
 */
const ifFnThanValue = <TValue, TResult>(value: TValue,
                                        callback: (value: TValue) => TResult,
                                        defaultValue = null): TResult =>
  TypeUtils.isFn(value)
    ? callback(value)
    : (defaultValue === UNDEF_SYMBOL ? UNDEF : defaultValue);

/**
 * @stable [11.12.2020]
 * @param value
 * @param callback
 * @param defaultValue
 */
export const ifNotEmptyThanValue = <TValue, TResult>(value: TValue,
                                                     callback: (value: TValue) => TResult,
                                                     defaultValue = null): TResult =>
  ObjectUtils.isObjectNotEmpty(value)
    ? callback(value)
    : (defaultValue === UNDEF_SYMBOL ? UNDEF : defaultValue);

/**
 * @stable [11.12.2020]
 * @param value
 * @param callback
 * @param defaultValue
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
  public static readonly ifFnThanValue = ifFnThanValue;
  public static readonly ifNilThanValue = ifNilThanValue;                         /* @stable [21.06.2020] */
  public static readonly ifNotEmptyThanValue = ifNotEmptyThanValue;               /* @stable [16.05.2020] */
  public static readonly ifNotFalseThanValue = ifNotFalseThanValue;               /* @stable [11.12.2020] */
  public static readonly ifNotNilThanValue = ifNotNilThanValue;                   /* @stable [16.05.2020] */
  public static readonly orEmpty = orEmpty;                                       /* @stable [27.06.2020] */
  public static readonly orNull = orNull;                                         /* @stable [18.05.2020] */
  public static readonly orUndef = orUndef;                                       /* @stable [01.06.2020] */
}
