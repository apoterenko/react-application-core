import {
  DefaultEntities,
  IEnvironment,
  IMultiEntityStorageSetEntity,
  MultiFieldSingleValueT,
} from '../definition';
import { ConditionUtils } from './cond';
import { FilterUtils } from './filter';
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
const asSingleAddedFileId = (result: IMultiEntityStorageSetEntity): string =>
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
 * @stable [10.09.2020]
 * @param env
 */
const asNotVersionedKey = (env: IEnvironment): string =>
  FilterUtils
    .notEmptyValuesArrayFilter(env.appProfile, env.port, env.normalizedBasePath)
    .join(DefaultEntities.PATH_SEPARATOR);

/**
 * @stable [10.09.2020]
 * @param env
 */
const asVersionedKey = (env: IEnvironment): string =>
  FilterUtils
    .notEmptyValuesArrayFilter(env.appVersion, asNotVersionedKey(env))
    .join(DefaultEntities.PATH_SEPARATOR);

/**
 * @stable [04.09.2020]
 */
export class StorageUtils {
  public static readonly asNotVersionedKey = asNotVersionedKey;
  public static readonly asSingleAddedFileId = asSingleAddedFileId;
  public static readonly asVersionedKey = asVersionedKey;
  public static readonly entitiesAsStorageTasks = entitiesAsStorageTasks;
}
