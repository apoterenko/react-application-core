import * as R from 'ramda';

import { IEntity, EntityIdT, UNDEF, AnyT, IKeyValue } from '../../../definitions.interface';
import {
  defValuesFilter,
  generateArray,
  isDef,
  isFn,
  isPrimitive,
  orNull,
  orUndef,
  shallowClone,
  toType,
} from '../../../util';
import {
  MultiFieldEntityT,
  NotMultiFieldEntityT,
  MultiFieldSingleValueT,
  IMultiFieldChangesEntity,
} from './multifield.interface';
import { IMultiEntity, IMultiItemEntity } from '../../../entities-definitions.interface';

/**
 * @stable [26.07.2019]
 * @param {Partial<IMultiEntity>} initial
 * @returns {IMultiEntity}
 */
export const multiEntityFactory = (initial: Partial<IMultiEntity>): IMultiEntity => ({
  add: initial.add || [],
  edit: initial.edit || [],
  remove: initial.remove || [],
  source: initial.source || [],
});

/**
 * @stable [27.02.2019]
 * @param {IEntity[]} currentEntities
 * @param {number} itemsLimit
 * @returns {TItem[]}
 */
export const asViewedMultiItemEntities = <TItem extends IEntity = IEntity>(currentEntities: IEntity[],
                                                                           itemsLimit: number): TItem[] => {
  const result = generateArray(itemsLimit);
  const actualRelations = toActualMultiItemEntities(currentEntities);

  if (Array.isArray(actualRelations)) {
    let cursor = 0;
    result.forEach((_, index) => {
      const entity = actualRelations[index];
      if (!R.isNil(entity)) {
        if ((entity as IMultiItemEntity).newEntity) {
          result[entity.index] = entity;
        } else {
          result[cursor++] = entity;
        }
      }
    });
  }
  return result;
};

/**
 * @stable [15.05.2019]
 * @param {MultiFieldEntityT} entity
 * @param {boolean} sort
 * @returns {TItem[]}
 */
export const toActualMultiItemEntities = <TItem extends IEntity = IEntity>(entity: MultiFieldEntityT,
                                                                           sort = true): TItem[] => {
  if (R.isNil(entity)) {
    return UNDEF;
  }
  const multiEntity = entity as IMultiEntity;
  if (!isNotMultiEntity(entity)) {
    const originalSourceItems = multiEntity.source as TItem[] || [];
    const cachedOriginalSourceItems = new Map<EntityIdT, TItem>();
    originalSourceItems.forEach((itm) => cachedOriginalSourceItems.set(itm.id, itm));

    // Pass a map to optimize
    const editedEntities = toActualMultiItemEditedEntities<TItem>(entity, cachedOriginalSourceItems);

    // Remove the touched entities
    multiEntity.remove.forEach((itm) => cachedOriginalSourceItems.delete(itm.id));
    multiEntity.edit.forEach((itm) => cachedOriginalSourceItems.delete(itm.id));

    // The final snapshot
    const entities = Array.from(cachedOriginalSourceItems.values())
      .concat(multiEntity.add as TItem[])
      .concat(editedEntities);

    if (!sort) {
      return entities;
    }

    const cachedIndexes = new Map<EntityIdT, number>();
    entities.forEach((entity0) => cachedIndexes.set(entity0.id, originalSourceItems.findIndex((i) => i.id === entity0.id)));

    // Finally, need to sort by original entity position in an original snapshot because of added and removed entities
    return R.sort<TItem>((item1, item2) => {
        const id1 = item1.id;
        const id2 = item2.id;
        if (id1 === id2) {
          return 0;
        }
        const index1 = cachedIndexes.get(id1);
        const index2 = cachedIndexes.get(id2);
        if (index1 === -1 && index2 === -1) {
          return 0;
        }
        return index1 > index2 ? 1 : -1;
      },
      entities as TItem[]
    );
  }
  return entity as TItem[];
};

/**
 * @stable [22.11.2018]
 * @param {MultiFieldEntityT} entity
 * @returns {TItem[]}
 */
export const toActualMultiItemDeletedEntities = <TItem extends IEntity = IEntity>(entity: MultiFieldEntityT): TItem[] => {
  if (R.isNil(entity)) {
    return UNDEF;
  }
  const multiEntity = entity as IMultiEntity;
  if (!isNotMultiEntity(entity)) {
    return multiEntity.remove as TItem[];
  }
  return [];
};

/**
 * @stable [18.08.2018]
 * @param {MultiFieldEntityT} entity
 * @param {Map<EntityIdT, TItem extends IEntity>} mappedSourcedItems
 * @returns {TItem[]}
 */
export const toActualMultiItemEditedEntities = <TItem extends IEntity = IEntity>(entity: MultiFieldEntityT,
                                                                                 mappedSourcedItems?: Map<EntityIdT, TItem>): TItem[] => {
  if (R.isNil(entity)) {
    return UNDEF;
  }
  const multiEntity = entity as IMultiEntity;
  if (!isNotMultiEntity(entity)) {
    const isMappedSourcedItemsPassed = !R.isNil(mappedSourcedItems);
    const resultItems = new Map<EntityIdT, TItem>();
    const cachedSourceItems = mappedSourcedItems || new Map<EntityIdT, TItem>();
    if (!isMappedSourcedItemsPassed) {
      multiEntity.source.forEach((originalItem) => cachedSourceItems.set(originalItem.id, originalItem as TItem));
    }

    multiEntity.edit.forEach((editedItem) => {
      const editedItemId = editedItem.id;
      const cachedResultItem = resultItems.get(editedItemId);

      // Collect the changes
      const editedItem0 = cachedResultItem || shallowClone<TItem>(cachedSourceItems.get(editedItemId));
      editedItem0[editedItem.name] = editedItem.value;

      if (R.isNil(cachedResultItem)) {
        resultItems.set(editedItemId, editedItem0);
      }
    });
    return Array.from(resultItems.values());
  }
  return [];
};

/**
 * @stable [26.12.2018]
 * @param {MultiFieldEntityT} entity
 * @returns {TItem[]}
 */
export const toActualMultiItemAddedEntities = <TEntity extends IEntity = IEntity>(entity: MultiFieldEntityT): TEntity[] => {
  if (R.isNil(entity)) {
    return UNDEF;
  }
  const multiEntity = entity as IMultiEntity;
  return isNotMultiEntity(entity) ? [] : multiEntity.add as TEntity[];
};

/**
 * @stable [27.06.2018]
 * @param {MultiFieldSingleValueT} multiFieldEntity
 * @returns {string}
 */
export const toLastAddedMultiItemEntity = (multiFieldEntity: MultiFieldSingleValueT): string => {
  if (R.isNil(multiFieldEntity)) {
    return null;
  }
  if (isPrimitive(multiFieldEntity)) {
    return String(multiFieldEntity);
  }
  const valueAsMultiEntity = multiFieldEntity as IMultiEntity;
  const add = valueAsMultiEntity.add;
  if (R.isNil(add)) {
    return null;
  }
  return orNull<string>(add.length > 0, () => String(add[add.length - 1].id));
};

/**
 * @stable [26.06.2018]
 * @param {MultiFieldEntityT} multiFieldEntity
 * @returns {EntityIdT[]}
 */
export const fromMultiFieldEntityToEntitiesIds = (multiFieldEntity: MultiFieldEntityT): EntityIdT[] =>
  fromMultiFieldEntityToEntities<IEntity, EntityIdT>(multiFieldEntity, (entity: IEntity) => entity.id);

/**
 * @stable [26.06.2018]
 * @param {MultiFieldEntityT} multiFieldEntity
 * @param {(entity: TItem, index: number) => TResult} mapper
 * @returns {TResult[]}
 */
export function fromMultiFieldEntityToEntities<TItem extends IEntity = IEntity, TResult = IEntity>(
  multiFieldEntity: MultiFieldEntityT,
  mapper: (entity: TItem, index: number) => TResult): TResult[] {
  const result = toActualMultiItemEntities(multiFieldEntity);
  return orUndef<TResult[]>(!R.isNil(result), (): TResult[] => result.map<TResult>(mapper));
}

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
  multiFieldEntity: MultiFieldEntityT,
  mapper: (entity: TItem, index: number) => TResult): TResult[] {
  const result = toActualMultiItemEditedEntities<TItem>(multiFieldEntity);
  return orUndef<TResult[]>(!R.isNil(result), (): TResult[] => result.map<TResult>(mapper));
}

/**
 * @stable [22.11.2018]
 * @param {MultiFieldEntityT} multiFieldEntity
 * @param {(entity: TItem, index: number) => TResult} mapper
 * @returns {TResult[]}
 */
export function fromMultiFieldEntityToDeletedEntities<TItem extends IEntity = IEntity, TResult = IEntity>(
  multiFieldEntity: MultiFieldEntityT,
  mapper: (entity: TItem, index: number) => TResult): TResult[] {
  const result = toActualMultiItemDeletedEntities<TItem>(multiFieldEntity);
  return orUndef<TResult[]>(!R.isNil(result), (): TResult[] => result.map<TResult>(mapper));
}

/**
 * @stable [24.06.2018]
 * @param {MultiFieldEntityT | EntityIdT} value
 * @returns {number}
 */
export const toActualMultiItemEntitiesLength = (value: MultiFieldEntityT | EntityIdT): number =>
  isDef(value)
    ? (isNotMultiEntity(value)
        ? normalizeEntities(value as NotMultiFieldEntityT)
        : toActualMultiItemEntities(value as IMultiEntity, false)
      ).length
    : 0;

/**
 * @stable [03.07.2018]
 * @param {NotMultiFieldEntityT} value
 * @returns {IEntity[]}
 */
export const normalizeEntities = (value: NotMultiFieldEntityT): IEntity[] =>
  isPrimitive(value) ? [{id: value as EntityIdT}] : value as IEntity[];

/**
 * @stable [24.06.2018]
 * @param {MultiFieldEntityT | EntityIdT} value
 * @returns {boolean}
 */
export const isNotMultiEntity = (value: MultiFieldEntityT | EntityIdT): boolean =>
  Array.isArray(value) || isPrimitive(value);

/**
 * @stable [23.06.2018]
 * @param {MultiFieldEntityT} value
 * @param {(value: IMultiEntity) => IMultiItemEntity[]} converter
 * @param {IEntity[]} defaultValue
 * @returns {IMultiItemEntity[] | IEntity[]}
 */
export const extractMultiItemEntities = (value: MultiFieldEntityT,
                                         converter: (value: IMultiEntity) => IMultiItemEntity[],
                                         defaultValue: IEntity[]): IMultiItemEntity[] | IEntity[] =>
  isNotMultiEntity(value)
    ? (
      isDef(defaultValue)
        ? defaultValue
        : normalizeEntities(value as NotMultiFieldEntityT)
    )
    : (R.isNil(value) ? [] : converter(value as IMultiEntity));

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
 * @stable [02.07.2018]
 * @param {string} name
 * @param {AnyT} value
 * @param {IEntity} rawData
 * @param {boolean} newEntity
 * @returns {IMultiItemEntity}
 */
export const buildMultiEntity = (name: string,
                                 value: AnyT,
                                 rawData: IEntity,
                                 newEntity?: boolean): IMultiItemEntity =>
  defValuesFilter({id: rawData.id, value, name, rawData, newEntity});

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

  return buildMultiEntity(
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
 * @returns {IMultiEntity}
 */
export const toFilteredMultiEntity = <TEntity extends IEntity>(multiEntity: MultiFieldEntityT<TEntity>,
                                                               updatedSource: MultiFieldEntityT<TEntity>,
                                                               addFilter?: (entity: TEntity) => boolean,
                                                               editFilter?: (entity: TEntity) => boolean,
                                                               removeFilter?: (entity: TEntity) => boolean): IMultiEntity => {
  if (R.isNil(multiEntity) || isNotMultiEntity(multiEntity)) {
    return UNDEF;
  }
  const multiEntity0 = multiEntity as IMultiEntity;
  const add = isFn(addFilter) ? multiEntity0.add.filter(addFilter) : multiEntity0.add;
  const edit = isFn(editFilter) ? multiEntity0.edit.filter(editFilter) : multiEntity0.edit;
  const remove = isFn(removeFilter) ? multiEntity0.remove.filter(removeFilter) : multiEntity0.remove;
  if (add.length === 0 && edit.length === 0 && remove.length === 0) {
    return UNDEF;
  }
  return toType<IMultiEntity>({
    add,
    edit,
    remove,
    source: updatedSource as TEntity[],
  });
};
