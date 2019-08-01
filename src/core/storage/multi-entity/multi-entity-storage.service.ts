import { AnyT } from '../../definitions.interface';
import { IMultiEntityStorageResult, IStorage } from '../storage.interface';
import { IMultiItemEntity, IMultiEntity } from '../../entities-definitions.interface';

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
   * @returns {Promise<IMultiEntityStorageResult>}
   */
  public async set(key: string, entity: IMultiEntity): Promise<IMultiEntityStorageResult> {
    const result = await Promise.all<AnyT[], void[]>([
      this.clear(entity),
      this.add(entity)
    ]);
    return {
      removeResults: result[0],
      addResults: result[1],
    };
  }

  /**
   * @stable [30.07.2019]
   * @param {IMultiEntity} entity
   * @returns {Promise<AnyT[]>}
   */
  private async add(entity: IMultiEntity): Promise<AnyT[]> {
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
