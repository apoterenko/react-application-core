import { injectable } from 'inversify';

import { IApplicationStorageHelper } from './storage.interface';
import { lazyInject } from '../di';
import { IStorage, IMultiEntityStorageSetEntity } from '../definition';
import { isDef, orNull } from '../util';
import { UNDEF } from '../definitions.interface';
import { MultiEntityDatabaseStorage } from './multi-entity';

/**
 * @deprecated
 */
@injectable()
export class StorageHelper implements IApplicationStorageHelper {
  @lazyInject(MultiEntityDatabaseStorage) private storage: IStorage;

  /**
   * @deprecated
   */
  public saveFiles<TEntity>(changes: TEntity, fields: Array<(entity: TEntity) => string>): Promise<IMultiEntityStorageSetEntity[]> {
    const tasks: Array<Promise<IMultiEntityStorageSetEntity>> = [];

    fields.forEach((fieldValueResolver) => {
      const fieldValueChange = fieldValueResolver(changes);
      if (isDef(fieldValueChange)) {
        tasks.push(this.storage.set('', fieldValueChange));
      } else if (fields.length > 1) {
        tasks.push(Promise.resolve(UNDEF));
      }
    });
    return orNull<Promise<IMultiEntityStorageSetEntity[]>>(tasks.length > 0, () => Promise.all<IMultiEntityStorageSetEntity>(tasks));
  }
}
