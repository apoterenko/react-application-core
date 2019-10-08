import { AnyT } from '../../definitions.interface';
import { BaseStorage } from '../base-storage.service';
import { ifNotNilThanValue, nvl } from '../../util';
import { ISettingsEntity } from '../../settings';
import { StorageTypesEnum } from '../../definition';

export class DefaultStorage extends BaseStorage {

  /**
   * @stable [28.07.2019]
   * @param {string} prefix
   * @param {() => ISettings} settingsProvider
   * @param {StorageTypesEnum} storageType
   */
  constructor(prefix: string,
              private settingsProvider: () => ISettingsEntity,
              private storageType?: StorageTypesEnum) {
    super(prefix);
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
  public remove(key: string, noPrefix?: boolean): Promise<void> {
    this.storage.removeItem(noPrefix ? key : this.toKey(key));
    return Promise.resolve();
  }

  /**
   * @stable [25.09.2019]
   * @param {(value: AnyT, key: string) => void} callback
   */
  public each(callback: (value: AnyT, key: string) => void): void {
    const storage = this.storage;
    for (let i = 0; i < storage.length; i++) {
      const key = storage.key(i);
      callback(storage.getItem(key), key);
    }
  }

  /**
   * @stable [28.07.2019]
   * @returns {Storage}
   */
  private get storage(): Storage {
    const settings = this.settingsProvider();
    switch (nvl(this.storageType, settings && settings.persistenceStorage)) {
      case StorageTypesEnum.SESSION:
        return sessionStorage;
      default:
        return localStorage;
    }
  }
}
