import { AnyT } from '../../definitions.interface';
import {
  IAddedFileEntity,
  IMultiEntity,
  IMultiEntityStorageSetEntity,
  IMultiItemEntity,
  IStorage,
} from '../../definition';

export class MultiEntityStorage implements IStorage {

  /**
   * @stable [30.07.2019]
   * @param {IStorage} storage
   * @param {(entity: IMultiItemEntity) => Promise<any>} multiEntityProcessor
   */
  constructor(private storage: IStorage,
              private multiEntityProcessor = (entity: IMultiItemEntity) => Promise.resolve(entity.value)) {
  }

  /**
   * @stable [30.07.2019]
   * @param {string} key
   * @param {IMultiEntity} entity
   * @returns {Promise<IMultiEntityStorageSetEntity>}
   */
  public async set(key: string, entity: IMultiEntity): Promise<IMultiEntityStorageSetEntity> {
    const result = await Promise.all<void[], IAddedFileEntity[]>([
      this.clear(entity),
      this.add(entity)
    ]);
    return {
      addedFiles: result[1],
      removedFiles: result[0],
    };
  }

  /**
   * @stable [30.07.2019]
   * @param {IMultiEntity} entity
   * @returns {Promise<AnyT[]>}
   */
  private async add(entity: IMultiEntity): Promise<IAddedFileEntity[]> {
    const payloads = entity.add;
    const entitiesTasks = await Promise.all(payloads.map((itm) => this.multiEntityProcessor(itm)));

    return Promise.all(
      entitiesTasks.map((itm, index) => this.storage.set(String(payloads[index].id), itm))
    );
  }

  /**
   * @stable [30.07.2019]
   * @param {IMultiEntity} entity
   * @returns {Promise<void[]>}
   */
  private clear(entity: IMultiEntity): Promise<void[]> {
    const clearTasks = entity.remove.map((itm) => this.storage.remove(String(itm.id)));
    return Promise.all(clearTasks);
  }
}
