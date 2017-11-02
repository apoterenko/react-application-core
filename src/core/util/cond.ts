import { AnyT } from '../definition.interface';

export function orNull<TResult>(condition: AnyT, result: TResult): TResult {
  return condition ? result : null;
}
