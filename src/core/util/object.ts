import * as R from 'ramda';

import {
  AnyT,
  UNDEF,
} from '../definitions.interface';
import { TypeUtils } from './type';

/**
 * @stable [18.04.2020]
 * @param {AnyT} o
 * @returns {boolean}
 */
export const isObjectNotEmpty = <TValue>(o: AnyT): boolean => !R.isNil(o) && !R.isEmpty(o);

/**
 * @stable [18.04.2020]
 * @param {AnyT} o
 * @returns {boolean}
 */
export const isObjectEmpty = <TValue>(o: AnyT): boolean => !isObjectNotEmpty(o);

/**
 * @stable [18.03.2020]
 * @param {AnyT} o
 * @returns {boolean}
 */
export const isStringNotEmpty = <TValue>(o: AnyT): boolean => TypeUtils.isString(o) && isObjectNotEmpty(o);

/**
 * @stable [20.03.2019]
 * @param {AnyT} current
 * @param {AnyT} previous
 * @returns {boolean}
 */
const isCurrentValueNotEqualPreviousValue = (current: AnyT, previous: AnyT): boolean =>
  isObjectNotEmpty(current) && !R.equals(current, previous);

/**
 * @stable [17.04.2020]
 * @param {TValue} object
 * @param {(o, key) => any} mergeFn
 * @returns {TValue}
 */
const buildValuesObjectBy = <TValue>(object: TValue, mergeFn = (o, key) => o[key]): TValue =>
  R.isNil(object)
    ? object
    : R.mergeAll(Object.keys(object).map((key) => ({[key]: mergeFn(object, key)})));

/**
 * @stable [15.05.2020]
 * @param {TValue} object
 * @returns {TValue}
 */
const buildUndefValuesObject = <TValue>(object: TValue): TValue => buildValuesObjectBy(object, () => UNDEF);

/**
 * @stable [16.05.2020]
 * @param {TValue} object
 * @returns {TValue}
 */
const buildNotEmptyOrNullValuesObject = <TValue>(object: TValue): TValue => buildValuesObjectBy(object, (o, key) => {
  const value = object[key];
  return isObjectNotEmpty(value) ? value : null;
});

/**
 * @stable [15.05.2020]
 */
export class ObjectUtils {
  public static buildNotEmptyOrNullValuesObject = buildNotEmptyOrNullValuesObject;               /* @stable [15.05.2020] */
  public static buildUndefValuesObject = buildUndefValuesObject;                                 /* @stable [15.05.2020] */
  public static buildValuesObjectBy =  buildValuesObjectBy;                                      /* @stable [15.05.2020] */
  public static isCurrentValueNotEqualPreviousValue = isCurrentValueNotEqualPreviousValue;       /* @stable [15.05.2020] */
  public static isObjectNotEmpty = isObjectNotEmpty;                                             /* @stable [15.05.2020] */
}
