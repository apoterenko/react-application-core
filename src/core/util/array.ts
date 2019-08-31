import * as R from 'ramda';

import { AnyT, IKeyValue } from '../definitions.interface';
import { nvl } from './nvl';
import { ifNotNilThanValue } from './cond';
import { notNilValuesArrayFilter } from './filter';

/**
 * @stable [16.12.2018]
 * @param {number} length
 * @returns {AnyT[]}
 */
export const generateArray = (length: number): AnyT[] => Array.apply(null, {length});

/**
 * @stable [19.11.2018]
 * @param {number[]} array
 * @returns {number}
 */
export const arrayMinValue = (array: number[]): number => R.reduce(R.min, Infinity, array) as number;

/**
 * @stable [22.11.2018]
 * @param {number[]} array
 * @returns {number}
 */
export const arrayNextMinNegativeValue = (array: number[]): number => Math.min(Number(arrayMinValue(array)), 0) - 1;

/**
 * @stable [19.12.2018]
 * @param {TValue[]} array
 * @returns {boolean}
 */
export const isArrayNotEmpty = <TValue>(array: TValue[]): boolean => Array.isArray(array) && !R.isEmpty(array);

/**
 * @stable [28.01.2019]
 * @param {TValue[]} array
 * @param {number} limit
 * @returns {TValue[]}
 */
export const subArray = <TValue>(array: TValue[], limit?: number): TValue[] =>
  ifNotNilThanValue(array, () => array.slice(0, Math.min(array.length, nvl(limit, array.length))));

/**
 * @stable [26.07.2019]
 * @param {TValue[]} array
 * @param {TValue} initialItem
 * @param {(previousItem: TValue, initialItem: TValue) => TValue} mergedItemFactory
 * @param {(itm1: TValue, itm2: TValue) => boolean} predicate
 * @returns {TValue[]}
 */
export const mergeArrayItem = <TValue extends IKeyValue>(array: TValue[],
                                                         initialItem: TValue,
                                                         mergedItemFactory: (previousItem: TValue) => TValue,
                                                         predicate: (itm1: TValue, itm2: TValue) => boolean): TValue[] => {
  const array0 = array || [];
  const replacedItem = array0.find((itm) => predicate(itm, initialItem));
  const hasEntity = !R.isNil(replacedItem);
  return [
    ...array0,
    ...(hasEntity ? [] : [initialItem])
  ].map(
    (itm) => predicate(itm, initialItem)
      ? Object.assign({}, itm, mergedItemFactory(itm))
      : itm
  );
};

/**
 * @stable [31.08.2019]
 * @param {AnyT} values
 * @returns {boolean}
 */
export const areArrayValuesNotNil = (...values: AnyT[]): boolean =>
  ifNotNilThanValue(
    values,
    () => notNilValuesArrayFilter(...values).length === values.length,
    false
  );
