import {
  AnyT,
  IAddedFilesWrapper,
  IFilePathWrapper,
  IIdWrapper,
  IRemovedFilesWrapper,
} from '../definitions.interface';
import { ENV } from '../env';
import { NOT_EMPTY_VALUE_PREDICATE, filterArray } from '../util/filter';

/**
 * @stable [16.09.2019]
 */
export const STORAGE_PATH_SEPARATOR = '#';
export const STORAGE_APP_STATE_KEY = '$$state';
export const STORAGE_APP_UUID_KEY = `${STORAGE_APP_STATE_KEY}.app.uuid`;
export const STORAGE_APP_TOKEN_KEY = `${STORAGE_APP_STATE_KEY}.app.token`;
export const STORAGE_NOT_VERSIONED_KEY =
  filterArray([ENV.appProfile, ENV.port, ENV.normalizedBasePath], NOT_EMPTY_VALUE_PREDICATE).join(STORAGE_PATH_SEPARATOR);
export const STORAGE_VERSIONED_KEY =
  filterArray([ENV.appVersion, STORAGE_NOT_VERSIONED_KEY], NOT_EMPTY_VALUE_PREDICATE).join(STORAGE_PATH_SEPARATOR);

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
  each?(command: (value: AnyT, key: string) => void): void;
}

/**
 * @stable [02.10.2019]
 */
export interface IAddedFileEntity
  extends IIdWrapper<string>,
    IFilePathWrapper {
}

/**
 * @stable [02.10.2019]
 */
export interface IMultiEntityStorageSetEntity
  extends IAddedFilesWrapper<IAddedFileEntity[]>,
    IRemovedFilesWrapper<void[]> {
}
