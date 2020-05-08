import * as R from 'ramda';

import { IEntity, EntityIdT, UNDEF, AnyT, IKeyValue } from '../../../definitions.interface';
import {
  asEntitiesArray,
  asMultiFieldEditedEntities,
  buildMultiItemEntity,
  ifNotNilThanValue,
  isDef,
  isFn,
  isNotMultiEntity,
  isPrimitive,
  orUndef,
  toType,
} from '../../../util';
import {
  IMultiFieldChangesEntity,
} from './multifield.interface';
import {
  IReduxMultiEntity,
  IMultiItemEntity,
  MultiFieldEntityT,
  MultiFieldSingleValueT,
  NotMultiFieldEntityT,
} from '../../../definition';

/**
 * @stable [29.07.2019]
 * @param {MultiFieldSingleValueT} multiFieldEntity
 * @returns {EntityIdT}
 */
export const toLastAddedMultiItemEntityId = (multiFieldEntity: MultiFieldSingleValueT): EntityIdT =>
  ifNotNilThanValue(
    multiFieldEntity,
    () => (
      isPrimitive(multiFieldEntity)
        ? multiFieldEntity as EntityIdT
        : (
          ifNotNilThanValue(
            (multiFieldEntity as IReduxMultiEntity).add,
            (add) => ifNotNilThanValue(R.last(add), (lastValue) => lastValue.id)
          )
        )
    )
  );

/**
 * @stable [04.07.2018]
 * @param {MultiFieldEntityT} multiFieldEntity
 * @returns {EntityIdT[]}
 */
export const fromMultiFieldEntityToEditedEntitiesIds = (multiFieldEntity: MultiFieldEntityT): EntityIdT[] =>
  fromMultiFieldEntityToEditedEntities<IEntity, EntityIdT>(multiFieldEntity, (entity: IEntity) => entity.id);

/**
 * @stable [18.08.2018]
 * @param {MultiFieldEntityT} multiFieldEntity
 * @param {(entity: TItem, index: number) => TResult} mapper
 * @returns {TResult[]}
 */
export function fromMultiFieldEntityToEditedEntities<TItem extends IEntity = IEntity, TResult = IEntity>(
  multiFieldEntity: MultiFieldEntityT<TItem>,
  mapper: (entity: TItem, index: number) => TResult): TResult[] {
  const result = asMultiFieldEditedEntities<TItem>(multiFieldEntity);
  return orUndef<TResult[]>(!R.isNil(result), (): TResult[] => result.map<TResult>(mapper));
}

/**
 * @stable [23.06.2018]
 * @param {MultiFieldEntityT} value
 * @param {(value: IMultiEntity) => IMultiItemEntity[]} converter
 * @param {IEntity[]} defaultValue
 * @returns {IMultiItemEntity[] | IEntity[]}
 */
export const extractMultiItemEntities = (value: MultiFieldEntityT,
                                         converter: (value: IReduxMultiEntity) => IMultiItemEntity[],
                                         defaultValue: IEntity[]): IMultiItemEntity[] | IEntity[] =>
  isNotMultiEntity(value)
    ? (
      isDef(defaultValue)
        ? defaultValue
        : asEntitiesArray(value as NotMultiFieldEntityT)
    )
    : (R.isNil(value) ? [] : converter(value as IReduxMultiEntity));

/**
 * @stable [23.06.2018]
 * @param {MultiFieldEntityT} value
 * @param {IMultiItemEntity[]} defaultValue
 * @returns {IMultiItemEntity[]}
 */
export const extractMultiEditItemEntities = (value: MultiFieldEntityT,
                                             defaultValue: IMultiItemEntity[] = []): IMultiItemEntity[] =>
  extractMultiItemEntities(value, (currentValue) => currentValue.edit, defaultValue);

/**
 * @stable [23.06.2018]
 * @param {MultiFieldEntityT} value
 * @param {IMultiItemEntity[]} defaultValue
 * @returns {IMultiItemEntity[]}
 */
export const extractMultiRemoveItemEntities = (value: MultiFieldEntityT,
                                               defaultValue: IMultiItemEntity[] = []): IMultiItemEntity[] =>
  extractMultiItemEntities(value, (currentValue) => currentValue.remove, defaultValue);

/**
 * @stable [02.07.2018]
 * @param {MultiFieldEntityT} value
 * @param {IMultiItemEntity[]} defaultValue
 * @returns {IEntity[]}
 */
export const extractMultiAddItemEntities = (value: MultiFieldEntityT,
                                            defaultValue: IMultiItemEntity[] = []): IEntity[] =>
  extractMultiItemEntities(value, (currentValue) => currentValue.add, defaultValue);

/**
 * @stable [23.06.2018]
 * @param {MultiFieldEntityT} value
 * @param {IEntity[]} defaultValue
 * @returns {IEntity[]}
 */
export const extractMultiSourceItemEntities = (value: MultiFieldEntityT,
                                               defaultValue?: IEntity[]): IEntity[] =>
  extractMultiItemEntities(value, (currentValue) => currentValue.source, defaultValue);

/**
 * @stable [02.07.2018]
 * @param {IEntity | IMultiItemEntity} entity
 * @returns {IEntity}
 */
export const fromMultiItemEntityToEntity = (entity: IEntity | IMultiItemEntity): IEntity => {
  const entityAsMultiItemEntity = entity as IMultiItemEntity;
  if (isDef(entityAsMultiItemEntity.rawData)) {
    return {
      ...entityAsMultiItemEntity.rawData,
      [entityAsMultiItemEntity.name]: entityAsMultiItemEntity.value,
    };
  }
  return entity;
};

/**
 * @stable [23.06.2018]
 * @param {string} fieldName
 * @param {MultiFieldEntityT} multiFieldValue
 * @param {(itm: IMultiItemEntity) => boolean} predicate
 * @param {(itm: IMultiItemEntity) => AnyT} nextFieldValueFn
 * @returns {IMultiItemEntity}
 */
export const buildMultiEditItemEntityPayload = <TEntity extends IEntity = IEntity>(
  fieldName: string,
  multiFieldValue: MultiFieldEntityT,
  predicate: (itm: IMultiItemEntity) => boolean,
  nextFieldValueFn: (multiItemEntity: IMultiItemEntity, entity: TEntity) => AnyT): IMultiItemEntity => {

  const sourceMultiItemEntities = extractMultiSourceItemEntities(multiFieldValue);
  const editedMultiItemEntities = extractMultiEditItemEntities(multiFieldValue);

  const editedMultiItemEntity = editedMultiItemEntities.find(predicate);
  const sourceMultiItemEntity = sourceMultiItemEntities.find(predicate);

  return buildMultiItemEntity(
    fieldName,
    nextFieldValueFn(editedMultiItemEntity as TEntity, sourceMultiItemEntity as TEntity),
    sourceMultiItemEntity,
  );
};

/**
 * @stable [04.07.2018]
 * @param {IMultiItemEntity[]} multiItemEntities
 * @returns {IKeyValue}
 */
export const fromMultiItemEntitiesToFieldsChanges = (multiItemEntities: IMultiItemEntity[]): IKeyValue =>
  R.reduceBy<IMultiItemEntity, {}>(
    (acc, entity) => ({...acc, [entity.name]: entity.value}),
    {},
    (entity) => String(entity.id),
    multiItemEntities
  );

/**
 * @stable [11.08.2018]
 * @param {IMultiItemEntity} first
 * @param {IMultiItemEntity} second
 * @returns {boolean}
 */
export const isSameEntityByIdAndChangedFieldName = (first: IMultiItemEntity, second: IMultiItemEntity): boolean => (
  first.id === second.id
    && first.name === second.name
);

/**
 * @stable [11.08.2018]
 * @param {IMultiItemEntity} item
 * @param {IEntity[]} addValue
 * @param {IMultiItemEntity[]} removeValue
 * @param {IMultiItemEntity[]} editValue
 * @param {IEntity[]} originalValue
 * @returns {IMultiFieldChangesEntity}
 */
export const toMultiFieldChangesEntityOnEdit = (item: IMultiItemEntity,
                                                addValue: IEntity[],
                                                removeValue: IMultiItemEntity[],
                                                editValue: IMultiItemEntity[],
                                                originalValue: IEntity[]): IMultiFieldChangesEntity => {
  const removeArray = removeValue;
  const originalEditedItem = originalValue.find((originalItem0) => originalItem0.id === item.id);
  const editedNewItem = addValue.find((editedNewItem0) => editedNewItem0.id === item.id);
  const isEditedNewItem = !R.isNil(editedNewItem);
  const isOriginalEditedItem = !R.isNil(originalEditedItem);

  const editArray = isEditedNewItem
    ? editValue  // If a user is editing a new record then returning an input value
    : ( // Otherwise, we should replace an old item with an input item
      editValue
        .filter((editedItem) => !isSameEntityByIdAndChangedFieldName(item, editedItem))
        .concat(item)
        .filter(
          (editedItem) =>
            // Need to destroy the dirty changes, if an edited entity attribute is equal an original entity attribute
            !isOriginalEditedItem
            || !(isSameEntityByIdAndChangedFieldName(item, editedItem) && originalEditedItem[item.name] === item.value)
        )
    );

  const addArray = isEditedNewItem
    ? (
      item.value === UNDEF    // Need to destroy the added entities
        ? R.filter<IEntity>((itm) => itm.id !== item.id, addValue)
        : R.map<IEntity, IEntity>((newItem) => newItem.id === item.id ? fromMultiItemEntityToEntity(item) : newItem, addValue)
    )
    : addValue;
  return {addArray, removeArray, editArray};
};

/**
 * @stable [18.08.2018]
 * @param {IMultiItemEntity} item
 * @param {IEntity[]} addValue
 * @param {IMultiItemEntity[]} removeValue
 * @param {IMultiItemEntity[]} editValue
 * @param {IEntity[]} originalValue
 * @returns {IMultiFieldChangesEntity}
 */
export const toMultiFieldChangesEntityOnDelete = (item: IMultiItemEntity,
                                                  addValue: IEntity[],
                                                  removeValue: IMultiItemEntity[],
                                                  editValue: IMultiItemEntity[],
                                                  originalValue: IEntity[]): IMultiFieldChangesEntity => {
  const deletedItemId = item.id;
  const addValueLenBeforeFiltering = addValue.length;
  const editArray = editValue.filter(((addItem) => addItem.id !== deletedItemId));
  const addArray = addValue.filter(((addItem) => addItem.id !== deletedItemId));

  let removeArray = removeValue;
  if (addArray.length === addValueLenBeforeFiltering) {
    // The local added items do not contain deleted item
    const deletedEntity = originalValue.find((entity) => entity.id === deletedItemId);
    removeArray = (R.isNil(deletedEntity) ? [] : [deletedEntity]).concat(removeValue);
  } else {
    // We just now have removed deleted item from addValue array
  }
  return {addArray, removeArray, editArray};
};

/**
 * @stable [07.03.2019]
 * @param {MultiFieldEntityT<TEntity extends IEntity>} multiEntity
 * @param {MultiFieldEntityT<TEntity extends IEntity>} updatedSource
 * @param {(entity: TEntity) => boolean} addFilter
 * @param {(entity: TEntity) => boolean} editFilter
 * @param {(entity: TEntity) => boolean} removeFilter
 * @returns {IReduxMultiEntity}
 */
export const toFilteredMultiEntity = <TEntity extends IEntity>(multiEntity: MultiFieldEntityT<TEntity>,
                                                               updatedSource: MultiFieldEntityT<TEntity>,
                                                               addFilter?: (entity: TEntity) => boolean,
                                                               editFilter?: (entity: TEntity) => boolean,
                                                               removeFilter?: (entity: TEntity) => boolean): IReduxMultiEntity => {
  if (R.isNil(multiEntity) || isNotMultiEntity(multiEntity)) {
    return UNDEF;
  }
  const multiEntity0 = multiEntity as IReduxMultiEntity;
  const add = isFn(addFilter) ? multiEntity0.add.filter(addFilter) : multiEntity0.add;
  const edit = isFn(editFilter) ? multiEntity0.edit.filter(editFilter) : multiEntity0.edit;
  const remove = isFn(removeFilter) ? multiEntity0.remove.filter(removeFilter) : multiEntity0.remove;
  if (add.length === 0 && edit.length === 0 && remove.length === 0) {
    return UNDEF;
  }
  return toType<IReduxMultiEntity>({
    add,
    edit,
    remove,
    source: updatedSource as TEntity[],
  });
};
