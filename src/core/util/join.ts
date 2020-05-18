import {
  AnyT,
  UniCodesEnum,
} from '../definitions.interface';
import { isArrayNotEmpty } from './array';
import { FilterUtils } from './filter';
import { nvl } from './nvl';

/**
 * @stable [17.05.2020]
 * @param {AnyT[]} parts
 * @param {string} joiner
 * @returns {string}
 */
export const join = (parts: AnyT[], joiner: string = UniCodesEnum.SPACE): string =>
  FilterUtils.notNilValuesArrayFilter(...parts).join(joiner);

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
 * @stable [17.05.2020]
 */
export class JoinUtils {
  public static readonly join = join;                                       /* @stable [17.05.2020] */
}
