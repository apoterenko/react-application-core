import {
  MultiFieldValueOrEntityIdT,
} from '../definition';
import {
  TypeUtils,
} from './type';

/**
 * @stable [29.08.2020]
 * @param value
 */
const isNotMultiFieldValue = (value: MultiFieldValueOrEntityIdT): boolean =>
  Array.isArray(value) || TypeUtils.isPrimitive(value);

/**
 * @stable [29.08.2020]
 */
export class MultiFieldUtils {
  public static readonly isNotMultiFieldValue = isNotMultiFieldValue;
}
