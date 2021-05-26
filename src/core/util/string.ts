import camelcase from 'camelcase';

import {
  UNDEF,
  UNDEF_SYMBOL,
} from '../definitions.interface';
import { ConditionUtils } from './cond';
import { ObjectUtils } from './object';
import { TypeUtils } from './type';

/**
 * @stable [31.03.2021]
 * @param value
 * @param options
 */
const asCamelcase = (value: string | string[], options?: camelcase.Options): string =>
  ConditionUtils.ifNotNilThanValue(
    value,
    () => camelcase(value, options),
    UNDEF_SYMBOL
  );

/**
 * @stable [31.03.2021]
 * @param value
 */
const asLowercase = (value: string | string[]): string =>
  ConditionUtils.ifNotNilThanValue(
    value,
    () => String(value).toLowerCase(),
    UNDEF_SYMBOL
  );

/**
 * @stable [31.03.2021]
 * @param value
 * @param returnUndef
 */
const asStringParameter = (value: unknown, returnUndef = false): string =>
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
 * @stable [31.03.2021]
 * @param source
 * @param value
 * @param position
 */
const insertSubstring = (source: string, value: string, position: number = 0): string =>
  ConditionUtils.ifNotNilThanValue(
    source,
    () => `${source.slice(0, position)}${value}${source.slice(position)}`,
    UNDEF_SYMBOL
  );

/**
 * @stable [26.05.2021]
 * @param source
 * @param placeholder
 * @param start
 * @param end
 */
const replaceByPlaceholder = (source: string, placeholder: string, start?: number, end?: number): string =>
  ConditionUtils.ifNotNilThanValue(
    source,
    () => {
      const sourceEndPosition = source.length;
      const endPosition = TypeUtils.isNumber(end) ? end + 1 : sourceEndPosition;

      return (
        `${
          source.substring(0, start)
        }${
          source.substring(start, endPosition).replace(/./g, placeholder)
        }${
          source.substring(endPosition, sourceEndPosition)
        }`
      );
    },
    UNDEF_SYMBOL
  );

/**
 * @utils
 * @stable [31.03.2021]
 */
export class StringUtils {
  public static readonly asCamelcase = asCamelcase;
  public static readonly asLowerCase = asLowercase;
  public static readonly asStringParameter = asStringParameter;
  public static readonly insertSubstring = insertSubstring;
  public static readonly replaceByPlaceholder = replaceByPlaceholder;
}
