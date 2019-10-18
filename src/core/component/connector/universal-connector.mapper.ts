import * as R from 'ramda';

import {
  defValuesFilter,
  ifNotNilThanValue,
  mapUserWrapperEntity,
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
  IDictionariesWrapperEntity,
  IDictionaryEntity,
  IEditableEntity,
  IExtendedEntity,
  IFormWrapperEntity,
  IPagedEntity,
  IPaginatedEntity,
  ITabPanelEntity,
  ITabPanelWrapperEntity,
  ITransportWrapperEntity,
  IUniversalStoreEntity,
  ToolbarToolsEnum,
} from '../../definition';
import {
  IListWrapperEntity,
  IListEntity,
  IDataMutatorEntity,
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
 * @deprecated Use mapListPagedEntity
 */
export const listEntityPageEntityFilterMapper = (listEntity: IListEntity, pageSize = DEFAULT_PAGE_SIZE): IPagedEntity => ({
  page: listEntity.lockPage ? listEntity.page : FIRST_PAGE,
  pageSize,
});

/**
 * @deprecated Use mapListWrapperPagedEntity
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
 * @deprecated Use mapExtendedEntity
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
 * @deprecated selectEditableEntityToolbarToolsActiveFilter
 */
export const toolbarActiveFilterToolEditableEntityMapper = (editableEntity: IEditableEntity): ToolbarToolsEnum[] =>
  R.isNil(editableEntity) || R.isEmpty(editableEntity.changes) ? [] : [ToolbarToolsEnum.FILTER];

/**
 * @deprecated selectFormEntityToolbarToolsActiveFilter
 */
export const toolbarActiveFilterToolFormWrapperEntityMapper = (entityFormEntity: IFormWrapperEntity): ToolbarToolsEnum[] =>
  toolbarActiveFilterToolEditableEntityMapper(entityFormEntity.form);

/**
 * @stable [29.05.2018]
 */
export const universalDefaultMappers = [
  transportMapper,
  mapUserWrapperEntity,
  dictionariesMapper
];
