import * as R from 'ramda';

import { AnyT } from '../definitions.interface';
import { isFn, uuid } from '../util';
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

export function orDefault<TResult1, TResult2>(cond: boolean,
                                              result1: TResult1|(() => TResult1),
                                              result2: TResult2|(() => TResult2)): TResult1|TResult2 {
  return cond
      ? (isFn(result1) ? (result1 as () => TResult1)() : result1 as TResult1)
      : (isFn(result2) ? (result2 as () => TResult2)() : result2 as TResult2);
}

/**
 * @stable [06.12.2018]
 * @param {AnyT} checkedValue
 * @param {(() => TResult1) | TResult1} result1
 * @param {(() => TResult2) | TResult2} result2
 * @returns {TResult1 | TResult2}
 */
export const ifNilReturnDefault = <TResult1, TResult2 = AnyT>(checkedValue: AnyT,
                                                              result1: TResult1 | (() => TResult1),
                                                              result2?: TResult2 | (() => TResult2)): TResult1 | TResult2 =>
  orDefault<TResult1, TResult2>(!R.isNil(checkedValue), result1, result2);

/**
 * @stable [01.12.2018]
 * @param {AnyT} checkedValue
 * @param {(() => TResult) | TResult} result
 * @returns {void | TResult}
 */
export const ifNotNilReturnValue = <TResult>(checkedValue: AnyT,
                                             result: TResult | (() => TResult)): TResult | null =>
  ifNilReturnDefault<TResult, null>(checkedValue, result, null);

/**
 * @stable [11.12.2018]
 * @param {AnyT} checkedValue
 * @param {(() => TResult) | TResult} result
 * @returns {TResult | null}
 */
export const ifNilReturnValue = <TResult>(checkedValue: AnyT,
                                          result: TResult | (() => TResult)): TResult | null =>
  ifNilReturnDefault<null, TResult>(checkedValue, null, result);

/**
 * @stable [19.08.2018]
 * @param {AnyT} value
 * @param {(() => TResult) | TResult} result
 * @returns {string | TResult}
 */
export const ifNilReturnUuid = <TResult>(value: AnyT,
                                         result: TResult | (() => TResult)): string | TResult =>
  ifNilReturnDefault<TResult, string>(value, result, () => uuid());

/**
 * @stable [25.12.2018]
 * @param {TValue} value
 * @param {(value: TValue) => TResult} callback
 * @returns {TResult}
 */
export const ifNotNilThanValue = <TValue, TResult>(value: TValue, callback: (value: TValue) => TResult): TResult =>
  !R.isNil(value) ? callback(value) : null;
