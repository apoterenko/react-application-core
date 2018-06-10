import { EntityIdT } from '../definitions.interface';
import { isString } from './type';

export const EAN_MAX_LENGTH = 12;

/**
 * @stable [11.06.2018]
 * @param {EntityIdT} value
 * @returns {string}
 */
export const toBarcode = (value: EntityIdT): string => {
  const currentBarcode: string = isString(value) ? value as string : String(value);
  return currentBarcode.length === EAN_MAX_LENGTH
    ? currentBarcode
    : Array.from('0'.repeat(EAN_MAX_LENGTH - currentBarcode.length)).join('') + currentBarcode;
};
