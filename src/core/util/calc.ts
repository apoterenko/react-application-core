import { TypeUtils } from './type';

/**
 * @stable [17.12.2020]
 * @param result
 * @param payload
 */
export const calc = <TResult, TPayload = unknown>(result: TResult | ((payload?: TPayload) => TResult), payload?: TPayload): TResult =>
  TypeUtils.isFn(result)
    ? (result as (payload?: TPayload) => TResult)(payload)
    : result as TResult;

/**
 * @stable [18.05.2020]
 */
export class CalcUtils {
  public static readonly calc = calc;
}
