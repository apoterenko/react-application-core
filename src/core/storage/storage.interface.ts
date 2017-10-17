export interface IApplicationStorageService {
  enabled: boolean;
  disabled: boolean;
  set(key: string, value: any): any;
  get(key: string): any;
  remove(key: string): void;
  clear(): void;
  transact(key: string, defaultValue: any, transactionFn?: (val: any) => void): void;
  getAll(): any;
  serialize(value: any): string;
  deserialize(value: string): any;
  forEach(command: (key: string, value: any) => void): void;
}

export const APPLICATION_STATE_KEY = '$$state';
export const APPLICATION_TOKEN_KEY = `${APPLICATION_STATE_KEY}.token`;
