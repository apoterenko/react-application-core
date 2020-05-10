import * as R from 'ramda';

import {
  ifNotNilThanValue,
  mapDictionariesWrapperEntity,
  mapTransportWrapperEntity,
  mapUserWrapperEntity,
  orNull,
} from '../../util';
import {
  IEntity,
  IEntityWrapper,
} from '../../definitions.interface';
import {
  DEFAULT_PAGE_SIZE,
  FIRST_PAGE,
  IReduxFormEntity,
  IExtendedEntity,
  IExtendedFormEntity,
  IDeprecatedListEntity,
  IListEntity,
  IReduxPagedEntity,
} from '../../definition';
import {
  IDataMutatorEntity,
} from '../../entities-definitions.interface';

/**
 * @deprecated mapEditableEntity
 */
export const formMapper = (editableEntity: IReduxFormEntity): IExtendedFormEntity => ({
  form: {
    ...editableEntity,
  },
});

/**
 * @stable [16.05.2018]
 * @param {IDeprecatedListEntity} listEntity
 * @param {IDataMutatorEntity} dataMutator
 * @returns {IListEntity}
 */
export const listMapper = (listEntity: IDeprecatedListEntity, dataMutator?: IDataMutatorEntity): IListEntity => {
  const list: IDeprecatedListEntity = {
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
export const listEntityPageEntityFilterMapper = (listEntity: IDeprecatedListEntity, pageSize = DEFAULT_PAGE_SIZE): IReduxPagedEntity => ({
  page: listEntity.lockPage ? listEntity.page : FIRST_PAGE,
  pageSize,
});

/**
 * @deprecated Use mapListWrapperPagedEntity
 */
export const listEntityWrapperPageEntityFilterMapper =
  (listEntity: IListEntity, pageSize = DEFAULT_PAGE_SIZE): IReduxPagedEntity =>
    listEntityPageEntityFilterMapper(listEntity.list, pageSize);

/**
 * @stable [30.01.2019]
 * @param {IListEntity} listWrapperEntity
 * @returns {IDeprecatedListEntity}
 */
export const listSelector = (listWrapperEntity: IListEntity): IDeprecatedListEntity =>
  ifNotNilThanValue<IListEntity, IDeprecatedListEntity>(listWrapperEntity, () => listWrapperEntity.list);

/**
 * @deprecated Use mapListWrapperEntity
 */
export const listWrapperMapper = (listWrapperEntity: IListEntity, dataMutator?: IDataMutatorEntity): IListEntity =>
  listMapper(listSelector(listWrapperEntity), dataMutator);

/**
 * @deprecated Use selectChanges
 */
export const editableEntityChangesSelector = <TResult extends IEntity = IEntity>(entity: IReduxFormEntity): TResult =>
  entity.changes as TResult;

/**
 * @deprecated Use mapExtendedEntity
 */
export const entityMapper = <TEntity extends IEntity>(entity: TEntity,
                                                      editableEntity?: IReduxFormEntity): IExtendedEntity<TEntity> =>
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
export const selectedEntitySelector = <TEntity extends IEntity>(listEntity: IDeprecatedListEntity): TEntity =>
  orNull<TEntity>(listEntity, (): TEntity => listEntity.selected as TEntity);

/**
 * @deprecated Use selectListSelectedEntity
 */
export const listSelectedEntitySelector = <TEntity extends IEntity>(listWrapperEntity: IListEntity): TEntity =>
  ifNotNilThanValue<IDeprecatedListEntity, TEntity>(listWrapperEntity.list, (list) => selectedEntitySelector<TEntity>(list));

/**
 * @deprecated Use mapListSelectedExtendedEntity
 */
export const listWrapperSelectedEntityMapper =
  <TEntity extends IEntity>(listWrapperState: IListEntity,
                            formEntity?: IReduxFormEntity): IEntityWrapper<TEntity> =>
    entityMapper<TEntity>(
      listSelectedEntitySelector<TEntity>(listWrapperState),
      formEntity
    );

/**
 * @stable [29.05.2018]
 */
export const universalDefaultMappers = [
  mapDictionariesWrapperEntity,
  mapTransportWrapperEntity,
  mapUserWrapperEntity
];
