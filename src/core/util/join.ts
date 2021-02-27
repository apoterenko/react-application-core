import { FilterUtils } from './filter';
import { NvlUtils } from './nvl';
import { ObjectUtils } from './object';
import { TypeUtils } from './type';
import { UniCodesEnum } from '../definitions.interface';

/**
 * @stable [21.01.2021]
 * @param parts
 * @param joiner
 */
const join = (parts: unknown[], joiner: string = UniCodesEnum.SPACE): string =>
  FilterUtils.notNilValuesArrayFilter(...parts).join(joiner);

/**
 * @stable [25.02.2021]
 * @param parts
 * @param valueHandler
 */
const joinReduce = <TValue = unknown, TResult = TValue>(parts: TValue[], valueHandler?: ($value: TValue) => TResult): string =>
  ObjectUtils.isObjectNotEmpty(parts)
    ? (
      parts.length > 1
        ? `${TypeUtils.isFn(valueHandler) ? valueHandler(parts[0]) : parts[0]}, ...`
        : NvlUtils.nvl(TypeUtils.isFn(valueHandler) ? valueHandler(parts[0]) : parts[0], '')
    )
    : '';

/**
 * @stable [21.01.2021]
 */
export class JoinUtils {
  public static readonly join = join;
  public static readonly joinReduce = joinReduce;
}
