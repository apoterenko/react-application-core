import { AnyT } from '../definition.interface';

export interface IApplicationStorage {
  enabled: boolean;
  disabled: boolean;
  set(key: string, value: AnyT): Promise<AnyT>;
  get(key: string): AnyT;
  remove(key: string, noPrefix?: boolean): Promise<AnyT>;
  each(command: (o: AnyT, key: string) => void): void;
}

export enum ApplicationStorageTypeEnum {
  SESSION,
  LOCAL,
}

export const STORAGE_KEY_SEPARATOR = '#';
export const APPLICATION_STATE_KEY = '$$state';
export const APPLICATION_TOKEN_KEY = `${APPLICATION_STATE_KEY}.token`;
