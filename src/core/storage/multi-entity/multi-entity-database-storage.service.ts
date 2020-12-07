import { injectable } from 'inversify';

import {
  IMultiEntityStorageSetEntity,
  IReduxMultiEntity,
  IStorage,
} from '../../definition';
import {
  DI_TYPES,
  lazyInject,
} from '../../di';
import { MultiEntityStorage } from './multi-entity-storage.service';

@injectable()
export class MultiEntityDatabaseStorage implements IStorage {
  @lazyInject(DI_TYPES.DatabaseStorage) private readonly databaseStorage: IStorage;
  @lazyInject(DI_TYPES.FileStorage) private readonly fileStorage: IStorage;

  /**
   * @stable [03.12.2020]
   * @param key
   * @param entity
   */
  public async set(key: string, entity: IReduxMultiEntity): Promise<IMultiEntityStorageSetEntity> {
    const ids = new Set<string>();
    const delegateStorage = new MultiEntityStorage(
      this.fileStorage,
      (itm) => {
        const id = String(itm.id);
        ids.add(id);
        return this.databaseStorage.get(id);
      }
    );
    return {
      ...await delegateStorage.set(key, entity),
      callback: () => Array.from(ids).map((id) => this.databaseStorage.remove(id)),
    };
  }
}
