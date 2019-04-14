import { Base64 } from 'js-base64';

/**
 * @stable [14.04.2019]
 * @param {string} str
 * @returns {string}
 */
export const stringToBase64 = (str: string): string => Base64.encode(str);

/**
 * @stable [14.04.2019]
 * @param {string} base64
 * @returns {string}
 */
export const base64ToString = (base64: string): string => Base64.decode(base64);
