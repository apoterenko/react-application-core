import { injectable } from 'inversify';

import { IApplicationStorageHelper } from './storage.interface';
import { lazyInject } from '../di';
import { IMultiEntityStorageResult } from './storage.interface';
import { IStorage } from '../definition';
import { isDef, orNull } from '../util';
import { UNDEF } from '../definitions.interface';
import { MultiEntityDatabaseStorage } from './multi-entity';

@injectable()
export class StorageHelper implements IApplicationStorageHelper {
  @lazyInject(MultiEntityDatabaseStorage) private storage: IStorage;

  /**
   * @stable [28.06.2018]
   * @param {TEntity} changes
   * @param {Array<(entity: TEntity) => string>} fields
   * @returns {Promise<IMultiEntityStorageResult[]>}
   */
  public saveFiles<TEntity>(changes: TEntity, fields: Array<(entity: TEntity) => string>): Promise<IMultiEntityStorageResult[]> {
    const tasks: Array<Promise<IMultiEntityStorageResult>> = [];

    fields.forEach((fieldValueResolver) => {
      const fieldValueChange = fieldValueResolver(changes);
      if (isDef(fieldValueChange)) {
        tasks.push(this.storage.set('', fieldValueChange));
      } else if (fields.length > 1) {
        tasks.push(Promise.resolve(UNDEF));
      }
    });
    return orNull<Promise<IMultiEntityStorageResult[]>>(tasks.length > 0, () => Promise.all<IMultiEntityStorageResult>(tasks));
  }
}
