import {
  DefaultEntities,
  IStorage,
} from '../definition';

export abstract class BaseStorage implements IStorage {

  /**
   * @stable [10.09.2020]
   * @param prefix
   * @protected
   */
  protected constructor(protected prefix: string) {
  }

  /**
   * @stable [10.09.2020]
   * @param key
   * @param value
   */
  public abstract set(key: string, value: unknown): Promise<boolean>;

  /**
   * @stable [10.09.2020]
   * @param key
   * @param noPrefix
   * @protected
   */
  protected toKey(key: string, noPrefix?: boolean): string {
    return noPrefix ? key : [this.prefix, key].join(DefaultEntities.PATH_SEPARATOR);
  }
}
