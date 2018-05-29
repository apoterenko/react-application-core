import * as R from 'ramda';

import { orNull } from '../../util';
import {
  IEntity,
  IEntityWrapper,
  DEFAULT_PAGE_SIZE,
  FIRST_PAGE,
} from '../../definitions.interface';
import {
  IEditableEntity,
  IEntityWrapperEntity,
  IListWrapperEntity,
  IMutatedListWrapperEntity,
  IListEntity,
  ITransportWrapperEntity,
  IUserWrapperEntity,
  IDictionariesWrapperEntity,
  IUniversalApplicationStoreEntity,
  IPagedEntity,
  IDataMutatorEntity,
  IFilterFormWrapperEntity,
} from '../../entities-definitions.interface';
import { IFilterConfiguration } from '../../configurations-definitions.interface';

/* @stable - 22.04.2018 */
export const dictionariesMapper = (storeEntity: IUniversalApplicationStoreEntity): IDictionariesWrapperEntity => ({
  dictionaries: {
    ...storeEntity.dictionaries,
  },
});

/* @stable - 16.04.2018 */
export const userMapper = (storeEntity: IUniversalApplicationStoreEntity): IUserWrapperEntity => ({
  user: {
    ...storeEntity.user,
  },
});

/* @stable - 16.04.2018 */
export const transportMapper = (storeEntity: IUniversalApplicationStoreEntity): ITransportWrapperEntity => ({
  transport: {
    ...storeEntity.transport,
  },
});

/**
 * @stable [29.05.2018]
 * @param {IEditableEntity} editableEntity
 * @returns {IFilterFormWrapperEntity}
 */
export const filterFormMapper = (editableEntity: IEditableEntity): IFilterFormWrapperEntity => ({
  filterForm: {
    ...editableEntity,
  },
});

/**
 * @stable [16.05.2018]
 * @param {IListEntity} listEntity
 * @param {IDataMutatorEntity} dataMutator
 * @returns {IListWrapperEntity}
 */
export const listMapper = (listEntity: IListEntity, dataMutator?: IDataMutatorEntity): IListWrapperEntity => {
  const list: IListEntity = {
    ...listEntity,
  };
  if (!R.isNil(dataMutator) && !R.isNil(list.data) && list.data.length > 0) {
    if (!R.isNil(dataMutator.sorter)) {
      list.data = R.sort<IEntity>(dataMutator.sorter, list.data);
    }
    if (!R.isNil(dataMutator.filter)) {
      list.totalCount = (list.data = R.filter<IEntity>(dataMutator.filter, list.data)).length;
    }
  }
  return {list};
};

/**
 * @stable [16.05.2018]
 * @param {IListEntity} listEntity
 * @param {IDataMutatorEntity} dataMutator
 * @returns {IMutatedListWrapperEntity}
 */
export const mutatedListMapper = (listEntity: IListEntity, dataMutator: IDataMutatorEntity): IMutatedListWrapperEntity => {
  return {
    mutatedList: listMapper(listEntity, dataMutator).list,
  };
};

/**
 * @stable [09.05.2018]
 * @param {IListEntity} listEntity
 * @param {number} pageSize
 * @returns {IPagedEntity}
 */
export const listEntityPageEntityFilterMapper = (listEntity: IListEntity, pageSize = DEFAULT_PAGE_SIZE): IPagedEntity => ({
  page: listEntity.lockPage ? listEntity.page : FIRST_PAGE,
  pageSize,
});

/**
 * @stable [09.05.2018]
 * @param {IListWrapperEntity} listEntity
 * @param {number} pageSize
 * @returns {IPagedEntity}
 */
export const listEntityWrapperPageEntityFilterMapper =
  (listEntity: IListWrapperEntity, pageSize = DEFAULT_PAGE_SIZE): IPagedEntity =>
    listEntityPageEntityFilterMapper(listEntity.list, pageSize);

/**
 * @stable [16.05.2018]
 * @param {IListWrapperEntity} listWrapperEntity
 * @param {IDataMutatorEntity} dataMutator
 * @returns {IListWrapperEntity}
 */
export const listWrapperMapper = (listWrapperEntity: IListWrapperEntity, dataMutator?: IDataMutatorEntity): IListWrapperEntity =>
  listMapper(listWrapperEntity.list, dataMutator);

/**
 * @stable [29.05.2018]
 * @param {IFilterFormWrapperEntity} filterFormWrapperEntity
 * @returns {IFilterFormWrapperEntity}
 */
export const filterFormWrapperMapper = (filterFormWrapperEntity: IFilterFormWrapperEntity): IFilterFormWrapperEntity =>
  filterFormMapper(filterFormWrapperEntity.filterForm);

/**
 * @stable [16.05.2018]
 * @param {IListWrapperEntity} listWrapperEntity
 * @param {IDataMutatorEntity} dataMutator
 * @returns {IMutatedListWrapperEntity}
 */
export const mutatedListWrapperMapper =
  (listWrapperEntity: IListWrapperEntity, dataMutator: IDataMutatorEntity): IMutatedListWrapperEntity =>
    mutatedListMapper(listWrapperEntity.list, dataMutator);

/* @stable - 12.04.2018 */
export const entityMapper = <TEntity extends IEntity>(entity: TEntity,
                                                      formEntity?: IEditableEntity): IEntityWrapperEntity<TEntity> =>
    ({
      entity: {
        ...entity as {},
        ...formEntity && formEntity.changes,
      } as TEntity,
      entityId: orNull(entity, () => entity.id),
      originalEntity: {...entity as {}} as TEntity,
      newEntity: !entity || R.isNil(entity.id),
    });

/**
 * @stable [09.05.2018]
 * @param {IListEntity} listEntity
 * @returns {TEntity}
 */
export const selectedEntityMapper = <TEntity extends IEntity>(listEntity: IListEntity): TEntity =>
  orNull(listEntity, () => listEntity.selected as TEntity);

/**
 * @stable [09.05.2018]
 * @param {IListWrapperEntity} listWrapperEntity
 * @returns {TEntity}
 */
export const listSelectedEntityMapper = <TEntity extends IEntity>(listWrapperEntity: IListWrapperEntity): TEntity =>
  selectedEntityMapper(listWrapperEntity.list);

/* @stable - 12.04.2018 */
export const listWrapperSelectedEntityMapper =
  <TEntity extends IEntity>(listWrapperState: IListWrapperEntity,
                            formEntity?: IEditableEntity): IEntityWrapper<TEntity> =>
    entityMapper<TEntity>(
      listSelectedEntityMapper<TEntity>(listWrapperState),
      formEntity
    );

/**
 * @stable [29.05.2018]
 * @param {IListEntity} listEntity
 * @returns {IFilterConfiguration}
 */
export const actionsDisabledListEntityMapper = (listEntity: IListEntity): IFilterConfiguration => ({
  actionsDisabled: listEntity.progress,
});

/**
 * @stable [29.05.2018]
 * @param {IListWrapperEntity} listWrapperEntity
 * @returns {IFilterConfiguration}
 */
export const actionsDisabledListWrapperEntityMapper = (listWrapperEntity: IListWrapperEntity): IFilterConfiguration =>
  actionsDisabledListEntityMapper(listWrapperEntity.list);

/**
 * @stable [29.05.2018]
 */
export const universalDefaultMappers = [
  transportMapper,
  userMapper,
  dictionariesMapper
];
