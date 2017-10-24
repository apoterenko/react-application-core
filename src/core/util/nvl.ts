import * as R from 'ramda';
import { AnyT } from '../definition.interface';

export function nvlEmpty(v: AnyT): AnyT {
  return R.isNil(v) || R.isEmpty(v) ? null : v;
}
