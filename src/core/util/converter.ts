import * as R from 'ramda';

/**
 * @stable [21.10.2018]
 * @param {Map<TKey, TValue>} map
 * @returns {{[p: string]: TValue}}
 */
export const fromMapToObject = <TKey, TValue>(map: Map<TKey, TValue>): { [index: string]: TValue } =>
  R.mergeAll(Array.from(map.keys()).map((path) => ({[String(path)]: map.get(path)})));
