import * as R from 'ramda';

import {
  AnyT,
  EntityIdT,
  IEntity,
  IKeyValue,
  UNDEF,
} from '../definitions.interface';
import {
  FIELD_DISPLAY_EMPTY_VALUE,
  FIELD_VALUE_TO_CLEAR_DIRTY_CHANGES,
  IMultiEntity,
  MultiFieldEntityT,
  NotMultiFieldEntityT,
} from '../definition';
import { isArrayNotEmpty } from './array';
import { isNotMultiEntity } from './entity';
import { isPrimitive } from './type';
import { shallowClone } from './clone';
import { ifNotNilThanValue } from './cond';

const DYNAMIC_FIELD_SEPARATOR = '-';

/**
 * @stable [27.08.2019]
 * @param {EntityIdT} key
 * @returns {string}
 */
export const dynamicFieldName = (key: EntityIdT): string => `$$dynamicField${DYNAMIC_FIELD_SEPARATOR}${key}`;

/**
 * @stable [28.08.2019]
 * @param {TEntity} object
 * @param {EntityIdT} key
 * @returns {AnyT}
 */
export const dynamicFieldValue = <TEntity extends IEntity>(object: TEntity, key: EntityIdT): AnyT =>
  Reflect.get(object, dynamicFieldName(key));

/**
 * @stable [28.08.2019]
 * @param {TEntity[]} array
 * @param {(itm: TEntity) => EntityIdT} keyAccessor
 * @param {(itm: TEntity) => EntityIdT} valueAccessor
 * @returns {IKeyValue}
 */
export const fromDynamicFieldsArray = <TEntity extends IEntity | EntityIdT>(array: TEntity[],
                                                                            keyAccessor: (itm: TEntity) => EntityIdT,
                                                                            valueAccessor: (itm: TEntity) => EntityIdT): IKeyValue =>
  R.mergeAll(array.map((itm) => ({
      [dynamicFieldName(keyAccessor(itm))]: valueAccessor(itm),
    }))
  );

/**
 * @stable [28.08.2019]
 * @param {EntityIdT[]} array
 * @param {(itm: EntityIdT) => EntityIdT} valueAccessor
 * @returns {IKeyValue}
 */
export const fromDynamicFieldsIdsArray = (array: EntityIdT[],
                                          valueAccessor: (itm: EntityIdT) => EntityIdT): IKeyValue =>
  fromDynamicFieldsArray<EntityIdT>(array, (itm) => itm, valueAccessor);

/**
 * @stable [31.08.2019]
 * @param {AnyT} value
 * @returns {AnyT}
 */
export const toAlwaysDirtyFieldValue = (value: AnyT): AnyT => value === FIELD_VALUE_TO_CLEAR_DIRTY_CHANGES
  ? FIELD_DISPLAY_EMPTY_VALUE
  : value;

/**
 * @stable [13.10.2019]
 * @param {MultiFieldEntityT<TEntity extends IEntity>} entity
 * @returns {TEntity[]}
 */
export const asMultiFieldEntities = <TEntity extends IEntity = IEntity>(entity: MultiFieldEntityT<TEntity>): TEntity[] => {
  const before = Date.now();
  if (R.isNil(entity)) {
    return UNDEF;
  }
  if (isNotMultiEntity(entity)) {
    return entity as TEntity[];
  }
  const multiEntity = entity as IMultiEntity<TEntity>;
  const sourceEntities = multiEntity.source || [];

  // Fill a cache
  const cachedSourceEntities = new Map<EntityIdT, TEntity>();
  sourceEntities.forEach((itm) => cachedSourceEntities.set(itm.id, itm));

  // Pass a map to optimize
  const editedEntities = asMultiFieldEditedEntities<TEntity>(entity, cachedSourceEntities);
  const cachedEditedEntities = new Map<EntityIdT, TEntity>();
  if (isArrayNotEmpty(editedEntities)) {
    editedEntities.forEach((itm) => cachedEditedEntities.set(itm.id, itm));
  }

  // Remove the deleted entities
  multiEntity.remove.forEach((itm) => cachedSourceEntities.delete(itm.id));

  return Array.from(cachedSourceEntities.values())
    .concat(multiEntity.add)
    .map((itm) => cachedEditedEntities.has(itm.id) ? cachedEditedEntities.get(itm.id) : itm);
};

/**
 * @stable [12.10.2019]
 * @param {MultiFieldEntityT} entity
 * @param {Map<EntityIdT, TItem extends IEntity>} mappedSourcedItems
 * @returns {TItem[]}
 */
export const asMultiFieldEditedEntities =
  <TEntity extends IEntity = IEntity>(entity: MultiFieldEntityT<TEntity>,
                                      mappedSourcedItems?: Map<EntityIdT, TEntity>): TEntity[] => {
    const multiEntity = entity as IMultiEntity<TEntity>;
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
      const editedItem0 = cachedResultItem || shallowClone<TEntity>(cachedSourceItems.get(editedItemId));
      editedItem0[editedItem.name] = editedItem.value;

      if (R.isNil(cachedResultItem)) {
        resultItems.set(editedItemId, editedItem0);
      }
    });
    return Array.from(resultItems.values());
  };

/**
 * @stable [14.10.2019]
 * @param {NotMultiFieldEntityT} value
 * @returns {IEntity[]}
 */
export const asEntitiesArray = <TEntity extends IEntity = IEntity>(value: NotMultiFieldEntityT<TEntity>): TEntity[] =>
  isPrimitive(value) ? [{id: value} as TEntity] : value as TEntity[];

/**
 * @stable [14.10.2019]
 * @param {MultiFieldEntityT | EntityIdT} value
 * @returns {number}
 */
export const asMultiFieldEntitiesLength = (value: MultiFieldEntityT | EntityIdT): number => ifNotNilThanValue(
  value,
  () => (
    isNotMultiEntity(value)
      ? asEntitiesArray(value as NotMultiFieldEntityT)
      : asMultiFieldEntities(value as IMultiEntity)
  ).length,
  0
);
