import * as R from 'ramda';

import { AnyT, UNDEF } from '../definitions.interface';
import { isDef } from '../util';

/**
 * @stable [05.08.2018]
 * @param {AnyT} v
 * @returns {AnyT}
 */
export const undefEmpty = (v: AnyT): AnyT => R.isNil(v) || R.isEmpty(v) ? UNDEF : v;

/**
 * @stable [05.08.2018]
 * @param {AnyT} v
 * @returns {AnyT}
 */
export const trimmedUndefEmpty = (v: AnyT): AnyT => {
  const result = undefEmpty(v);
  return result === UNDEF ? result : String(result).trim();
};

/**
 * @stable [05.08.2018]
 * @param {AnyT} v1
 * @param {AnyT} v2
 * @returns {AnyT}
 */
export const nvl = (v1: AnyT, v2: AnyT): AnyT => R.isNil(v1) ? v2 : v1;

/**
 * @stable [31.08.2018]
 * @param {TValue} v
 * @returns {TValue}
 */
export const coalesce = <TValue = AnyT>(...v: TValue[]): TValue => R.find<TValue>((v0) => !R.isNil(v0), v);

/**
 * @stable [13.06.2019]
 * @param {TValue} v
 * @returns {TValue}
 */
export const coalesceDef = <TValue = AnyT>(...v: TValue[]): TValue => R.find<TValue>((v0) => isDef(v0), v);
