import * as R from 'ramda';

import {
  IMultiItemEntity,
  IReduxMultiEntity,
  MultiFieldValueOrEntityIdT,
  MultiFieldValueT,
  NotMultiFieldValueT,
} from '../definition';
import {
  TypeUtils,
} from './type';
import {
  AnyT,
  EntityIdT,
  IEntity,
  UNDEF,
} from '../definitions.interface';
import { CloneUtils } from './clone';
import { FilterUtils } from './filter';

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
const multiFieldValueAsEntities = (value: MultiFieldValueT,
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
  multiFieldValueAsEntities(value, (currentValue) => currentValue.edit, defaultValue);

/**
 * @stable [29.08.2020]
 * @param value
 * @param defaultValue
 */
const multiFieldValueAsMultiItemRemoveEntities = (value: MultiFieldValueT,
                                                  defaultValue: IEntity[] = []): IEntity[] =>
  MultiFieldUtils.multiFieldValueAsEntities(value, (currentValue) => currentValue.remove, defaultValue);

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
    if (MultiFieldUtils.isNotMultiEntity(entity)) {
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
                                      value: AnyT,
                                      rawData: TEntity,
                                      newEntity?: boolean): IMultiItemEntity =>
    FilterUtils.defValuesFilter<IMultiItemEntity, IMultiItemEntity>({id: rawData.id, value, name, rawData, newEntity});

/**
 * @stable [29.08.2020]
 */
export class MultiFieldUtils {
  public static readonly asMultiItemEntity = asMultiItemEntity;
  public static readonly isNotMultiEntity = isNotMultiEntity;
  public static readonly multiFieldValueAsEditEntities = multiFieldValueAsEditEntities;
  public static readonly multiFieldValueAsEntities = multiFieldValueAsEntities;
  public static readonly multiFieldValueAsMultiItemEditEntities = multiFieldValueAsMultiItemEditEntities;
  public static readonly multiFieldValueAsMultiItemRemoveEntities = multiFieldValueAsMultiItemRemoveEntities;
  public static readonly notMultiFieldValueAsEntities = notMultiFieldValueAsEntities;
}
