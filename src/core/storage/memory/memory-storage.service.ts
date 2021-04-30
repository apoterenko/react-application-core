import { IStorage } from '../../definition';
import { BaseStorage } from '../base-storage.service';

export class MemoryStorage extends BaseStorage
  implements IStorage<IStorage> {

  private readonly map = new Map<string, unknown>();

  /**
   * @stable [29.04.2021]
   * @param prefix
   */
  constructor(prefix: string) {
    super(prefix);
  }

  /**
   * @stable [29.04.2021]
   * @param key
   * @param entity
   */
  public async set(key: string, entity: unknown): Promise<boolean> {
    this.map.set(this.asFullKey(key), entity);
    return true;
  }

  /**
   * @stable [29.04.2021]
   * @param key
   */
  public async get(key: string): Promise<unknown> {
    return this.map.get(this.asFullKey(key));
  }

  /**
   * @stable [29.04.2021]
   * @param key
   * @param noPrefix
   */
  public async remove(key: string, noPrefix?: boolean): Promise<void> {
    this.map.delete(this.asFullKey(key, noPrefix));
  }
}
