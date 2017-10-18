import { AnyT } from '../definition.interface';

export function orNull(condition: AnyT, result: AnyT): boolean {
  return condition ? result : null;
}
