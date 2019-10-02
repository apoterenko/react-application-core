import { IMultiEntityStorageSetEntity } from '../definition';

/**
 * @deprecated
 */
export interface IApplicationStorageHelper {
  saveFiles<TEntity>(changes: TEntity, fields: Array<(entity: TEntity) => string>): Promise<IMultiEntityStorageSetEntity[]>;
}
