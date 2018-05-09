import * as R from 'ramda';

import { orNull } from '../../util';
import {
  IEntity,
  IEntityWrapper,
  DEFAULT_PAGE_SIZE,
  FIRST_PAGE,
} from '../../definitions.interface';
import {
  IDefaultFormEntity,
  IEntityWrapperEntity,
  IListWrapperEntity,
  IListEntity,
  ITransportWrapperEntity,
  IUserWrapperEntity,
  IDictionariesWrapperEntity,
  IUniversalApplicationStoreEntity,
  IPagedEntity,
} from '../../entities-definitions.interface';

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
 * @stable [09.05.2018]
 * @param {IListEntity} listEntity
 * @returns {IListWrapperEntity}
 */
export const listMapper = (listEntity: IListEntity): IListWrapperEntity => ({
  list: {
    ...listEntity,
  },
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
 * @stable [09.05.2018]
 * @param {IListWrapperEntity} listEntity
 * @param {number} pageSize
 * @returns {IPagedEntity}
 */
export const listEntityWrapperPageEntityFilterMapper =
  (listEntity: IListWrapperEntity, pageSize = DEFAULT_PAGE_SIZE): IPagedEntity =>
    listEntityPageEntityFilterMapper(listEntity.list, pageSize);

/**
 * @stable [09.05.2018]
 * @param {IListWrapperEntity} listWrapperEntity
 * @returns {IListWrapperEntity}
 */
export const listWrapperMapper = (listWrapperEntity: IListWrapperEntity): IListWrapperEntity =>
  listMapper(listWrapperEntity.list);

/* @stable - 12.04.2018 */
export const entityMapper = <TEntity extends IEntity>(entity: TEntity,
                                                      formEntity?: IDefaultFormEntity): IEntityWrapperEntity<TEntity> =>
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
                            formEntity?: IDefaultFormEntity): IEntityWrapper<TEntity> =>
    entityMapper<TEntity>(
      listSelectedEntityMapper<TEntity>(listWrapperState),
      formEntity
    );

/* @stable - 16.04.2018 */
export const universalDefaultMappers = [
  transportMapper,
  userMapper,
  dictionariesMapper
];
