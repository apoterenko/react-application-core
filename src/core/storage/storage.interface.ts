import { AnyT, IIdWrapper } from '../definitions.interface';

export interface ISetFileResult extends IIdWrapper<string> {
  filePath: string;
}

export interface IRemoveFileResult {
}

export interface ISetFilesResult {
  setFilesResults: ISetFileResult[];
  removeFilesResults: IRemoveFileResult[];
}

/**
 * @stable [28.07.2019]
 */
export interface IStorage {
  set(key: string, value: AnyT): Promise<AnyT>;
  get?(key: string): Promise<AnyT>;
  remove?(key: string, noPrefix?: boolean): Promise<AnyT>;
  each?(command: (o: AnyT, key: string) => void): void;
}

export interface IApplicationStorageHelper {
  saveFiles<TEntity>(changes: TEntity, fields: Array<(entity: TEntity) => string>): Promise<ISetFilesResult[]>;
}

export const STORAGE_KEY_SEPARATOR = '#';
export const STORAGE_APP_STATE_KEY = '$$state';
export const STORAGE_APP_TOKEN_KEY = `${STORAGE_APP_STATE_KEY}.app.token`;
export const STORAGE_APP_UUID_KEY = `${STORAGE_APP_STATE_KEY}.app.uuid`;
