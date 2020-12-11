import { Base64 } from 'js-base64';

import { JsonUtils } from './json';
import { IKeyValue } from '../definitions.interface';

/**
 * @stable [11.12.2020]
 * @param str
 */
const stringToBase64 = (str: string): string => Base64.encode(str);

/**
 * @stable [11.12.2020]
 * @param base64
 */
const base64ToString = (base64: string): string => Base64.decode(base64);

/**
 * @stable [10.12.2020]
 * @param base64
 */
const base64ToJson = <TResult = IKeyValue>(base64: string): TResult => JsonUtils.parseJson(base64ToString(base64));

/**
 * @stable [10.12.2020]
 */
export class Base64Utils {
  public static readonly base64ToJson = base64ToJson;
  public static readonly base64ToString = base64ToString;
  public static readonly stringToBase64 = stringToBase64;
}
