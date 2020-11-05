import * as R from 'ramda';

import {
  AnyT,
  IKeyValue,
} from '../definitions.interface';

/**
 * @stable [10.09.2020]
 * @param o
 * @param space
 */
const formatJson = (o: IKeyValue, space = 4) => JSON.stringify(o, null, space);

/**
 * @stable [06.11.2020]
 * @param o
 */
const parseJson = <TResult = IKeyValue>(o: string): TResult => {
  if (R.isNil(o)) {
    return o;
  }
  try {
    return JSON.parse(o);
  } catch (e) {
    return o as AnyT;
  }
};

/**
 * @stable [07.10.2020]
 * @param o
 */
const serializeJson = <TObject = unknown>(o: TObject): string => JSON.stringify(o);

/**
 * @stable [06.11.2020]
 */
export class JsonUtils {
  public static readonly formatJson = formatJson;
  public static readonly parseJson = parseJson;
  public static readonly serializeJson = serializeJson;
}
