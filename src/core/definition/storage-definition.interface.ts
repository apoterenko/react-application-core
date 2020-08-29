import {
  ACTION_PREFIX,
  AnyT,
  IAddedFilesWrapper,
  IFilePathWrapper,
  IIdWrapper,
  IRemovedFilesWrapper,
} from '../definitions.interface';
import { ENV } from '../env/env.interface';
import { FilterUtils } from '../util/filter';

/**
 * @stable [24.09.2019]
 */
export enum StorageEventCategoriesEnum {
  STORAGE_ERROR = 'storage:error',
}

/**
 * @stable [24.09.2019]
 */
export enum StorageEventsEnum {
  SYNC_APP_STATE = 'sync:app:state',
}

/**
 * @stable [16.09.2019]
 */
export const STORAGE_PATH_SEPARATOR = '#';
export const STORAGE_NOT_VERSIONED_KEY =
  FilterUtils.notEmptyValuesArrayFilter(ENV.appProfile, ENV.port, ENV.normalizedBasePath).join(STORAGE_PATH_SEPARATOR);
export const STORAGE_VERSIONED_KEY =
  FilterUtils.notEmptyValuesArrayFilter(ENV.appVersion, STORAGE_NOT_VERSIONED_KEY).join(STORAGE_PATH_SEPARATOR);

/**
 * @stable [17.11.2019]
 */
export interface IStorageSettingsEntity {
  appStateKeyName?: string;
  appStateSyncEnabled?: boolean;
  appStateSyncTimeout?: number;
  authTokenKeyName?: string;
  versionUuidKeyName?: string;
}

/**
 * @stable [17.11.2019]
 */
export const DEFAULT_STORAGE_SETTINGS_ENTITY = Object.freeze<IStorageSettingsEntity>({
  appStateKeyName: '$$rac.state.a14e44d3',
  appStateSyncEnabled: true,
  appStateSyncTimeout: 2000,
  authTokenKeyName: '$$rac.token.2e45abd2',
  versionUuidKeyName: '$$rac.uuid.acd22d11',
});

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
export interface IStorage<TStorage = Storage> {
  storage?: TStorage;
  set(key: string, value: AnyT): Promise<AnyT>;
  get?(key: string, noPrefix?: boolean): Promise<AnyT>;
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

/**
 * @stable [17.11.2019]
 */
export const $RAC_STORAGE_REGISTER_SYNC_APP_STATE_TASK_ACTION_TYPE = `${ACTION_PREFIX}storage.register.sync.app.state.task`;
export const $RAC_STORAGE_SYNC_APP_STATE_ACTION_TYPE = `${ACTION_PREFIX}storage.sync.app.state`;
export const $RAC_STORAGE_UNREGISTER_SYNC_APP_STATE_TASK_ACTION_TYPE = `${ACTION_PREFIX}storage.unregister.sync.app.state.task`;
