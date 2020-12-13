import { ArrayUtils } from './array';
import { FilterUtils } from './filter';
import { NvlUtils } from './nvl';
import { UniCodesEnum } from '../definitions.interface';

/**
 * @stable [13.12.2020]
 * @param parts
 * @param joiner
 */
const join = (parts: unknown[], joiner: string = UniCodesEnum.SPACE): string =>
  FilterUtils.notNilValuesArrayFilter(...parts).join(joiner);

/**
 * @stable [13.12.2020]
 * @param parts
 */
const joinReduce = (parts: unknown[]): string =>
  ArrayUtils.isArrayNotEmpty(parts)
    ? (
      parts.length > 1
        ? `${parts[0]}, ...`
        : NvlUtils.nvl(parts[0], '')
    )
    : '';

/**
 * @stable [13.12.2020]
 */
export class JoinUtils {
  public static readonly join = join;
  public static readonly joinReduce = joinReduce;
}
