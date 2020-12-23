import * as R from 'ramda';

import {
  AnyT,
} from '../definitions.interface';
import { TypeUtils } from '../util';

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
 * @stable [23.12.2020]
 * @param v
 */
const coalesceDef = <TValue = unknown>(...v: TValue[]): TValue => R.find<TValue>(($v) => TypeUtils.isDef($v), v);

/**
 * @stable [19.05.2020]
 */
export class NvlUtils {
  public static readonly coalesce = coalesce;                           /* @stable [19.05.2020] */
  public static readonly coalesceDef = coalesceDef;
  public static readonly nvl = nvl;                                     /* @stable [21.05.2020] */
}
