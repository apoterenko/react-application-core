import * as R from 'ramda';

import {
  AnyT,
  UNDEF,
} from '../definitions.interface';
import { isString } from './type';

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
export const isStringNotEmpty = <TValue>(o: AnyT): boolean => isString(o) && isObjectNotEmpty(o);

/**
 * @stable [20.03.2019]
 * @param {AnyT} current
 * @param {AnyT} previous
 * @returns {boolean}
 */
export const isCurrentValueNotEqualPreviousValue = (current: AnyT, previous: AnyT): boolean =>
  isObjectNotEmpty(current) && !R.equals(current, previous);

/**
 * @stable [25.11.2019]
 * @param {TValue} object
 * @returns {TValue}
 */
export const buildUndefValuesObject = <TValue>(object: TValue): TValue =>
  mergeObjectsArray(object, () => UNDEF);

/**
 * @stable [17.04.2020]
 * @param {TValue} object
 * @param {(o, key) => any} mergeFn
 * @returns {TValue}
 */
export const mergeObjectsArray = <TValue>(object: TValue, mergeFn = (o, key) => o[key]): TValue =>
  R.isNil(object)
    ? object
    : R.mergeAll(Object.keys(object).map((key) => ({[key]: mergeFn(object, key)})));
