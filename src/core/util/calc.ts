import { isFn } from './type';

/**
 * @stable [04.10.2018]
 * @param {(() => TResult) | TResult} result
 * @returns {TResult}
 */
export const calc = <TResult>(result: TResult | (() => TResult)): TResult =>
  isFn(result) ? (result as () => TResult)() : result as TResult;
