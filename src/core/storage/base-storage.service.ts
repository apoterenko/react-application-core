import { AnyT } from '../definitions.interface';
import { IStorage } from '../definition';
import { STORAGE_KEY_SEPARATOR } from '../storage/storage.interface';

export abstract class BaseStorage implements IStorage {

  /**
   * @stable [29.07.2019]
   * @param {string} prefix
   */
  protected constructor(protected prefix: string) {
  }

  /**
   * @stable [29.07.2019]
   * @param {string} key
   * @param {AnyT} value
   * @returns {Promise<boolean>}
   */
  public abstract set(key: string, value: AnyT): Promise<boolean>;

  /**
   * @stable [28.07.2019]
   * @param {string} key
   * @returns {string}
   */
  protected toKey(key: string): string {
    return [this.prefix, key].join(STORAGE_KEY_SEPARATOR);
  }
}
