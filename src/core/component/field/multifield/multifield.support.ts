import * as R from 'ramda';

import { IEntity, EntityIdT, UNDEF, AnyT, IKeyValue } from '../../../definitions.interface';
import {
  orUndef,
  isPrimitive,
  orDefault,
  isDef,
  orNull,
  defValuesFilter,
  isFn,
} from '../../../util';
import {
  IMultiEntity,
  MultiFieldEntityT,
  NotMultiFieldEntityT,
  IMultiItemEntity,
  MultiFieldSingleValueT,
} from './multifield.interface';

export function toActualMultiItemEntities(entity: MultiFieldEntityT): IMultiItemEntity[] {
  if (R.isNil(entity)) {
    return UNDEF;
  }
  const multiEntity = entity as IMultiEntity;
  if (!isNotMultiEntity(entity)) {
    const editedEntities = toActualMultiItemEditedEntities(entity);
    const sourceItems = multiEntity.source || [];

    return R.sort<IMultiItemEntity>(
      (item1, item2) => sourceItems.findIndex((i) => i.id === item1.id) > sourceItems.findIndex((i) => i.id === item2.id) ? 1 : -1,
      multiEntity.add.concat(
        sourceItems.filter(
          (entity0) =>
            !multiEntity.remove.find((removeId) => removeId.id === entity0.id)
            && !multiEntity.edit.find((editedId) => editedId.id === entity0.id)
        ).concat(editedEntities)
      )
    );
  }
  return entity as IEntity[];
}

/**
 * @stable [04.07.2018]
 * @param {MultiFieldEntityT} entity
 * @returns {IMultiItemEntity[]}
 */
export const toActualMultiItemEditedEntities = (entity: MultiFieldEntityT): IMultiItemEntity[] => {
  if (R.isNil(entity)) {
    return UNDEF;
  }
  const multiEntity = entity as IMultiEntity;
  if (!isNotMultiEntity(entity)) {
    const editedItems = {};
    multiEntity.edit.forEach((editedItem) => {
      const editedItemId = editedItem.id;
      const editedItem0 = editedItems[editedItemId] || {
        ...multiEntity.source.find((originalEntity) => originalEntity.id === editedItemId),
      };
      editedItem0[editedItem.name] = editedItem.value;
      editedItems[editedItemId] = editedItem0;
    });
    return Object.keys(editedItems).map((editedItemId) => editedItems[editedItemId]);
  }
  return entity as IEntity[];
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
 * @stable [04.07.2018]
 * @param {MultiFieldEntityT} multiFieldEntity
 * @param {(entity: TItem, index: number) => TResult} mapper
 * @returns {TResult[]}
 */
export function fromMultiFieldEntityToEditedEntities<TItem extends IEntity = IEntity, TResult = IEntity>(
  multiFieldEntity: MultiFieldEntityT,
  mapper: (entity: TItem, index: number) => TResult): TResult[] {
  const result = toActualMultiItemEditedEntities(multiFieldEntity);
  return orUndef<TResult[]>(!R.isNil(result), (): TResult[] => result.map<TResult>(mapper));
}

/**
 * @stable [24.06.2018]
 * @param {MultiFieldEntityT | EntityIdT} value
 * @returns {number}
 */
export const toActualMultiItemEntitiesLength = (value: MultiFieldEntityT | EntityIdT): number =>
  orDefault<number, number>(
    isDef(value),
    () => (
      (isNotMultiEntity(value)
          ? normalizeEntities(value as NotMultiFieldEntityT)
          : toActualMultiItemEntities(value as IMultiEntity)
      ).length
    ),
    0
  );

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
    ? orDefault<IEntity[], IEntity[]>(
        isDef(defaultValue),
        defaultValue,
        () => normalizeEntities(value as NotMultiFieldEntityT)
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
export const buildMultiEditItemEntityPayload = (fieldName: string,
                                                multiFieldValue: MultiFieldEntityT,
                                                predicate: (itm: IMultiItemEntity) => boolean,
                                                nextFieldValueFn: (itm: IMultiItemEntity) => AnyT): IMultiItemEntity => {
  const sourceMultiItemEntities = extractMultiSourceItemEntities(multiFieldValue);
  const editedMultiItemEntities = extractMultiEditItemEntities(multiFieldValue);

  const editedMultiItemEntity = editedMultiItemEntities.find(predicate);
  const sourceMultiItemEntity = sourceMultiItemEntities.find(predicate);

  return buildMultiEntity(
    fieldName,
    nextFieldValueFn(editedMultiItemEntity),
    sourceMultiItemEntity,
  );
};

/**
 * @stable [02.07.2018]
 * @param {string} fieldName
 * @param {MultiFieldEntityT} multiFieldValue
 * @param {(itm: IMultiItemEntity) => boolean} predicate
 * @param {(itm: TEntity) => AnyT} nextFieldValueFn
 * @param {(newEntity: boolean, entity: TEntity) => TEntity} entityFactory
 * @returns {IMultiItemEntity}
 */
export const buildMultiAddItemEntityPayload =
  <TEntity extends IEntity = IEntity>(fieldName: string,
                                      multiFieldValue: MultiFieldEntityT,
                                      predicate: (itm: IMultiItemEntity) => boolean,
                                      nextFieldValueFn: (itm: TEntity) => AnyT,
                                      entityFactory?: (newEntity: boolean, entity: TEntity) => TEntity): IMultiItemEntity => {

    const addedMultiItemEntities = extractMultiAddItemEntities(multiFieldValue);
    const addedEntity = addedMultiItemEntities.find(predicate);
    const newEntity = R.isNil(addedEntity);

    return buildMultiEntity(
      fieldName,
      nextFieldValueFn(addedEntity as TEntity),
      isFn(entityFactory) ? entityFactory(newEntity, addedEntity as TEntity) : addedEntity,
      newEntity,
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
