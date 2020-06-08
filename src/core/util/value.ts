import * as R from 'ramda';

import { TypeUtils } from './type';
import { AnyT } from '../definitions.interface';

/**
 * @stable [27.03.2020]
 * @param {boolean} value
 * @returns {boolean}
 */
const isValueValid = (value: boolean): boolean => value !== false;

/**
 * @stable [03.06.2020]
 * @param {AnyT} value
 * @param {AnyT} emptyValue
 * @returns {boolean}
 */
const isValuePresent = (value: AnyT, emptyValue: AnyT): boolean =>
  TypeUtils.isDef(value) && !R.equals(value, emptyValue);

/**
 * @stable [03.06.2020]
 */
export class ValueUtils {
  public static readonly isValuePresent = isValuePresent;                                    /* @stable [03.06.2020] */
  public static readonly isValueValid = isValueValid;                                        /* @stable [08.06.2020] */
}
