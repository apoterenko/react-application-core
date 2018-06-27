import { injectable } from 'inversify';

import { IApplicationStorageHelper } from './storage.interface';
import { lazyInject, DI_TYPES } from '../di';
import { IApplicationStorage, ISetFilesResult } from './storage.interface';
import { isDef, orNull } from '../util';
import { UNDEF } from '../definitions.interface';

@injectable()
export class StorageHelper implements IApplicationStorageHelper {
  @lazyInject(DI_TYPES.CloudFileStorage) private fileStorage: IApplicationStorage;

  /**
   * @stable [28.06.2018]
   * @param {TEntity} changes
   * @param {Array<(entity: TEntity) => string>} fields
   * @returns {Promise<ISetFilesResult[]>}
   */
  public saveFiles<TEntity>(changes: TEntity, fields: Array<(entity: TEntity) => string>): Promise<ISetFilesResult[]> {
    const tasks: Array<Promise<ISetFilesResult>> = [];

    fields.forEach((fieldValueResolver) => {
      const fieldValueChange = fieldValueResolver(changes);
      if (isDef(fieldValueChange)) {
        tasks.push(this.fileStorage.set('', fieldValueChange));
      } else if (fields.length > 1) {
        tasks.push(Promise.resolve(UNDEF));
      }
    });
    return orNull<Promise<ISetFilesResult[]>>(tasks.length > 0, () => Promise.all<ISetFilesResult>(tasks));
  }
}
