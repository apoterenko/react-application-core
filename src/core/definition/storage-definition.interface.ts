import { AnyT } from '../definitions.interface';
import { ENV } from '../env';
import { joinStoragePrefix } from '../util/join';

/**
 * @stable [16.09.2019]
 */
export const STORAGE_PATH_SEPARATOR = '#';
export const STORAGE_APP_STATE_KEY = '$$state';
export const STORAGE_APP_UUID_KEY = `${STORAGE_APP_STATE_KEY}.app.uuid`;
export const STORAGE_APP_TOKEN_KEY = `${STORAGE_APP_STATE_KEY}.app.token`;
export const STORAGE_NOT_VERSIONED_KEY = joinStoragePrefix(ENV.appProfile, ENV.port, ENV.normalizedBasePath);
export const STORAGE_VERSIONED_KEY = joinStoragePrefix(ENV.appVersion, STORAGE_NOT_VERSIONED_KEY);

/**
 * @stable [28.07.2019]
 */
export enum StorageTypesEnum {
  SESSION,
  LOCAL,
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
