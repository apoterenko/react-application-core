import * as BPromise from 'bluebird';

import { ConditionUtils } from './cond';

/**
 * Wait, even if an exception occurs in a single promise
 * @stable [27.03.2021]
 * @param values
 */
const reflectAll = <T>(values: Promise<T>[]) =>
  BPromise.all(values.map((promise) => BPromise.cast(promise).reflect()));

/**
 * @stable [27.03.2021]
 * @param promise
 */
const cancel = <TValue = void>(promise: BPromise<TValue>): boolean =>
  ConditionUtils.ifNotNilThanValue(
    promise,
    () => {
      if (promise.isPending()) {
        promise.cancel();
        return true;
      }
      return false;
    },
    false
  );

/**
 * @stable [27.03.2021]
 */
export class PromiseUtils {
  public static readonly cancel = cancel;
  public static readonly reflectAll = reflectAll;
}
