import {
  STORAGE_KEY_SEPARATOR,
  IMultiEntityStorageResult,
} from './storage.interface';
import { notNilValuesArrayFilter, orUndef } from '../util';

/**
 * @stable [29.07.2019]
 * @param {string} parts
 * @returns {string}
 */
export const toStorageKeyPrefix = (...parts: string[]): string =>
  notNilValuesArrayFilter(...parts).join(STORAGE_KEY_SEPARATOR);

/**
 * @stable [27.06.2018]
 * @param {IMultiEntityStorageResult} result
 * @returns {string}
 */
export const extractIdFromSetFilesResult = (result: IMultiEntityStorageResult): string => orUndef<string>(
  result && result.addResults.length,
  (): string => result.addResults[0].id
);
