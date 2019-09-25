import * as R from 'ramda';

import { defValuesFilter } from './filter';
import {
  IEditableEntity,
  IFormWrapperEntity,
  IExtendedEntity,
  ILifeCycleEntity,
  IPagedEntity,
  IPaginatedEntity,
  IQueryFilterEntity,
  IQueryFilterWrapperEntity,
  ToolbarToolsEnum,
} from '../definition';
import {
  IActionsDisabledWrapper,
  IEntity,
  IKeyValue,
  IQueryWrapper,
  UNDEF_SYMBOL,
} from '../definitions.interface';
import { trimmedUndefEmpty } from './nvl';
import { ifNotNilThanValue, ifNotEmptyThanValue } from './cond';
import {
  IListEntity,
  IListWrapperEntity,
} from '../entities-definitions.interface';
import { shallowClone } from './clone';

/**
 * @stable [04.09.2019]
 * @param {IFormWrapperEntity<TEntity extends IEntity>} entity
 * @returns {IEditableEntity<TEntity extends IEntity>}
 */
export const selectEditableEntity =
  <TEntity extends IEntity = IEntity>(entity: IFormWrapperEntity<TEntity>): IEditableEntity<TEntity> =>
    ifNotNilThanValue(entity, (): IEditableEntity<TEntity> => entity.form, UNDEF_SYMBOL);

/**
 * @stable [04.09.2019]
 * @param {IEditableEntity} entity
 * @returns {TResult}
 */
export const selectChanges = <TResult extends IEntity = IEntity>(entity: IEditableEntity): TResult =>
  ifNotNilThanValue(entity, (): TResult => entity.changes as TResult, UNDEF_SYMBOL);

/**
 * @stable [04.09.2019]
 * @param {IFormWrapperEntity} entity
 * @returns {TResult}
 */
export const selectEditableEntityChanges = <TResult extends IEntity = IEntity>(entity: IFormWrapperEntity): TResult =>
  ifNotNilThanValue(entity, (): TResult => selectChanges<TResult>(selectEditableEntity(entity)), UNDEF_SYMBOL);

/**
 * @stable [04.09.2019]
 * @param {IListWrapperEntity} entity
 * @returns {IListEntity}
 */
export const selectListEntity = (entity: IListWrapperEntity): IListEntity =>
  ifNotNilThanValue(entity, (): IListEntity => entity.list, UNDEF_SYMBOL);

/**
 * @stable [17.09.2019]
 * @param {ILifeCycleEntity} entity
 * @returns {boolean}
 */
export const selectLifeCycleEntityProgress = (entity: ILifeCycleEntity): boolean => entity.progress;

/**
 * @stable [04.09.2019]
 * @param {IQueryFilterWrapperEntity} entity
 * @returns {IQueryFilterEntity}
 */
export const selectQueryFilterEntity = (entity: IQueryFilterWrapperEntity): IQueryFilterEntity =>
  ifNotNilThanValue(entity, (): IQueryFilterEntity => entity.filter, UNDEF_SYMBOL);

/**
 * @stable [10.09.2019]
 * @param {IQueryFilterEntity} entity
 * @returns {string}
 */
export const selectQuery = (entity: IQueryFilterEntity): string =>
  ifNotNilThanValue(entity, (): string => trimmedUndefEmpty(entity.query), UNDEF_SYMBOL);

/**
 * @stable [04.09.2019]
 * @param {IListEntity} listEntity
 * @returns {TEntity}
 */
export const selectSelectedEntity = <TEntity extends IEntity>(listEntity: IListEntity): TEntity =>
  ifNotNilThanValue(listEntity, (): TEntity => listEntity.selected as TEntity, UNDEF_SYMBOL);

/**
 * @stable [04.09.2019]
 * @param {IListWrapperEntity} listWrapperEntity
 * @returns {TEntity}
 */
export const selectListSelectedEntity = <TEntity extends IEntity>(listWrapperEntity: IListWrapperEntity): TEntity =>
  ifNotNilThanValue<IListEntity, TEntity>(
    selectListEntity(listWrapperEntity),
    (list) => selectSelectedEntity<TEntity>(list),
    UNDEF_SYMBOL
  );

/**
 * @stable [30.08.2019]
 * @param {IQueryFilterWrapperEntity} entity
 * @returns {string}
 */
export const selectFilterWrapperQuery = (entity: IQueryFilterWrapperEntity): string => ifNotNilThanValue(
  selectQueryFilterEntity(entity),
  (filterEntity) => selectQuery(filterEntity),
  UNDEF_SYMBOL
);

/**
 * @stable [10.09.2019]
 * @param {string} query
 * @returns {IQueryWrapper}
 */
export const mapQuery = (query: string): IQueryWrapper => defValuesFilter<IQueryWrapper, IQueryWrapper>({query});

/**
 * @stable [04.09.2019]
 * @param {IQueryFilterEntity} filter
 * @returns {IQueryFilterWrapperEntity}
 */
export const mapQueryFilterEntity = (filter: IQueryFilterEntity): IQueryFilterWrapperEntity =>
  defValuesFilter<IQueryFilterWrapperEntity, IQueryFilterWrapperEntity>({filter});

/**
 * @stable [04.09.2019]
 * @param {IEditableEntity<TEntity extends IEntity>} form
 * @returns {IFormWrapperEntity}
 */
export const mapEditableEntity =
  <TEntity extends IEntity = IEntity>(form: IEditableEntity<TEntity>): IFormWrapperEntity =>
    defValuesFilter<IFormWrapperEntity, IFormWrapperEntity>({form});

/**
 * @stable [04.09.2019]
 * @param {IListEntity} list
 * @returns {IListWrapperEntity}
 */
export const mapListEntity = (list: IListEntity): IListWrapperEntity =>
  defValuesFilter<IListWrapperEntity, IListWrapperEntity>({list});

/**
 * @stable [10.09.2019]
 * @param {IPagedEntity} entity
 * @returns {IPagedEntity}
 */
export const mapPagedEntity = (entity: IPagedEntity): IPagedEntity => ifNotNilThanValue(
  entity,
  () => defValuesFilter<IPaginatedEntity, IPaginatedEntity>({
    page: entity.page,
    pageSize: entity.pageSize,
  }),
  UNDEF_SYMBOL
);

/**
 * @stable [10.09.2019]
 * @param {IPaginatedEntity} entity
 * @returns {IPaginatedEntity}
 */
export const mapPaginatedEntity = (entity: IPaginatedEntity): IPaginatedEntity => ifNotNilThanValue(
  entity,
  () => defValuesFilter<IPaginatedEntity, IPaginatedEntity>({
    ...mapPagedEntity(entity),
    totalCount: entity.totalCount,
  }),
  UNDEF_SYMBOL
);

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
  defValuesFilter<IExtendedEntity<TEntity>, IExtendedEntity<TEntity>>({
    entity: {
      ...entity as {},
      ...selectChanges(editableEntity),
    } as TEntity,
    entityId: ifNotNilThanValue(entity, () => entity.id, UNDEF_SYMBOL),
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
 * @stable [10.09.2019]
 * @param {IQueryFilterWrapperEntity} entity
 * @returns {IQueryWrapper}
 */
export const mapFilterWrapperQuery = (entity: IQueryFilterWrapperEntity): IQueryWrapper =>
  mapQuery(selectFilterWrapperQuery(entity));

/**
 * @stable [17.09.2019]
 * @param {boolean} actionsDisabled
 * @returns {IActionsDisabledWrapper}
 */
export const mapActionsDisabled = (actionsDisabled: boolean): IActionsDisabledWrapper =>
  defValuesFilter<IActionsDisabledWrapper, IActionsDisabledWrapper>({actionsDisabled});

/**
 * @stable [17.09.2019]
 * @param {IListEntity} list
 * @returns {IActionsDisabledWrapper}
 */
export const mapListActionsDisabled = (list: IListEntity): IActionsDisabledWrapper =>
  mapActionsDisabled(selectLifeCycleEntityProgress(list));

/**
 * @stable [17.09.2019]
 * @param {IListWrapperEntity} listWrapper
 * @returns {}
 */
export const mapListWrapperActionsDisabled = (listWrapper: IListWrapperEntity): IActionsDisabledWrapper =>
  mapListActionsDisabled(selectListEntity(listWrapper));

/**
 * @stable [18.09.2019]
 * @param {IEditableEntity} editableEntity
 * @returns {ToolbarToolsEnum[]}
 */
export const selectEditableEntityToolbarToolsActiveFilter = (editableEntity: IEditableEntity): ToolbarToolsEnum[] =>
  ifNotEmptyThanValue(
    selectChanges(editableEntity),
    () => [ToolbarToolsEnum.FILTER],
    []
  );

/**
 * @stable [18.09.2019]
 * @param {IFormWrapperEntity} entityFormEntity
 * @returns {ToolbarToolsEnum[]}
 */
export const selectFormEntityToolbarToolsActiveFilter = (entityFormEntity: IFormWrapperEntity): ToolbarToolsEnum[] =>
  selectEditableEntityToolbarToolsActiveFilter(selectEditableEntity(entityFormEntity));
