import * as BPromise from 'bluebird';

/**
 * Wait, even if an exception occurs in single promise
 * @stable [27.02.2019]
 *
 * @param {Array<Promise<T>>} values
 * @returns {Bluebird<[Bluebird.Inspection<any> , any , any , any , any]>}
 */
export const reflectAll = <T>(values: Array<Promise<T>>) =>
  BPromise.all(values.map((promise) => BPromise.cast(promise).reflect()));
