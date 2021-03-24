import { Base64 } from 'js-base64';
import { LoggerFactory } from 'ts-smart-logger';

import { JsonUtils } from './json';
import { IKeyValue } from '../definitions.interface';

/**
 * @stable [24.03.2021]
 */
const logger = LoggerFactory.makeLogger('base64');

/**
 * @stable [11.12.2020]
 * @param str
 */
const stringToBase64 = (str: string): string => Base64.encode(str);

/**
 * @stable [11.12.2020]
 * @param o
 */
const jsonToBase64 = <TObject = unknown>(o: TObject): string => stringToBase64(JsonUtils.serializeJson(o))

/**
 * @stable [11.12.2020]
 * @param base64
 */
const base64ToString = (base64: string): string => {
  try {
    return Base64.decode(base64);
  } catch (e) {
    logger.error('[$base64][base64ToString]', e);
    return null;
  }
};

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
  public static readonly jsonToBase64 = jsonToBase64;
  public static readonly stringToBase64 = stringToBase64;
}
