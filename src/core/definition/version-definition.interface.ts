import {
  IFilesWrapper,
  IUuidWrapper,
} from '../definitions.interface';
import { uuid } from '../util/uuid';

/**
 * @stable [16.09.2019]
 */
export interface IVersionMetaFilesEntity
  extends IUuidWrapper,
    IFilesWrapper<string[]> {
}

/**
 * @stable [16.09.2019]
 */
export interface IVersionProcessor {
  processNewVersionUuidAndGetResult(): Promise<boolean>;
}

/**
 * @stable [16.09.2019]
 */
export const VERSION_PROCESSOR_LOADING_INFO_OPERATION_UUID = uuid();
