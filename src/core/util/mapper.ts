import * as R from 'ramda';

import { defValuesFilter, notNilValuesFilter } from './filter';
import {
  IExtendedEntity,
  IPaginatedEntity,
  IQueryFilterEntity,
  IQueryFilterWrapperEntity,
} from '../definition';
import { IQueryWrapper, IEntity, UNDEF_SYMBOL } from '../definitions.interface';
import { trimmedUndefEmpty } from './nvl';
import { ifNotNilThanValue, orNull, orUndef } from './cond';
import {
  IEditableEntity,
  IEditableEntityFormWrapperEntity,
  IEntityFormEntity,
  IListEntity,
  IListWrapperEntity,
} from '../entities-definitions.interface';
import { shallowClone } from './clone';

/**
 * @stable [04.09.2019]
 * @param {IEntityFormEntity<TEntity extends IEntity>} entity
 * @returns {IEditableEntity<TEntity extends IEntity>}
 */
export const selectEditableEntity =
  <TEntity extends IEntity = IEntity>(entity: IEntityFormEntity<TEntity>): IEditableEntity<TEntity> =>
    orNull(entity, (): IEditableEntity<TEntity> => entity.form);

/**
 * @stable [04.09.2019]
 * @param {IEditableEntity} entity
 * @returns {TResult}
 */
export const selectChanges = <TResult extends IEntity = IEntity>(entity: IEditableEntity): TResult =>
  orNull(entity, (): TResult => entity.changes as TResult);

/**
 * @stable [04.09.2019]
 * @param {IEntityFormEntity} entity
 * @returns {TResult}
 */
export const selectEditableEntityChanges = <TResult extends IEntity = IEntity>(entity: IEntityFormEntity): TResult =>
  orNull(entity, (): TResult => selectChanges<TResult>(selectEditableEntity(entity)));

/**
 * @stable [04.09.2019]
 * @param {IListWrapperEntity} entity
 * @returns {IListEntity}
 */
export const selectListEntity = (entity: IListWrapperEntity): IListEntity =>
  orNull(entity, (): IListEntity => entity.list);

/**
 * @stable [04.09.2019]
 * @param {IQueryFilterWrapperEntity} entity
 * @returns {IQueryFilterEntity}
 */
export const selectQueryFilterEntity = (entity: IQueryFilterWrapperEntity): IQueryFilterEntity =>
  orNull(entity, (): IQueryFilterEntity => entity.filter);

/**
 * @stable [04.09.2019]
 * @param {IListEntity} listEntity
 * @returns {TEntity}
 */
export const selectSelectedEntity = <TEntity extends IEntity>(listEntity: IListEntity): TEntity =>
  orNull(listEntity, (): TEntity => listEntity.selected as TEntity);

/**
 * @stable [04.09.2019]
 * @param {IListWrapperEntity} listWrapperEntity
 * @returns {TEntity}
 */
export const selectListSelectedEntity = <TEntity extends IEntity>(listWrapperEntity: IListWrapperEntity): TEntity =>
  ifNotNilThanValue<IListEntity, TEntity>(
    selectListEntity(listWrapperEntity),
    (list) => selectSelectedEntity<TEntity>(list)
  );

/**
 * @stable [04.09.2019]
 * @param {IQueryFilterEntity} filter
 * @returns {IQueryFilterWrapperEntity}
 */
export const mapQueryFilterEntity = (filter: IQueryFilterEntity): IQueryFilterWrapperEntity => ({filter});

/**
 * @stable [04.09.2019]
 * @param {IEditableEntity<TEntity extends IEntity>} form
 * @returns {IEditableEntityFormWrapperEntity}
 */
export const mapEditableEntity =
  <TEntity extends IEntity = IEntity>(form: IEditableEntity<TEntity>): IEditableEntityFormWrapperEntity => ({form});

/**
 * @stable [04.09.2019]
 * @param {IListEntity} list
 * @returns {IListWrapperEntity}
 */
export const mapListEntity = (list: IListEntity): IListWrapperEntity => ({list});

/**
 * @stable [04.09.2019]
 * @param {IListWrapperEntity} listWrapper
 * @returns {IListWrapperEntity}
 */
export const mapListWrapperEntity = (listWrapper: IListWrapperEntity): IListWrapperEntity =>
  mapListEntity(selectListEntity(listWrapper));

/**
 * @stable [05.09.2019]
 * @param {TEntity} entity
 * @param {IEditableEntity} editableEntity
 * @returns {IExtendedEntity<TEntity extends IEntity>}
 */
export const mapExtendedEntity = <TEntity extends IEntity>(entity: TEntity,
                                                           editableEntity?: IEditableEntity): IExtendedEntity<TEntity> =>
  notNilValuesFilter<IExtendedEntity<TEntity>, IExtendedEntity<TEntity>>({
    entity: {
      ...entity as {},
      ...selectChanges(editableEntity),
    } as TEntity,
    entityId: orNull(entity, () => entity.id),
    originalEntity: shallowClone<TEntity>(entity),
    newEntity: R.isNil(entity) || R.isNil(entity.id),
  });

/**
 * @stable [06.09.2019]
 * @param {IListWrapperEntity} listWrapper
 * @param {IEditableEntity} editableEntity
 * @returns {IExtendedEntity<TEntity extends IEntity>}
 */
export const mapListSelectedExtendedEntity =
  <TEntity extends IEntity>(listWrapper: IListWrapperEntity,
                            editableEntity?: IEditableEntity): IExtendedEntity<TEntity> =>
    mapExtendedEntity(
      selectListSelectedEntity(listWrapper),
      editableEntity
    );

/**
 * @stable [04.09.2019]
 * @param {IQueryFilterWrapperEntity} queryFilter
 * @returns {IQueryFilterWrapperEntity}
 */
export const mapQueryFilterWrapperEntity = (queryFilter: IQueryFilterWrapperEntity): IQueryFilterWrapperEntity =>
  mapQueryFilterEntity(selectQueryFilterEntity(queryFilter));

/**
 * @stable [30.08.2019]
 * @param {IQueryFilterWrapperEntity} entity
 * @returns {string}
 */
export const queryFilterWrapperToQuery = (entity: IQueryFilterWrapperEntity): string => ifNotNilThanValue(
  entity.filter,
  (filter) => trimmedUndefEmpty(filter.query),
  UNDEF_SYMBOL
);

/**
 * @stable [22.08.2019]
 * @param {IQueryFilterWrapperEntity} entity
 * @returns {IQueryWrapper}
 */
export const queryFilterWrapperMapToQueryWrapper = (entity: IQueryFilterWrapperEntity): IQueryWrapper =>
  defValuesFilter<IQueryWrapper, IQueryWrapper>({query: queryFilterWrapperToQuery(entity)});

/**
 * @stable [24.08.2019]
 * @param {IPaginatedEntity} entity
 * @returns {IPaginatedEntity}
 */
export const paginatedEntityMapToPaginatedEntity = (entity: IPaginatedEntity): IPaginatedEntity =>
  defValuesFilter<IPaginatedEntity, IPaginatedEntity>({
    page: entity.page,
    pageSize: entity.pageSize,
    totalCount: entity.totalCount,
  });
