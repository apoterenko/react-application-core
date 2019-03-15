import * as R from 'ramda';

import { orNull, filterAndSortEntities, isFn, trimmedUndefEmpty, defValuesFilter, ifNotNilThanValue } from '../../util';
import {
  IEntity,
  IEntityWrapper,
  DEFAULT_PAGE_SIZE,
  FIRST_PAGE,
  IQueryWrapper,
  IDisabledWrapper,
  AnyT,
  IKeyValue,
  IActionsDisabledWrapper,
} from '../../definitions.interface';
import {
  IExtendedEntity,
  ITabPanelWrapperEntity,
  ITabPanelEntity,
} from '../../definition';
import {
  IOptionEntity,
  IEditableEntity,
  IListWrapperEntity,
  IListEntity,
  ITransportWrapperEntity,
  IUserWrapperEntity,
  IDictionariesWrapperEntity,
  IUniversalApplicationStoreEntity,
  IPagedEntity,
  IDataMutatorEntity,
  IFilterFormWrapperEntity,
  IFormWrapperEntity,
  IDictionaryEntity,
  ISelectOptionEntity,
  IEditableEntityFormWrapperEntity,
  IQueryFilterWrapperEntity,
} from '../../entities-definitions.interface';
import {
  IFilterConfiguration,
  IFilterAndSorterConfiguration,
  ToolbarActionEnum,
} from '../../configurations-definitions.interface';

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
 * @stable [14.06.2018]
 * @param {IEditableEntity} editableEntity
 * @returns {IEditableEntityFormWrapperEntity}
 */
export const formMapper = (editableEntity: IEditableEntity): IEditableEntityFormWrapperEntity => ({
  form: {
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
 * @stable [30.01.2019]
 * @param {IListWrapperEntity} listWrapperEntity
 * @returns {IListEntity}
 */
export const listSelector = (listWrapperEntity: IListWrapperEntity): IListEntity =>
  ifNotNilThanValue<IListWrapperEntity, IListEntity>(listWrapperEntity, () => listWrapperEntity.list);

/**
 * @stable [16.05.2018]
 * @param {IListWrapperEntity} listWrapperEntity
 * @param {IDataMutatorEntity} dataMutator
 * @returns {IListWrapperEntity}
 */
export const listWrapperMapper = (listWrapperEntity: IListWrapperEntity, dataMutator?: IDataMutatorEntity): IListWrapperEntity =>
  listMapper(listSelector(listWrapperEntity), dataMutator);

/**
 * @stable [31.08.2018]
 * @param {ITabPanelEntity} tabPanel
 * @returns {ITabPanelEntity}
 */
export const tabPanelMapper = (tabPanel: ITabPanelEntity): ITabPanelWrapperEntity => ({tabPanel: {...tabPanel}});

/**
 * @stable [30.08.2018]
 * @param {ITabPanelWrapperEntity} tabPanelWrapperEntity
 * @returns {ITabPanelWrapperEntity}
 */
export const tabPanelWrapperMapper = (tabPanelWrapperEntity: ITabPanelWrapperEntity): ITabPanelWrapperEntity =>
  tabPanelMapper(tabPanelWrapperEntity.tabPanel);

/**
 * @stable [05.08.2018]
 * @param {IFilterFormWrapperEntity} filterFormWrapperEntity
 * @param {boolean} useFormMapper
 * @returns {TResult}
 */
export const filterFormWrapperMapper = <TResult = IFilterFormWrapperEntity | IFormWrapperEntity>(
  filterFormWrapperEntity: IFilterFormWrapperEntity,
  useFormMapper: boolean = false): TResult =>
  (useFormMapper ? formMapper : filterFormMapper)(filterFormWrapperEntity.filterForm) as TResult;

/**
 * @stable [05.08.2018]
 * @param {IFilterFormWrapperEntity} filterFormWrapperEntity
 * @returns {TResult}
 */
export const filterFormChangesWrapperMapper = <TResult = IEntity>(filterFormWrapperEntity: IFilterFormWrapperEntity): TResult =>
  ({
    ...filterFormWrapperEntity.filterForm.changes,
  } as TResult);

/**
 * @stable [17.01.2019]
 * @param {IEditableEntity} entity
 * @returns {TResult}
 */
export const editableEntityChangesSelector = <TResult extends IEntity = IEntity>(entity: IEditableEntity): TResult =>
  entity.changes as TResult;

/**
 * @stable [17.01.2019]
 * @param {IEditableEntity} editableEntity
 * @returns {TResult}
 */
export const editableEntityChangesMapper = <TResult extends IEntity = IEntity>(editableEntity: IEditableEntity): TResult =>
  ({
    ...editableEntityChangesSelector(editableEntity),
  } as TResult);

/**
 * @stable [05.08.2018]
 * @param {IQueryFilterWrapperEntity} queryFilterWrapperEntity
 * @returns {IQueryWrapper}
 */
export const filterQueryWrapperMapper = (queryFilterWrapperEntity: IQueryFilterWrapperEntity): IQueryWrapper =>
  ({
    query: trimmedUndefEmpty(queryFilterWrapperEntity.filter.query),
  });

/**
 * @stable [19.12.2018]
 * @param {IListWrapperEntity} entity
 * @returns {IFilterConfiguration}
 */
export const refreshedListWrapperEntityMapper = (entity: IListWrapperEntity): IFilterConfiguration => ({
  actions: [{type: ToolbarActionEnum.REFRESH_DATA}],
  ...actionsDisabledListWrapperEntityMapper(entity),
});

/* @stable - 12.04.2018 */
export const entityMapper = <TEntity extends IEntity>(entity: TEntity,
                                                      formEntity?: IEditableEntity): IExtendedEntity<TEntity> =>
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
export const selectedEntitySelector = <TEntity extends IEntity>(listEntity: IListEntity): TEntity =>
  orNull<TEntity>(listEntity, (): TEntity => listEntity.selected as TEntity);

/**
 * @stable [10.01.2019]
 * @param {IListWrapperEntity} listWrapperEntity
 * @returns {TEntity}
 */
export const listSelectedEntitySelector = <TEntity extends IEntity>(listWrapperEntity: IListWrapperEntity): TEntity =>
  ifNotNilThanValue<IListEntity, TEntity>(listWrapperEntity.list, (list) => selectedEntitySelector<TEntity>(list));

/* @stable - 12.04.2018 */
export const listWrapperSelectedEntityMapper =
  <TEntity extends IEntity>(listWrapperState: IListWrapperEntity,
                            formEntity?: IEditableEntity): IEntityWrapper<TEntity> =>
    entityMapper<TEntity>(
      listSelectedEntitySelector<TEntity>(listWrapperState),
      formEntity
    );

/**
 * @stable [19.12.2018]
 * @param {IListEntity} listEntity
 * @returns {IDisabledWrapper}
 */
export const disabledListEntityMapper = (listEntity: IListEntity): IDisabledWrapper => ({
  disabled: listEntity.progress,
});

/**
 * @stable [29.05.2018]
 * @param {IListEntity} listEntity
 * @returns {IActionsDisabledWrapper}
 */
export const actionsDisabledListEntityMapper = (listEntity: IListEntity): IActionsDisabledWrapper => ({
  actionsDisabled: listEntity.progress,
});

/**
 * @stable [29.05.2018]
 * @param {IListWrapperEntity} listWrapperEntity
 * @returns {IActionsDisabledWrapper}
 */
export const actionsDisabledListWrapperEntityMapper = (listWrapperEntity: IListWrapperEntity): IActionsDisabledWrapper =>
  actionsDisabledListEntityMapper(listWrapperEntity.list);

/**
 * @stable [19.12.2018]
 * @param {IListWrapperEntity} listWrapperEntity
 * @returns {IDisabledWrapper}
 */
export const disabledListWrapperEntityMapper = (listWrapperEntity: IListWrapperEntity): IDisabledWrapper =>
  disabledListEntityMapper(listWrapperEntity.list);

/**
 * @stable [31.08.2018]
 * @param {TEntity[] | TEntity} data
 * @param {IFilterAndSorterConfiguration} config
 * @returns {Array<ISelectOptionEntity<TEntity extends IOptionEntity>>}
 */
export const selectOptionsMapper =
  <TEntity extends IOptionEntity>(data: TEntity[] | TEntity,
                                  config?: IFilterAndSorterConfiguration): Array<ISelectOptionEntity<TEntity>> => {
  const entities: TEntity[] = filterAndSortEntities<TEntity>(data, config);
  return orNull<Array<ISelectOptionEntity<TEntity>>>(
    !R.isNil(entities),
    () => (
      entities.map<ISelectOptionEntity<TEntity>>((entity): ISelectOptionEntity<TEntity> =>
        defValuesFilter<ISelectOptionEntity<TEntity>, ISelectOptionEntity<TEntity>>({
          value: entity.id,
          label: entity.name,
          disabled: entity.disabled,
          rawData: entity,
        }))
    )
  );
};

/**
 * @stable [16.06.2018]
 * @param {IDictionaryEntity<TDictionaryEntity>} dictionaryEntity
 * @param {IFilterAndSorterConfiguration} config
 * @returns {Array<ISelectOptionEntity<TDictionaryEntity>>}
 */
export const dictionaryEntityMapper
  = <TDictionaryEntity>(dictionaryEntity: IDictionaryEntity<TDictionaryEntity>,
                        config?: IFilterAndSorterConfiguration): Array<ISelectOptionEntity<TDictionaryEntity>> =>
  selectOptionsMapper<TDictionaryEntity>(
    dictionaryEntityDataMapper<TDictionaryEntity>(dictionaryEntity) as TDictionaryEntity[] | TDictionaryEntity,
    config
  );

/**
 * @stable [20.12.2018]
 * @param {IDictionaryEntity<TDictionaryEntity>} dictionaryEntity
 * @param {(data: (TDictionaryEntity[] | TDictionaryEntity)) => TResult} accessor
 * @returns {TResult}
 */
export const dictionaryEntityDataMapper = <TDictionaryEntity, TResult = TDictionaryEntity[] | TDictionaryEntity>(
  dictionaryEntity: IDictionaryEntity<TDictionaryEntity>,
  accessor?: (data: TDictionaryEntity[] | TDictionaryEntity) => TResult): TResult =>
  orNull<TResult>(
    dictionaryEntity,
    () => isFn(accessor) && !R.isNil(dictionaryEntity.data)
      ? accessor(dictionaryEntity.data)
      : dictionaryEntity.data as AnyT
  );

/**
 * @stable [29.05.2018]
 */
export const universalDefaultMappers = [
  transportMapper,
  userMapper,
  dictionariesMapper
];
