import { IKeyValue } from '../definitions.interface';

/**
 * @stable [17.09.2019]
 * @param {IKeyValue} o
 * @param {number} space
 * @returns {string}
 */
export const formatJson = (o: IKeyValue, space = 4) => JSON.stringify(o, null, space);

export const parseJson = (o: string): IKeyValue => {
  try {
    return JSON.parse(o);
  } catch (e) {
    return null;
  }
};
