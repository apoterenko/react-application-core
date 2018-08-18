import * as R from 'ramda';

import { AnyT } from '../definitions.interface';
import { isFn, uuid } from '../util';

export function orNull<TResult>(condition: AnyT, result: TResult|(() => TResult)): TResult {
  return condition ? (isFn(result) ? (result as () => TResult)() : result as TResult) : null;
}

export function orUndef<TResult>(condition: AnyT, result: TResult|(() => TResult)): TResult {
  return condition ? (isFn(result) ? (result as () => TResult)() : result as TResult) : undefined;
}

export function orDefault<TResult1, TResult2>(cond: boolean,
                                              result1: TResult1|(() => TResult1),
                                              result2: TResult2|(() => TResult2)): TResult1|TResult2 {
  return cond
      ? (isFn(result1) ? (result1 as () => TResult1)() : result1 as TResult1)
      : (isFn(result2) ? (result2 as () => TResult2)() : result2 as TResult2);
}

/**
 * @stable [19.08.2018]
 * @param {AnyT} value
 * @param {(() => TResult1) | TResult1} result1
 * @param {(() => TResult2) | TResult2} result2
 * @returns {TResult1 | TResult2}
 */
export const ifNilReturnDefault = <TResult1, TResult2>(value: AnyT,
                                                       result1: TResult1 | (() => TResult1),
                                                       result2: TResult2 | (() => TResult2)): TResult1 | TResult2 =>
  orDefault<TResult1, TResult2>(!R.isNil(value), result1, result2);

/**
 * @stable [19.08.2018]
 * @param {AnyT} value
 * @param {(() => TResult) | TResult} result
 * @returns {string | TResult}
 */
export const ifNilReturnUuid = <TResult>(value: AnyT,
                                         result: TResult | (() => TResult)): string | TResult =>
  ifNilReturnDefault<TResult, string>(value, result, () => uuid());
