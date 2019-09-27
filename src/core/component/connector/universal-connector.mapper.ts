import * as R from 'ramda';

import {
  defValuesFilter,
  filterAndSortEntities,
  ifNotNilThanValue,
  isFn,
  orNull,
} from '../../util';
import {
  AnyT,
  DEFAULT_PAGE_SIZE,
  FIRST_PAGE,
  IActionsDisabledWrapper,
  IDisabledWrapper,
  IEntity,
  IEntityWrapper,
  IKeyValue,
} from '../../definitions.interface';
import {
  IEditableEntity,
  IExtendedEntity,
  IFormWrapperEntity,
  IPagedEntity,
  IPaginatedEntity,
  ITabPanelEntity,
  ITabPanelWrapperEntity,
  ITransportWrapperEntity,
  IUniversalStoreEntity,
  IUserWrapperEntity,
  ToolbarToolsEnum,
} from '../../definition';
import {
  IOptionEntity,
  IListWrapperEntity,
  IListEntity,
  IDictionariesWrapperEntity,
  IDataMutatorEntity,
  IDictionaryEntity,
  ISelectOptionEntity,
} from '../../entities-definitions.interface';
import {
  IFilterConfiguration,
  IFilterAndSorterConfiguration,
  ToolbarActionEnum,
} from '../../configurations-definitions.interface';

/* @stable - 22.04.2018 */
export const dictionariesMapper = (storeEntity: IUniversalStoreEntity): IDictionariesWrapperEntity => ({
  dictionaries: {
    ...storeEntity.dictionaries,
  },
});

/* @stable - 16.04.2018 */
export const userMapper = (storeEntity: IUniversalStoreEntity): IUserWrapperEntity => ({
  user: {
    ...storeEntity.user,
  },
});

/* @stable - 16.04.2018 */
export const transportMapper = (storeEntity: IUniversalStoreEntity): ITransportWrapperEntity => ({
  transport: {
    ...storeEntity.transport,
  },
});

/**
 * @deprecated mapEditableEntity
 */
export const formMapper = (editableEntity: IEditableEntity): IFormWrapperEntity => ({
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
 * @deprecated (@see mapper.ts)
 * @param {IPaginatedEntity} entity
 * @returns {IPaginatedEntity}
 */
export const listEntityPaginatedEntityMapper = (entity: IPaginatedEntity): IPaginatedEntity =>
  defValuesFilter<IPaginatedEntity, IPaginatedEntity>({
    page: entity.page,
    pageSize: entity.pageSize,
    totalCount: entity.totalCount,
  });

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
 * @deprecated
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
 * @deprecated Use mapListWrapperEntity
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
 * @deprecated Use selectChanges
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
 * @deprecated
 */
export const entityMapper = <TEntity extends IEntity>(entity: TEntity,
                                                      editableEntity?: IEditableEntity): IExtendedEntity<TEntity> =>
    ({
      entity: {
        ...entity as {},
        ...editableEntity && editableEntity.changes,
      } as TEntity,
      entityId: orNull(entity, () => entity.id),
      originalEntity: {...entity as {}} as TEntity,
      newEntity: R.isNil(entity) || R.isNil(entity.id),
    });

/**
 * @deprecated
 */
export const selectedEntitySelector = <TEntity extends IEntity>(listEntity: IListEntity): TEntity =>
  orNull<TEntity>(listEntity, (): TEntity => listEntity.selected as TEntity);

/**
 * @deprecated Use selectListSelectedEntity
 */
export const listSelectedEntitySelector = <TEntity extends IEntity>(listWrapperEntity: IListWrapperEntity): TEntity =>
  ifNotNilThanValue<IListEntity, TEntity>(listWrapperEntity.list, (list) => selectedEntitySelector<TEntity>(list));

/**
 * @deprecated Use mapListSelectedExtendedEntity
 */
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
 * @deprecated
 */
export const actionsDisabledListEntityMapper = (listEntity: IListEntity): IActionsDisabledWrapper => ({
  actionsDisabled: listEntity.progress,
});

/**
 * @deprecated mapListWrapperActionsDisabled
 */
export const actionsDisabledListWrapperEntityMapper = (listWrapperEntity: IListWrapperEntity): IActionsDisabledWrapper =>
  actionsDisabledListEntityMapper(listWrapperEntity.list);

/**
 * @deprecated selectEditableEntityToolbarToolsFilter
 */
export const toolbarActiveFilterToolEditableEntityMapper = (editableEntity: IEditableEntity): ToolbarToolsEnum[] =>
  R.isNil(editableEntity) || R.isEmpty(editableEntity.changes) ? [] : [ToolbarToolsEnum.FILTER];

/**
 * @deprecated selectFormEntityToolbarToolsFilter
 */
export const toolbarActiveFilterToolFormWrapperEntityMapper = (entityFormEntity: IFormWrapperEntity): ToolbarToolsEnum[] =>
  toolbarActiveFilterToolEditableEntityMapper(entityFormEntity.form);

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
