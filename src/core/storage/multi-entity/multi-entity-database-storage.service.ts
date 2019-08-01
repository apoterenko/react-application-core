import { IMultiEntity } from '../../entities-definitions.interface';
import { IMultiEntityStorageResult, IStorage } from '../storage.interface';
import { lazyInject, DI_TYPES, provideInSingleton } from '../../di';
import { MultiEntityStorage } from './multi-entity-storage.service';

@provideInSingleton(MultiEntityDatabaseStorage)
export class MultiEntityDatabaseStorage implements IStorage {

  @lazyInject(DI_TYPES.FileStorage) private readonly fileStorage: IStorage;
  @lazyInject(DI_TYPES.DatabaseStorage) private readonly databaseStorage: IStorage;

  /**
   * @stable [30.07.2019]
   * @param {string} key
   * @param {IMultiEntity} entity
   * @returns {Promise<IMultiEntityStorageResult>}
   */
  public async set(key: string, entity: IMultiEntity): Promise<IMultiEntityStorageResult> {
    const ids = new Set<string>();
    const delegateStorage = new MultiEntityStorage(
      this.fileStorage,
      (itm) => {
        const id = String(itm.id);
        ids.add(id);
        return this.databaseStorage.get(id);
      }
    );
    const result = await delegateStorage.set(key, entity);
    ids.forEach((id) => this.databaseStorage.remove(id));
    return result;
  }
}
