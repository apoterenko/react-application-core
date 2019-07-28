import { AnyT } from '../definitions.interface';
import { ifNotNilThanValue, nvl } from '../util';
import { ISettings } from '../settings';
import { IStorage, STORAGE_KEY_SEPARATOR } from '../storage';
import { StorageTypeEnum } from '../definition';

export class DefaultStorage implements IStorage {

  /**
   * @stable [28.07.2019]
   * @param {string} prefix
   * @param {() => ISettings} settingsProvider
   * @param {StorageTypeEnum} storageType
   */
  constructor(private prefix: string,
              private settingsProvider: () => ISettings,
              private storageType?: StorageTypeEnum) {
  }

  /**
   * @stable [28.07.2019]
   * @param {string} key
   * @param {AnyT} value
   * @returns {Promise<boolean>}
   */
  public set(key: string, value: AnyT): Promise<boolean> {
    this.storage.setItem(this.toKey(key), JSON.stringify(value));
    return Promise.resolve(true);
  }

  /**
   * @stable [28.07.2019]
   * @param {string} key
   * @returns {Promise<AnyT>}
   */
  public get(key: string): Promise<AnyT> {
    return Promise.resolve(ifNotNilThanValue(this.storage.getItem(this.toKey(key)), (v) => JSON.parse(v)));
  }

  /**
   * @stable [28.07.2019]
   * @param {string} key
   * @param {boolean} noPrefix
   * @returns {Promise<boolean>}
   */
  public remove(key: string, noPrefix?: boolean): Promise<boolean> {
    this.storage.removeItem(noPrefix ? key : this.toKey(key));
    return Promise.resolve(true);
  }

  /**
   * @stable [28.07.2019]
   * @param {(key: string, value: AnyT) => void} callback
   */
  public each(callback: (key: string, value: AnyT) => void): void {
    const storage = this.storage;
    for (let i = 0; i < storage.length; i++) {
      const key = storage.key(i);
      callback(this.toKey(key), storage.getItem(key));
    }
  }

  /**
   * @stable [28.07.2019]
   * @returns {Storage}
   */
  private get storage(): Storage {
    const settings = this.settingsProvider();
    switch (nvl(this.storageType, settings && settings.persistenceStorage)) {
      case StorageTypeEnum.SESSION:
        return sessionStorage;
      default:
        return localStorage;
    }
  }

  /**
   * @stable [28.07.2019]
   * @param {string} key
   * @returns {string}
   */
  private toKey(key: string): string {
    return [this.prefix, key].join(STORAGE_KEY_SEPARATOR);
  }
}
