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

/**
 * @stable [28.07.2019]
 */
export interface IStorage {
  set(key: string, value: AnyT): Promise<AnyT>;
  get?(key: string): Promise<AnyT>;
  remove?(key: string, noPrefix?: boolean): Promise<void>;
  each?(command: (o: AnyT, key: string) => void): void;
}

export interface IApplicationStorageHelper {
  saveFiles<TEntity>(changes: TEntity, fields: Array<(entity: TEntity) => string>): Promise<IMultiEntityStorageResult[]>;
}

/**
 * @stable [29.07.2019]
 */
export const STORAGE_KEY_SEPARATOR = '#';
export const STORAGE_APP_STATE_KEY = '$$state';
export const STORAGE_APP_TOKEN_KEY = `${STORAGE_APP_STATE_KEY}.app.token`;
export const STORAGE_APP_UUID_KEY = `${STORAGE_APP_STATE_KEY}.app.uuid`;
export const NOT_VERSIONED_STORAGE_KEY = toStorageKeyPrefix(ENV.appProfile, ENV.port, ENV.normalizedBasePath);
export const VERSIONED_STORAGE_KEY = toStorageKeyPrefix(ENV.appVersion, ENV.appProfile, ENV.port, ENV.normalizedBasePath);
