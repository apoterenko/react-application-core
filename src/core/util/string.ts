import camelcase from 'camelcase';

import {
  AnyT,
  UNDEF,
  UNDEF_SYMBOL,
} from '../definitions.interface';
import { ConditionUtils } from './cond';
import { TypeUtils } from './type';
import { ObjectUtils } from './object';

/**
 * @stable [25.07.2020]
 * @param value
 * @param options
 */
const asCamelcase = (value: string | string[], options?: camelcase.Options): string =>
  camelcase(value, options);

/**
 * @stable [14.08.2020]
 * @param value
 * @param returnUndef
 */
const asStringParameter = (value: AnyT, returnUndef = false): string =>
  ConditionUtils.ifNotNilThanValue(
    value,
    () => {
      let resultValue = value;
      if (TypeUtils.isString(value)) {
        resultValue = (value as string).trim();
      }
      return ObjectUtils.isObjectNotEmpty(resultValue)
        ? String(resultValue)
        : (returnUndef ? UNDEF : null);
    },
    UNDEF_SYMBOL
  );

/**
 * @stable [25.07.2020]
 */
export class StringUtils {
  public static readonly asCamelcase = asCamelcase;
  public static readonly asStringParameter = asStringParameter;
}
