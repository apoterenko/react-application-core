import * as R from 'ramda';

import { AnyT, UNDEF } from '../definitions.interface';

export function nvlEmpty(v: AnyT): AnyT {
  return R.isNil(v) || R.isEmpty(v) ? null : v;
}

export function undefEmpty(v: AnyT): AnyT {
  return R.isNil(v) || R.isEmpty(v) ? UNDEF : v;
}

export function nvl(v1: AnyT, v2: AnyT): AnyT {
  return R.isNil(v1) ? v2 : v1;
}
