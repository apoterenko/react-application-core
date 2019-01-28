import { StringNumberT } from '../definitions.interface';
import { isString } from './type';

/**
 * @stable [28.01.2019]
 * @param {string} before
 * @param {string} after
 * @returns {(matchedValue: string) => string}
 */
export const replacerFactory = (before: string, after: string): (matchedValue: string) => string =>
  (matchedValue) => `${before}${matchedValue}${after}`;

/**
 * @stable [28.01.2019]
 * @type {(matchedValue: string) => string}
 */
export const htmlStrongReplacer = replacerFactory('<b>', '</b>');

/**
 * @stable [28.01.2019]
 * @param {StringNumberT} inputValue
 * @param {string} replacedValue
 * @param {(matchedValue: string) => string} replacer
 * @param {string} flags
 * @returns {string}
 */
export const regexpReplace = (inputValue: StringNumberT,
                              replacedValue: string,
                              replacer: (matchedValue: string) => string,
                              flags = 'ig'): string =>
  (isString(inputValue)
    ? inputValue as string
    : String(inputValue)).replace(new RegExp(replacedValue, flags), replacer);

/**
 * @stable [28.01.2019]
 * @param {StringNumberT} inputValue
 * @param {string} replacedValue
 * @returns {string}
 */
export const strongHtmlReplace = (inputValue: StringNumberT,
                                  replacedValue: string): string =>
  regexpReplace(inputValue, replacedValue, htmlStrongReplacer);
