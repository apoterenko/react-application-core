import * as R from 'ramda';

import {
  AnyT,
  IKeyValue,
} from '../definitions.interface';
import { TypeUtils } from './type';

/**
 * @stable [10.09.2020]
 * @param o
 * @param space
 */
const formatJson = (o: IKeyValue, space = 4) => JSON.stringify(o, null, space);

/**
 * @stable [08.02.2021]
 * @param o
 */
const parseJson = <TResult = IKeyValue>(o: AnyT): TResult => {
  if (R.isNil(o) || !TypeUtils.isString(o)) {
    return o as TResult;
  }
  try {
    return JSON.parse(o as string);
  } catch (e) {
    return o as AnyT;
  }
};

/**
 * @stable [07.10.2020]
 * @param o
 */
const serializeJson = <TObject = unknown>(o: TObject): string => {
  if (R.isNil(o) || TypeUtils.isString(o)) {
    return o as AnyT;
  }
  try {
    return JSON.stringify(o);
  } catch (e) {
    return String(o);
  }
};

/**
 * @stable [06.11.2020]
 */
export class JsonUtils {
  public static readonly formatJson = formatJson;
  public static readonly parseJson = parseJson;
  public static readonly serializeJson = serializeJson;
}
