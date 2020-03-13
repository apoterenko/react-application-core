import * as R from 'ramda';

import {
  AnyT,
  IKeyValue,
} from '../definitions.interface';

/**
 * @stable [17.09.2019]
 * @param {IKeyValue} o
 * @param {number} space
 * @returns {string}
 */
export const formatJson = (o: IKeyValue, space = 4) => JSON.stringify(o, null, space);

/**
 * @stable [13.03.2020]
 * @param {string} o
 * @returns {TResult}
 */
export const parseJson = <TResult = IKeyValue>(o: string): TResult => {
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
 * @stable [13.03.2020]
 * @param {TObject} o
 * @returns {string}
 */
export const serializeJson = <TObject = AnyT>(o: TObject): string => JSON.stringify(o);
