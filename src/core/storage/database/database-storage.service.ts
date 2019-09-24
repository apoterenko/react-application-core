import 'localforage';

import { AnyT } from '../../definitions.interface';
import { BaseStorage } from '../base-storage.service';

export class DatabaseStorage extends BaseStorage {

  /**
   * @stable [28.07.2019]
   * @param {string} prefix
   * @param {LocalForage} instance
   */
  constructor(private instance: LocalForage,
              prefix: string) {
    super(prefix);
  }

  /**
   * @stable [29.07.2019]
   * @param {string} key
   * @param {AnyT} value
   * @returns {Promise<boolean>}
   */
  public set(key: string, value: AnyT): Promise<boolean> {
    return this.instance.setItem(this.toKey(key), value);
  }

  /**
   * @stable [28.07.2019]
   * @param {string} key
   * @returns {Promise<AnyT>}
   */
  public async get(key: string): Promise<AnyT> {
    return this.instance.getItem(this.toKey(key));
  }

  /**
   * @stable [28.07.2019]
   * @param {string} key
   * @param {boolean} noPrefix
   * @returns {Promise<boolean>}
   */
  public remove(key: string, noPrefix?: boolean): Promise<void> {
    return this.instance.removeItem(noPrefix ? key : this.toKey(key));
  }

  /**
   * @stable [25.09.2019]
   * @param {(value: AnyT, key: string) => void} callback
   */
  public each(callback: (value: AnyT, key: string) => void): void {
    this.instance.iterate((v, k) => callback(v, k));
  }
}
