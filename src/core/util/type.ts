import {
  AnyT,
  IMAGE_JPG_FORMAT,
  IMAGE_JPEG_FORMAT,
  IMAGE_PNG_FORMAT,
  APPLICATION_PDF_FORMAT,
} from '../definitions.interface';

/**
 * @stable [02.10.2019]
 * @param {AnyT} value
 * @returns {boolean}
 */
export const isDef = (value: AnyT): boolean => !isUndef(value);

/**
 * @stable [02.10.2019]
 * @param {AnyT} value
 * @returns {boolean}
 */
export const isUndef = (value: AnyT): boolean => typeof value === 'undefined';

export function isNull(value: AnyT): boolean {
  return value === null;
}

/**
 * @stable [02.10.2019]
 * @param {AnyT} value
 * @returns {boolean}
 */
export const isFn = (value: AnyT): boolean => typeof value === 'function';

/**
 * @stable [01.08.2018]
 * @param {AnyT} value
 * @returns {boolean}
 */
export const isNumber = (value: AnyT): boolean => typeof value === 'number';

/**
 * @stable [01.08.2018]
 * @param {AnyT} value
 * @returns {boolean}
 */
export const isNumberLike = (value: AnyT): boolean => /^-?[0-9]\d*(\.\d+)?$/.test(String(value));

export function isBoolean(value: AnyT): boolean {
  return typeof value === 'boolean';
}

/**
 * @stable [23.09.2019]
 * @param {AnyT} value
 * @returns {boolean}
 */
export const isString = (value: AnyT): boolean => typeof value === 'string';

export const isPrimitive = (v: AnyT): boolean => {
  return isNumber(v)
      || isString(v)
      || isBoolean(v);
};

export const isObject = (v: AnyT): boolean => {
  return Object.prototype.toString.call(v) === '[object Object]';
};

/**
 * @stable [06.12.2018]
 * @param {TResult} result
 * @returns {TResult}
 */
export const toType = <TResult>(result: TResult): TResult => result;

/**
 * @stable [29.01.2019]
 * @param {string} format
 * @returns {boolean}
 */
export const isImageFileFormat = (format: string): boolean => [
  IMAGE_JPG_FORMAT,
  IMAGE_JPEG_FORMAT,
  IMAGE_PNG_FORMAT
].includes(format);

/**
 * @stable [29.01.2019]
 * @param {string} format
 * @returns {boolean}
 */
export const isPdfFileFormat = (format: string): boolean => [
  APPLICATION_PDF_FORMAT
].includes(format);
