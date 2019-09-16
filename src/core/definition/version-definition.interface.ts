import {
  IFilesWrapper,
  IUuidWrapper,
} from '../definitions.interface';

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
