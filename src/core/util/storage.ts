import {
  IReduxMultiEntity,
  IMultiEntityStorageSetEntity,
  MultiFieldSingleValueT,
} from '../definition';
import { isDef } from './type';
import { isObjectNotEmpty } from './object';
import { orNull, ifNotNilThanValue } from './cond';
import {
  IEntity,
  UNDEF_SYMBOL,
} from '../definitions.interface';
import { uuid } from './uuid';

/**
 * @stable [02.10.2019]
 * @param {TEntity} changes
 * @param {Array<(entity: TEntity) => MultiFieldSingleValueT>} fieldsValuesResolvers
 * @param {(fileName: string, value: MultiFieldSingleValueT) => Promise<IMultiEntityStorageSetEntity>} storageProcessor
 * @returns {Promise<IMultiEntityStorageSetEntity[]>}
 */
export const entitiesAsStorageTasks =
  <TEntity>(changes: TEntity,
            fieldsValuesResolvers: Array<(entity: TEntity) => MultiFieldSingleValueT>,
            storageProcessor: (fileName: string, value: MultiFieldSingleValueT) =>
              Promise<IMultiEntityStorageSetEntity>): Promise<IMultiEntityStorageSetEntity[]> => {
    const tasks = [];
    fieldsValuesResolvers.forEach((fieldValueResolver, index) => {
      const fieldValueChange = fieldValueResolver(changes);
      tasks.push(
        orNull(isDef(fieldValueChange), () => storageProcessor(uuid(), fieldValueChange))
      );
    });
    return orNull(isObjectNotEmpty(tasks), () => Promise.all(tasks));
  };

/**
 * @stable [02.10.2019]
 * @param {IMultiEntityStorageSetEntity} result
 * @returns {string}
 */
export const asSingleAddedFileId = (result: IMultiEntityStorageSetEntity): string =>
  ifNotNilThanValue(
    result,
    () => (
      ifNotNilThanValue(
        result.addedFiles[0],
        (entity) => entity.id,
        UNDEF_SYMBOL
      )
    ),
    UNDEF_SYMBOL
  );
