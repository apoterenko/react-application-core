import { AnyT } from '../definition.interface';

export function orNull<TResult>(condition: AnyT, result: TResult): TResult {
  return condition ? result : null;
}

export function orDefault(cond: boolean, v: AnyT, defaultV: AnyT): AnyT {
  return cond ? v : defaultV;
}
