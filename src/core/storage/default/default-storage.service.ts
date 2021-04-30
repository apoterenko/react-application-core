import { AnyT } from '../../definitions.interface';
import { BaseStorage } from '../base-storage.service';
import {
  JsonUtils,
  nvl,
} from '../../util';
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
   * @stable [07.10.2020]
   * @param key
   * @param value
   */
  public async set(key: string, value: unknown): Promise<boolean> {
    this.storage.setItem(this.asFullKey(key), JsonUtils.serializeJson(value));
    return true;
  }

  /**
   * @stable [13.03.2020]
   * @param {string} key
   * @param {boolean} noPrefix
   * @returns {Promise<AnyT>}
   */
  public async get(key: string, noPrefix?: boolean): Promise<AnyT> {
    const data = await this.storage.getItem(this.asFullKey(key, noPrefix));
    return JsonUtils.parseJson(data);
  }

  /**
   * @stable [28.07.2019]
   * @param {string} key
   * @param {boolean} noPrefix
   * @returns {Promise<boolean>}
   */
  public async remove(key: string, noPrefix?: boolean): Promise<void> {
    this.storage.removeItem(this.asFullKey(key, noPrefix));
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
  public get storage(): Storage {
    const settings = this.settingsProvider();
    switch (nvl(this.storageType, settings && settings.persistenceStorage)) {
      case StorageTypesEnum.SESSION:
        return sessionStorage;
      default:
        return localStorage;
    }
  }
}
