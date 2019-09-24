import {
  IMultiEntityStorageResult,
} from './storage.interface';
import { orUndef } from '../util';

/**
 * @stable [27.06.2018]
 * @param {IMultiEntityStorageResult} result
 * @returns {string}
 */
export const extractIdFromSetFilesResult = (result: IMultiEntityStorageResult): string => orUndef<string>(
  result && result.addResults.length,
  (): string => result.addResults[0].id
);
