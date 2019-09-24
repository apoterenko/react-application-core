import { AnyT, UniCodesEnum } from '../definitions.interface';
import { isArrayNotEmpty } from './array';
import { NOT_NIL_VALUE_PREDICATE, notNilValuesArrayFilter } from './filter';
import { nvl } from './nvl';
import { STORAGE_PATH_SEPARATOR } from '../definition';

/**
 * @stable [10.09.2019]
 * @param {AnyT[]} parts
 * @param {string} joiner
 * @returns {string}
 */
export const join = (parts: AnyT[], joiner: string = UniCodesEnum.SPACE): string =>
  parts.filter(NOT_NIL_VALUE_PREDICATE).join(joiner);

/**
 *
 * @param {AnyT[]} parts
 * @returns {string}
 */
export const joinReduce = (parts: AnyT[]): string => isArrayNotEmpty(parts)
  ? (
    parts.length > 1
      ? `${parts[0]}, ...`
      : nvl(parts[0], '')
  )
  : '';

/**
 * @stable [24.09.2019]
 * @param {string} parts
 * @returns {string}
 */
export const joinStoragePrefix = (...parts: string[]): string =>
  notNilValuesArrayFilter(...parts).join(STORAGE_PATH_SEPARATOR);
