import { AnyT, IIdWrapper } from '../definitions.interface';
import { ENV } from '../env';
import { toStorageKeyPrefix } from './storage.support';

export interface ISetFileResult extends IIdWrapper<string> {
  filePath: string;
}

export interface IMultiEntityStorageResult {
  addResults: AnyT[];
  removeResults: void[];
}

export interface IApplicationStorageHelper {
  saveFiles<TEntity>(changes: TEntity, fields: Array<(entity: TEntity) => string>): Promise<IMultiEntityStorageResult[]>;
}

/**
 * @stable [29.07.2019]
 */
export const STORAGE_KEY_SEPARATOR = '#';
export const NOT_VERSIONED_STORAGE_KEY = toStorageKeyPrefix(ENV.appProfile, ENV.port, ENV.normalizedBasePath);
export const VERSIONED_STORAGE_KEY = toStorageKeyPrefix(ENV.appVersion, ENV.appProfile, ENV.port, ENV.normalizedBasePath);
