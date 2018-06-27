import {
  STORAGE_KEY_SEPARATOR,
  ISetFilesResult,
} from './storage.interface';
import { orUndef } from '../util';

export const joinStorageKeyPrefix = (...parts: string[]) => parts.filter((v) => !!v).join(STORAGE_KEY_SEPARATOR);

/**
 * @stable [27.06.2018]
 * @param {ISetFilesResult} result
 * @returns {string}
 */
export const extractIdFromSetFilesResult = (result: ISetFilesResult): string => orUndef<string>(
  result && result.setFilesResults.length,
  (): string => result.setFilesResults[0].id
);
