import { FilterUtils } from './filter';
import { NvlUtils } from './nvl';
import { ObjectUtils } from './object';
import { UniCodesEnum } from '../definitions.interface';

/**
 * @stable [21.01.2021]
 * @param parts
 * @param joiner
 */
const join = (parts: unknown[], joiner: string = UniCodesEnum.SPACE): string =>
  FilterUtils.notNilValuesArrayFilter(...parts).join(joiner);

/**
 * @stable [21.01.2021]
 * @param parts
 */
const joinReduce = (parts: unknown[]): string =>
  ObjectUtils.isObjectNotEmpty(parts)
    ? (
      parts.length > 1
        ? `${parts[0]}, ...`
        : NvlUtils.nvl(parts[0], '')
    )
    : '';

/**
 * @stable [21.01.2021]
 */
export class JoinUtils {
  public static readonly join = join;
  public static readonly joinReduce = joinReduce;
}
