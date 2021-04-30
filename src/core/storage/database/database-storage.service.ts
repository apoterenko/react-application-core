import 'localforage';
import { LoggerFactory } from 'ts-smart-logger';

import { BaseStorage } from '../base-storage.service';

export class DatabaseStorage extends BaseStorage {

  private static readonly logger = LoggerFactory.makeLogger('DatabaseStorage');

  /**
   * @stable [29.04.2021]
   * @param instance
   * @param prefix
   */
  constructor(private instance: LocalForage,
              prefix: string) {
    super(prefix);
  }

  /**
   * @stable [29.04.2021]
   * @param key
   * @param value
   */
  public async set(key: string, value: unknown): Promise<boolean> {
    const fullKey = this.asFullKey(key);
    try {
      await this.instance.setItem(fullKey, value);
    } catch (e) {
      DatabaseStorage.logger.error(`[$DatabaseStorage][set] Error:`, e);
      return false;
    }
    return true;
  }

  /**
   * @stable [29.04.2021]
   * @param key
   */
  public async get(key: string): Promise<unknown> {
    const fullKey = this.asFullKey(key);
    return this.instance.getItem(fullKey);
  }

  /**
   * @stable [29.04.2021]
   * @param key
   * @param noPrefix
   */
  public remove(key: string, noPrefix?: boolean): Promise<void> {
    const fullKey = this.asFullKey(key, noPrefix);
    return this.instance.removeItem(fullKey);
  }

  /**
   * @stable [29.04.2021]
   * @param callback
   */
  public each(callback: (value: unknown, key: string) => void): void {
    this.instance.iterate((v, k) => callback(v, k));
  }
}
