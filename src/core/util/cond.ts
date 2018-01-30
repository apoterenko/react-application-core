import { AnyT } from '../definition.interface';
import { isFn } from '../util';

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
