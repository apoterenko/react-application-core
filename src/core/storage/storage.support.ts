import {
  IMultiEntityStorageSetEntity,
} from '../definition';
import { orUndef } from '../util';

/**
 * @deprecated Use asSingleAddedFileId
 */
export const extractIdFromSetFilesResult = (result: IMultiEntityStorageSetEntity): string => orUndef<string>(
  result && result.addedFiles.length,
  (): string => result.addedFiles[0].id
);
