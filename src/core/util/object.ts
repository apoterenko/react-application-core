import * as R from 'ramda';
import { AnyT } from '../definitions.interface';

/**
 * @stable [19.12.2018]
 * @param {AnyT} o
 * @returns {boolean}
 */
export const isObjectNotEmpty = <TValue>(o: AnyT): boolean => !R.isNil(o) && !R.isEmpty(o);

/**
 * @stable [20.03.2019]
 * @param {AnyT} current
 * @param {AnyT} previous
 * @returns {boolean}
 */
export const isCurrentValueNotEqualPreviousValue = (current: AnyT, previous: AnyT): boolean =>
  isObjectNotEmpty(current) && !R.equals(current, previous);
