import { AnyT } from '../definition.interface';
import { isFn } from '../util';

export function orNull<TResult>(condition: AnyT, result: TResult|(() => TResult)): TResult {
  return condition ? (isFn(result) ? (result as () => TResult)() : result as TResult) : null;
}

export function orUndef<TResult>(condition: AnyT, result: TResult|(() => TResult)): TResult {
  return condition ? (isFn(result) ? (result as () => TResult)() : result as TResult) : undefined;
}

export function orDefault(cond: boolean, v: AnyT, defaultV: AnyT): AnyT {
  return cond ? v : defaultV;
}
