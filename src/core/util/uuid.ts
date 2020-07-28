import * as uuid0 from 'uuid';

import { IValueWrapper } from '../definitions.interface';

/**
 * @stable [11.06.2018]
 * @param {boolean} onlyChars
 * @returns {string}
 */
export const uuid = (onlyChars = false): string => {
  let result = uuid0();
  if (onlyChars) {
    while (/[0-9]{1,}/.test(result)) {
      result = Math.random().toString(36).replace(/[^a-z]+/g, '');
    }
  }
  return result;
};

/**
 * @stable [28.07.2020]
 * @param objects
 */
export const makeUniqueValueableObjects =
  <TObject extends IValueWrapper = IValueWrapper>(...objects: TObject[]): TObject[] =>
    objects.map((object, index): TObject => ({...object as {}, value: index} as TObject));

/**
 * @stable [16.06.2020]
 */
export class UuidUtils {
  public static readonly uniqueValueableObjects = makeUniqueValueableObjects;
  public static readonly uuid = uuid;
}
