import * as engine from 'store/src/store-engine';
import * as sessionStorage from 'store/storages/sessionStorage';
import * as localStorage from 'store/storages/localStorage';

const sessionStore = engine.createStore([sessionStorage]);
const localStore = engine.createStore([localStorage]);

import { ApplicationStorageTypeEnum, IApplicationStorage } from '../storage';
import { AnyT } from '../definition.interface';
import { appContainer, DI_TYPES } from '../di';
import { IApplicationSettings } from '../settings';

export class StorageService implements IApplicationStorage {

  constructor(private prefix: string,
              private storageType?: ApplicationStorageTypeEnum) {
  }

  set enabled(value: boolean) {
    this.storage.enabled = value;
  }

  get enabled(): boolean {
    return this.storage.enabled;
  }

  set disabled(value: boolean) {
    this.storage.disabled = value;
  }

  get disabled(): boolean {
    return this.storage.disabled;
  }

  public set(key: string, value: AnyT): AnyT {
    return this.storage.set(this.toKey(key), value);
  }

  public get(key: string): AnyT {
    return this.storage.get(this.toKey(key));
  }

  public remove(key: string, noPrefix?: boolean): void {
    if (noPrefix) {
      this.storage.remove(key);
    } else {
      this.storage.remove(this.toKey(key));
    }
  }

  public each(command: (key: string, value: AnyT) => void): void {
    this.storage.each((key, value) => command(this.toKey(key), value));
  }

  private get storage(): IApplicationStorage {
    const settings: IApplicationSettings = appContainer.get(DI_TYPES.Settings);
    const storageType: ApplicationStorageTypeEnum = this.storageType
        ? this.storageType
        : (settings && settings.persistenceStorage);

    switch (storageType) {
      case ApplicationStorageTypeEnum.SESSION:
        return sessionStore;
      default:
        return localStore;
    }
  }

  private toKey(key: string): string {
    return this.prefix + key;
  }
}
