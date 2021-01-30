import * as R from 'ramda';

import { TypeUtils } from './type';

/**
 * @stable [30.01.2021]
 * @param value
 */
const isValueValid = (value: boolean): boolean => value !== false;

/**
 * @stable [30.01.2021]
 * @param value
 * @param emptyValue
 */
const isValuePresent = (value: unknown, emptyValue: unknown): boolean =>
  TypeUtils.isDef(value) && !R.equals(value, emptyValue);

/**
 * @stable [30.01.2021]
 */
export class ValueUtils {
  public static readonly isPresent = isValuePresent;
  public static readonly isValid = isValueValid;
}
