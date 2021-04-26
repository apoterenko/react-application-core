import * as R from 'ramda';

import {
  AnyT,
  StringNumberT,
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
 * @stable [19.09.2020]
 * @param o
 */
const isObjectEmpty = <TValue>(o: unknown): boolean => !isObjectNotEmpty(o);

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
 * @stable [25.04.2021]
 * @param value1
 * @param value2
 */
const isEqualAsString = (value1: unknown, value2: unknown): boolean =>
  !R.isNil(value1) && String(value1) === String(value2);

/**
 * @stable [04.09.2020]
 * @param object
 * @param mergeFn
 * @param keyAccessor
 */
const buildValuesObjectBy = <TValue>(object: TValue,
                                     mergeFn = (o, key) => o[key],
                                     keyAccessor = (o, key) => key): Record<StringNumberT, AnyT> =>
  R.isNil(object)
    ? object
    : R.mergeAll(Object.keys(object).map((key) => ({[keyAccessor(object, key)]: mergeFn(object, key)})));

/**
 * @stable [04.09.2020]
 * @param object
 */
const buildUndefValuesObject = <TValue>(object: TValue): Record<StringNumberT, unknown> =>
  buildValuesObjectBy(object, () => UNDEF);

/**
 * @stable [04.09.2020]
 * @param object
 */
const buildNotEmptyOrNullValuesObject = <TValue>(object: TValue): Record<StringNumberT, AnyT> =>
  buildValuesObjectBy(object, (o, key) => {
    const value = object[key];
    return isObjectNotEmpty(value) ? value : null;
  });

/**
 * @stable [27.03.2021]
 */
const EMPTY_OBJECT = Object.freeze(Object.create(null));

/**
 * @stable [15.05.2020]
 */
export class ObjectUtils {
  public static readonly buildNotEmptyOrNullValuesObject = buildNotEmptyOrNullValuesObject;               /* @stable [15.05.2020] */
  public static readonly buildUndefValuesObject = buildUndefValuesObject;                                 /* @stable [15.05.2020] */
  public static readonly buildValuesObjectBy =  buildValuesObjectBy;                                      /* @stable [15.05.2020] */
  public static readonly EMPTY_OBJECT = EMPTY_OBJECT;                                                     /* @stable [27.03.2021] */
  public static readonly isCurrentValueNotEqualPreviousValue = isCurrentValueNotEqualPreviousValue;       /* @stable [15.05.2020] */
  public static readonly isEqualAsString = isEqualAsString;                                               /* @stable [25.04.2021] */
  public static readonly isObjectEmpty = isObjectEmpty;                                                   /* @stable [04.09.2020] */
  public static readonly isObjectNotEmpty = isObjectNotEmpty;                                             /* @stable [15.05.2020] */
}
