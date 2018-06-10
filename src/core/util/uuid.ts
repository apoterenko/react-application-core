import * as uuid0 from 'uuid';

/**
 * @stable [11.06.2018]
 * @param {boolean} onlyChars
 * @returns {string}
 */
export function uuid(onlyChars = false) {
  let result = uuid0();
  if (onlyChars) {
    while (/[0-9]{1,}/.test(result)) {
      result = Math.random().toString(36).replace(/[^a-z]+/g, '');
    }
  }
  return result;
}
