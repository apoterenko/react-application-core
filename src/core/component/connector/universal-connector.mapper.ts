import * as R from 'ramda';

import { orNull } from '../../util';
import {
  IEntity,
  IEntityWrapper,
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

/* @stable - 16.04.2018 */
export const listMapper = (listEntity: IListEntity): IListWrapperEntity => ({
  list: {
    ...listEntity,
  },
});

/* @stable - 16.04.2018 */
export const listWrapperMapper = (listState: IListWrapperEntity): IListWrapperEntity => listMapper(listState.list);

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

/* @stable - 12.04.2018 */
export const listSelectedEntityMapper = <TEntity extends IEntity>(listWrapperEntity: IListWrapperEntity): TEntity =>
    orNull(listWrapperEntity.list, () => listWrapperEntity.list.selected as TEntity);

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
