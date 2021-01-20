import * as R from 'ramda';

import {
  IMultiFieldValueConcatConfigEntity,
  IMultiFieldValueFilterConfigEntity,
  IMultiFieldValueMergeConfigEntity,
  IMultiItemEntity,
  IReduxMultiEntity,
  MultiFieldValueOrEntitiesIdsT,
  MultiFieldValueOrEntityIdT,
  MultiFieldValueT,
  NotMultiFieldValueT,
} from '../definition';
import { TypeUtils } from './type';
import {
  EntityIdT,
  IEntity,
  UNDEF,
} from '../definitions.interface';
import { ArrayUtils } from './array';
import { CloneUtils } from './clone';
import { FilterUtils } from './filter';
import { NvlUtils } from './nvl';
import { ObjectUtils } from './object';

/**
 * @stable [03.09.2020]
 * @param initial
 */
const fromMultiEntity =
  <TEntity extends IEntity = IEntity>(initial: IReduxMultiEntity<TEntity>): IReduxMultiEntity<TEntity> => ({
    add: initial.add || [],
    edit: initial.edit || [],
    remove: initial.remove || [],
    source: initial.source || [],
  });

/**
 * @stable [29.08.2020]
 * @param value
 */
const isNotMultiEntity = (value: MultiFieldValueOrEntityIdT): boolean =>
  Array.isArray(value) || TypeUtils.isPrimitive(value);

/**
 * @stable [29.08.2020]
 * @param value
 */
const notMultiFieldValueAsEntities =
  <TEntity extends IEntity = IEntity>(value: NotMultiFieldValueT<TEntity>): TEntity[] =>
    TypeUtils.isPrimitive(value)
      ? [{id: value} as TEntity]
      : value as TEntity[];

/**
 * @stable [29.08.2020]
 * @param value
 * @param converter
 * @param defaultValue
 */
const extractEntitiesFromMultiFieldValue = (value: MultiFieldValueT,
                                            converter: (value: IReduxMultiEntity) => IMultiItemEntity[],
                                            defaultValue: IEntity[]): IMultiItemEntity[] | IEntity[] =>
  isNotMultiEntity(value)
    ? (
      TypeUtils.isDef(defaultValue)
        ? defaultValue
        : notMultiFieldValueAsEntities(value as NotMultiFieldValueT)
    )
    : (R.isNil(value) ? [] : converter(value as IReduxMultiEntity));

/**
 * @stable [29.08.2020]
 * @param value
 * @param defaultValue
 */
const multiFieldValueAsMultiItemEditEntities = (value: MultiFieldValueT,
                                                defaultValue: IEntity[] = []): IMultiItemEntity[] =>
  extractEntitiesFromMultiFieldValue(value, (currentValue) => currentValue.edit, defaultValue);

/**
 * @stable [06.09.2020]
 * @param value
 * @param defaultValue
 */
const multiFieldValueAsMultiItemAddEntities = (value: MultiFieldValueT,
                                               defaultValue: IEntity[] = []): IEntity[] =>
  extractEntitiesFromMultiFieldValue(value, (currentValue) => currentValue.add, defaultValue);

/**
 * @stable [29.08.2020]
 * @param value
 * @param defaultValue
 */
const multiFieldValueAsMultiItemRemoveEntities = (value: MultiFieldValueT,
                                                  defaultValue: IEntity[] = []): IEntity[] =>
  extractEntitiesFromMultiFieldValue(value, (currentValue) => currentValue.remove, defaultValue);

/**
 * @stable [29.08.2020]
 * @param entity
 * @param mappedSourcedItems
 */
const multiFieldValueAsEditEntities =
  <TEntity extends IEntity = IEntity>(entity: MultiFieldValueT<TEntity>,
                                      mappedSourcedItems?: Map<EntityIdT, TEntity>): TEntity[] => {
    const multiEntity = entity as IReduxMultiEntity<TEntity>;
    if (R.isNil(entity)) {
      return UNDEF;
    }
    if (isNotMultiEntity(entity)) {
      return [];
    }
    const resultItems = new Map<EntityIdT, TEntity>();
    const cachedSourceItems = mappedSourcedItems || new Map<EntityIdT, TEntity>();
    if (R.isNil(mappedSourcedItems)) {
      multiEntity.source.forEach((sourceEntity) => cachedSourceItems.set(sourceEntity.id, sourceEntity));
    }

    multiEntity.edit.forEach((editedItem) => {
      const editedItemId = editedItem.id;
      const cachedResultItem = resultItems.get(editedItemId);

      // Collect the changes
      const $editedItem = cachedResultItem || CloneUtils.shallowClone<TEntity>(cachedSourceItems.get(editedItemId));
      Reflect.set($editedItem, editedItem.name, editedItem.value);

      if (R.isNil(cachedResultItem)) {
        resultItems.set(editedItemId, $editedItem);
      }
    });
    return Array.from(resultItems.values());
  };

/**
 * @stable [31.08.2020]
 * @param name
 * @param value
 * @param rawData
 * @param newEntity
 */
const asMultiItemEntity =
  <TEntity extends IEntity = IEntity>(name: string,
                                      value: unknown,
                                      rawData: TEntity,
                                      newEntity?: boolean): IMultiItemEntity =>
    FilterUtils.defValuesFilter<IMultiItemEntity, IMultiItemEntity>({id: rawData.id, value, name, rawData, newEntity});

/**
 * @stable [02.09.2020]
 * @param cfg
 */
const filterMultiFieldValue =
  <TEntity extends IEntity>(cfg: IMultiFieldValueFilterConfigEntity<TEntity>): IReduxMultiEntity => {
    const {
      addFilter,
      currentEntity,
      editFilter,
      removeFilter,
      sourceEntities,
    } = cfg;
    if (R.isNil(currentEntity) || isNotMultiEntity(currentEntity)) {
      return UNDEF;
    }
    const $currentEntity = currentEntity as IReduxMultiEntity;
    const add = TypeUtils.isFn(addFilter) ? $currentEntity.add.filter(addFilter) : $currentEntity.add;
    const edit = TypeUtils.isFn(editFilter) ? $currentEntity.edit.filter(editFilter) : $currentEntity.edit;
    const remove = TypeUtils.isFn(removeFilter) ? $currentEntity.remove.filter(removeFilter) : $currentEntity.remove;

    if (add.length === 0 && edit.length === 0 && remove.length === 0) {
      return UNDEF;
    }
    return {
      add,
      edit,
      remove,
      source: sourceEntities as TEntity[],
    };
  };

/**
 * @stable [03.09.2020]
 * @param cfg
 */
const concatMultiFieldValue =
  <TEntity extends IEntity>(cfg: IMultiFieldValueConcatConfigEntity<TEntity>): IReduxMultiEntity => {
    const {
      concatEntity,
      currentEntity,
    } = cfg;
    if (R.isNil(currentEntity) || isNotMultiEntity(currentEntity)) {
      return UNDEF;
    }
    if (R.isNil(concatEntity)) {
      return currentEntity as IReduxMultiEntity;
    }
    const $currentEntity = currentEntity as IReduxMultiEntity;
    const $concatEntity = fromMultiEntity(concatEntity);

    const add = $currentEntity.add.concat($concatEntity.add);
    const edit = $currentEntity.edit.concat($concatEntity.edit);
    const remove = $currentEntity.remove.concat($concatEntity.remove);

    return {
      ...$currentEntity,
      add,
      edit,
      remove,
    };
  };

/**
 * @stable [03.09.2020]
 * @param entity
 */
const multiFieldValueAsEntities = <TEntity extends IEntity = IEntity>(entity: MultiFieldValueT<TEntity>): TEntity[] => {
  if (R.isNil(entity)) {
    return UNDEF;
  }
  if (isNotMultiEntity(entity)) {
    return entity as TEntity[];
  }
  const multiEntity = entity as IReduxMultiEntity<TEntity>;
  const sourceEntities = multiEntity.source || [];

  // Fill a cache
  const cachedSourceEntities = new Map<EntityIdT, TEntity>();
  sourceEntities.forEach((itm) => cachedSourceEntities.set(itm.id, itm));

  // Pass a map to optimize
  const editedEntities = multiFieldValueAsEditEntities<TEntity>(entity, cachedSourceEntities);
  const cachedEditedEntities = new Map<EntityIdT, TEntity>();
  if (ObjectUtils.isObjectNotEmpty(editedEntities)) {
    editedEntities.forEach((itm) => cachedEditedEntities.set(itm.id, itm));
  }

  // Remove the deleted entities
  multiEntity.remove.forEach((itm) => cachedSourceEntities.delete(itm.id));

  return multiEntity.add.concat(
    Array.from(cachedSourceEntities.values())
      .map((itm) => NvlUtils.nvl(cachedEditedEntities.get(itm.id), itm))
  );
};

/**
 * @stable [04.09.2020]
 * @param cfg
 */
const multiFieldValueAsTrueEntitiesObject =
  <TEntity extends IEntity>(cfg: IMultiFieldValueMergeConfigEntity<TEntity>): Record<EntityIdT, boolean> => {
    const {
      entity,
      groupValueAccessor = (item) => item.id,
    } = cfg;

    return R.mergeAll(
      (multiFieldValueAsEntities<TEntity>(entity) || []).map((item) => ({[groupValueAccessor(item)]: true}))
    );
  };

/**
 * @stable [21.01.2021]
 * @param multiFieldValue
 * @param mapper
 */
const multiFieldValueAsMappedEntities =
  <TEntity = IEntity, TResult = TEntity>(multiFieldValue: MultiFieldValueT<TEntity>,
                                         mapper: (entity: TEntity, index?: number) => TResult): TResult[] =>
    multiFieldValueAsEntities(multiFieldValue)?.map(mapper);

/**
 * @stable [21.01.2021]
 * @param multiFieldValueOrEntitiesIds
 */
const multiFieldValueAsEntitiesIds =
  <TEntity extends IEntity = IEntity, TResult extends EntityIdT = EntityIdT>(multiFieldValueOrEntitiesIds: MultiFieldValueOrEntitiesIdsT<TEntity>): TResult[] =>
    multiFieldValueAsMappedEntities<TEntity, TResult>(
      multiFieldValueOrEntitiesIds as MultiFieldValueT<TEntity>,
      (entity: TEntity) => entity.id as TResult
    );

/**
 * @stable [21.01.2021]
 * @param entity
 * @param multiFieldValue
 */
const buildPhantomEntity =
  <TEntity extends IEntity = IEntity>(entity: TEntity,
                                      multiFieldValue: MultiFieldValueT<TEntity>): TEntity => ({
    ...entity,
    id: ArrayUtils.nextMinNegativeValue(
      MultiFieldUtils.multiFieldValueAsEntitiesIds<TEntity, number>(multiFieldValue) || []
    ),
  });

/**
 * @stable [29.08.2020]
 */
export class MultiFieldUtils {
  public static readonly asMultiItemEntity = asMultiItemEntity;
  public static readonly buildPhantomEntity = buildPhantomEntity;
  public static readonly concatMultiFieldValue = concatMultiFieldValue;
  public static readonly extractEntitiesFromMultiFieldValue = extractEntitiesFromMultiFieldValue;
  public static readonly filterMultiFieldValue = filterMultiFieldValue;
  public static readonly fromMultiEntity = fromMultiEntity;
  public static readonly isNotMultiEntity = isNotMultiEntity;
  public static readonly multiFieldValueAsEditEntities = multiFieldValueAsEditEntities;
  public static readonly multiFieldValueAsEntities = multiFieldValueAsEntities;
  public static readonly multiFieldValueAsEntitiesIds = multiFieldValueAsEntitiesIds;
  public static readonly multiFieldValueAsMappedEntities = multiFieldValueAsMappedEntities;
  public static readonly multiFieldValueAsMultiItemAddEntities = multiFieldValueAsMultiItemAddEntities;
  public static readonly multiFieldValueAsMultiItemEditEntities = multiFieldValueAsMultiItemEditEntities;
  public static readonly multiFieldValueAsMultiItemRemoveEntities = multiFieldValueAsMultiItemRemoveEntities;
  public static readonly multiFieldValueAsTrueEntitiesObject = multiFieldValueAsTrueEntitiesObject;
  public static readonly notMultiFieldValueAsEntities = notMultiFieldValueAsEntities;
}
