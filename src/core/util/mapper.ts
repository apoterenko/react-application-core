import { defValuesFilter } from './filter';
import {
  IPaginatedEntity,
  IQueryFilterWrapperEntity,
} from '../definition';
import { IQueryWrapper, IEntity, UNDEF_SYMBOL } from '../definitions.interface';
import { trimmedUndefEmpty } from './nvl';
import { ifNotNilThanValue, orNull } from './cond';
import {
  IEditableEntity,
  IListEntity,
  IListWrapperEntity,
} from '../entities-definitions.interface';

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

/**
 * @stable [25.08.2019]
 * @param {IListEntity} listEntity
 * @returns {TEntity}
 */
export const listEntityToSelectedEntity = <TEntity extends IEntity>(listEntity: IListEntity): TEntity =>
  orNull(listEntity, (): TEntity => listEntity.selected as TEntity);

/**
 * @stable [25.08.2019]
 * @param {IListWrapperEntity} listWrapperEntity
 * @returns {TEntity}
 */
export const listWrapperEntityToSelectedEntity = <TEntity extends IEntity>(listWrapperEntity: IListWrapperEntity): TEntity =>
  ifNotNilThanValue<IListEntity, TEntity>(
    listWrapperEntity.list,
    (list) => listEntityToSelectedEntity<TEntity>(list)
  );

/**
 * @stable [25.08.2019]
 * @param {IEditableEntity} entity
 * @returns {TResult}
 */
export const editableEntityToChanges = <TResult extends IEntity = IEntity>(entity: IEditableEntity): TResult =>
  entity.changes as TResult;
