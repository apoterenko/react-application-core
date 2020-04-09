import * as R from 'ramda';

import {
  ifNotNilThanValue,
  mapDictionariesWrapperEntity,
  mapTransportWrapperEntity,
  mapUserWrapperEntity,
  orNull,
} from '../../util';
import {
  DEFAULT_PAGE_SIZE,
  FIRST_PAGE,
  IActionsDisabledWrapper,
  IEntity,
  IEntityWrapper,
} from '../../definitions.interface';
import {
  IGenericEditableEntity,
  IExtendedEntity,
  IExtendedFormEditableEntity,
  IListEntity,
  IListWrapperEntity,
  IGenericPagedEntity,
  ToolbarToolsEnum,
} from '../../definition';
import {
  IDataMutatorEntity,
} from '../../entities-definitions.interface';

/**
 * @deprecated mapEditableEntity
 */
export const formMapper = (editableEntity: IGenericEditableEntity): IExtendedFormEditableEntity => ({
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
 * @deprecated Use mapListPagedEntity
 */
export const listEntityPageEntityFilterMapper = (listEntity: IListEntity, pageSize = DEFAULT_PAGE_SIZE): IGenericPagedEntity => ({
  page: listEntity.lockPage ? listEntity.page : FIRST_PAGE,
  pageSize,
});

/**
 * @deprecated Use mapListWrapperPagedEntity
 */
export const listEntityWrapperPageEntityFilterMapper =
  (listEntity: IListWrapperEntity, pageSize = DEFAULT_PAGE_SIZE): IGenericPagedEntity =>
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
 * @deprecated Use selectChanges
 */
export const editableEntityChangesSelector = <TResult extends IEntity = IEntity>(entity: IGenericEditableEntity): TResult =>
  entity.changes as TResult;

/**
 * @deprecated Use mapExtendedEntity
 */
export const entityMapper = <TEntity extends IEntity>(entity: TEntity,
                                                      editableEntity?: IGenericEditableEntity): IExtendedEntity<TEntity> =>
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
                            formEntity?: IGenericEditableEntity): IEntityWrapper<TEntity> =>
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
export const toolbarActiveFilterToolEditableEntityMapper = (editableEntity: IGenericEditableEntity): ToolbarToolsEnum[] =>
  R.isNil(editableEntity) || R.isEmpty(editableEntity.changes) ? [] : [ToolbarToolsEnum.FILTER];

/**
 * @deprecated selectFormEntityToolbarToolsActiveFilter
 */
export const toolbarActiveFilterToolFormWrapperEntityMapper = (entityFormEntity: IExtendedFormEditableEntity): ToolbarToolsEnum[] =>
  toolbarActiveFilterToolEditableEntityMapper(entityFormEntity.form);

/**
 * @stable [29.05.2018]
 */
export const universalDefaultMappers = [
  mapDictionariesWrapperEntity,
  mapTransportWrapperEntity,
  mapUserWrapperEntity
];
