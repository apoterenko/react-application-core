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

export interface IStorage {
  enabled?: boolean;
  disabled?: boolean;
  set(key: string, value: AnyT): Promise<AnyT>;
  get?(key: string): Promise<AnyT>;
  remove?(key: string, noPrefix?: boolean): Promise<AnyT>;
  each?(command: (o: AnyT, key: string) => void): void;
}

/**
 * @stable [28.06.2018]
 */
export interface IApplicationStorageHelper {
  saveFiles<TEntity>(changes: TEntity, fields: Array<(entity: TEntity) => string>): Promise<ISetFilesResult[]>;
}

export enum ApplicationStorageTypeEnum {
  SESSION,
  LOCAL,
}

export const STORAGE_KEY_SEPARATOR = '#';
export const APPLICATION_STATE_KEY = '$$state';
export const APPLICATION_TOKEN_KEY = `${APPLICATION_STATE_KEY}.token`;
export const APPLICATION_UUID_KEY = `${APPLICATION_STATE_KEY}.app.uuid`;
