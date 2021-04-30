import {
  DefaultEntities,
  IStorage,
} from '../definition';

export abstract class BaseStorage implements IStorage {

  /**
   * @stable [29.04.2021]
   * @param prefix
   */
  protected constructor(protected prefix: string) {
  }

  /**
   * @stable [29.04.2021]
   * @param key
   * @param value
   */
  public abstract set(key: string, value: unknown): Promise<boolean>;

  /**
   * @stable [29.04.2021]
   * @param key
   * @param noPrefix
   */
  protected asFullKey(key: string, noPrefix?: boolean): string {
    return noPrefix
      ? key
      : [this.prefix, key].join(DefaultEntities.PATH_SEPARATOR);
  }
}
