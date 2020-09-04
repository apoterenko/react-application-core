import {
  IMultiEntityStorageSetEntity,
  MultiFieldSingleValueT,
} from '../definition';
import { ConditionUtils } from './cond';
import { TypeUtils } from './type';
import { UNDEF_SYMBOL } from '../definitions.interface';
import { UuidUtils } from './uuid';

/**
 * @stable [04.09.2020]
 * @param changes
 * @param fieldsValuesResolvers
 * @param storageProcessor
 */
const entitiesAsStorageTasks = <TEntity>(
  changes: TEntity,
  fieldsValuesResolvers: ((entity: TEntity) => MultiFieldSingleValueT)[],
  storageProcessor: (fileName: string, value: MultiFieldSingleValueT) => Promise<IMultiEntityStorageSetEntity>
): Promise<IMultiEntityStorageSetEntity[]> =>
  Promise.all(
    fieldsValuesResolvers.map((fieldValueResolver) => {
      const fieldValueChange = fieldValueResolver(changes);
      return ConditionUtils.orNull(
        TypeUtils.isDef(fieldValueChange),
        () => storageProcessor(UuidUtils.uuid(), fieldValueChange)
      );
    })
  );

/**
 * @stable [04.09.2020]
 * @param result
 */
export const asSingleAddedFileId = (result: IMultiEntityStorageSetEntity): string =>
  ConditionUtils.ifNotNilThanValue(
    result,
    () => (
      ConditionUtils.ifNotNilThanValue(
        result.addedFiles[0],
        (entity) => entity.id,
        UNDEF_SYMBOL
      )
    ),
    UNDEF_SYMBOL
  );

/**
 * @stable [04.09.2020]
 */
export class StorageUtils {
  public static readonly asSingleAddedFileId = asSingleAddedFileId;
  public static readonly entitiesAsStorageTasks = entitiesAsStorageTasks;
}
