import * as R from 'ramda';

import { orNull } from '../../util';
import { IApplicationFormState } from '../../component/form';
import { ApplicationStateT, IApplicationState } from '../../store';
import {
  IEntity,
  IEntityWrapper,
  IFormWrapper,
  IUserWrapper,
  IDictionariesWrapper,
  IDictionaries,
} from '../../definition.interface';
import {
  IApplicationFilterFormWrapperState,
  IApplicationFilterState,
  IApplicationFilterWrapperState,
} from '../../component/filter';
import { IApplicationTransportWrapperState } from '../../transport';
import { IApplicationNotificationWrapperState } from '../../notification';
import { IApplicationUserState } from '../../user';
import { IApplicationLayoutWrapperState } from '../../component/layout';
import { IApplicationRootWrapperState } from '../../component/root';
import {
  IChannelWrapperEntity,
  IEntityWrapperEntity,
  IListEntity,
  IListWrapperEntity,
} from '../../entities-definitions.interface';

export const rootMapper = (state: ApplicationStateT): IApplicationRootWrapperState => ({
  root: {
    ...state.root,
  },
});

export const layoutMapper = (state: ApplicationStateT): IApplicationLayoutWrapperState => ({
  layout: {
    ...state.layout,
  },
});

export const entityMapper =
    <TEntity extends IEntity>(entity: TEntity,
                              formState?: IApplicationFormState): IEntityWrapperEntity<TEntity> =>
        ({
          entity: {
            ...entity as {},
            ...formState && formState.changes,
          } as TEntity,
          entityId: orNull(entity, () => entity.id),
          originalEntity: { ...entity as {} } as TEntity,
          newEntity: !entity || R.isNil(entity.id),
        });

export const listSelectedEntityMapper =
    <TEntity extends IEntity>(listWrapperState: IListWrapperEntity): TEntity =>
        orNull(listWrapperState.list, () => listWrapperState.list.selected as TEntity);

export const listWrapperSelectedEntityMapper =
    <TEntity extends IEntity>(listWrapperState: IListWrapperEntity,
                              formState?: IApplicationFormState): IEntityWrapper<TEntity> =>
    entityMapper<TEntity>(
        listSelectedEntityMapper<TEntity>(listWrapperState),
        formState
    );

export const formMapper = (formState: IApplicationFormState): IFormWrapper<IApplicationFormState> => ({
  form: {
    ...formState,
  },
});

export const listMapper = (listEntity: IListEntity) => ({
  list: {
    ...listEntity,
  },
});

export const filterMapper = (filterState: IApplicationFilterState) => ({
  filter: {
    ...filterState,
  },
});

export const filterFormMapper = (formState: IApplicationFormState) => ({
  filterForm: {
    ...formState,
  },
});

export const userMapper = (state: ApplicationStateT): IUserWrapper<IApplicationUserState> => ({
  user: {
    ...state.user,
  },
});

export const notificationMapper = (state: ApplicationStateT): IApplicationNotificationWrapperState => ({
  notification: {
    ...state.notification,
  },
});

export const channelMapper = (state: ApplicationStateT): IChannelWrapperEntity => ({
  channel: {
    ...state.channel,
  },
});

export const transportMapper = (state: ApplicationStateT): IApplicationTransportWrapperState => ({
  transport: {
    ...state.transport,
  },
});

export const dictionariesMapper = (state: ApplicationStateT): IDictionariesWrapper<IDictionaries> => ({
  dictionaries: {
    ...state.dictionaries,
  },
});

export const listWrapperMapper = (listState: IListWrapperEntity) =>
    listMapper(listState.list);

export const filterWrapperMapper = (filterState: IApplicationFilterWrapperState) =>
    filterMapper(filterState.filter);

export const filterFormWrapperMapper = (filterState: IApplicationFilterFormWrapperState) =>
    filterFormMapper(filterState.filterForm);

export const defaultMappers = [
  layoutMapper,
  rootMapper,
  userMapper,
  notificationMapper,
  transportMapper,
  dictionariesMapper,
  channelMapper
];
