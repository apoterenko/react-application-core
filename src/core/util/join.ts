import * as R from 'ramda';
import { AnyT } from '../definitions.interface';

export function join(parts: AnyT[], joiner: string = '\u0020'): string {
  return parts.filter((v) => !R.isNil(v)).join(joiner);
}
