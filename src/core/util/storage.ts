import {
  DefaultEntities,
  IEnvironment,
  IMultiEntityStorageSetEntity,
  MultiFieldSingleValueT,
} from '../definition';
import { ConditionUtils } from './cond';
import { FilterUtils } from './filter';
import { TypeUtils } from './type';
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
 * @stable [24.12.2020]
 * @param result
 */
const asSingleAddedFileId = (result: IMultiEntityStorageSetEntity): string => result?.addedFiles[0]?.id;

/**
 * @stable [10.09.2020]
 * @param env
 */
const asNotVersionedKey = (env: IEnvironment): string =>
  FilterUtils
    .notEmptyObjectValuesArrayFilter(env.appProfile, env.port, env.normalizedBasePath)
    .join(DefaultEntities.PATH_SEPARATOR);

/**
 * @stable [10.09.2020]
 * @param env
 */
const asVersionedKey = (env: IEnvironment): string =>
  FilterUtils
    .notEmptyObjectValuesArrayFilter(env.appVersion, asNotVersionedKey(env))
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
