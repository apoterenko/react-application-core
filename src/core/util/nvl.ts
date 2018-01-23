import * as R from 'ramda';

import { AnyT } from '../definition.interface';

export function nvlEmpty(v: AnyT): AnyT {
  return R.isNil(v) || R.isEmpty(v) ? null : v;
}

export function nvl(v1: AnyT, v2: AnyT): AnyT {
  return R.isNil(v1) ? v2 : v1;
}
