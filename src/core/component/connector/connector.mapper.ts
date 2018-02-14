import * as R from 'ramda';

import { orNull } from '../../util';
import { IApplicationFormState } from '../../component/form';
import { ApplicationStateT, IApplicationState } from '../../store';
import { IApplicationListState, IApplicationListWrapperState } from '../../component/list';
import { IEntity, IEntityWrapper, IFormable } from '../../definition.interface';
import {
  IApplicationFilterFormWrapperState,
  IApplicationFilterState,
  IApplicationFilterWrapperState,
} from '../../component/filter';
import { IApplicationDictionariesState, IApplicationDictionariesWrapperState } from '../../dictionary';
import { IApplicationTransportWrapperState } from '../../transport';
import { IApplicationNotificationWrapperState } from '../../notification';
import { IApplicationUserWrapperState } from '../../user';
import { IApplicationLayoutWrapperState } from '../../component/layout';
import { IApplicationRootWrapperState } from '../../component/root';

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
                              formState?: IApplicationFormState): IEntityWrapper<TEntity> =>
        ({
          entity: {
            ...entity as {},
            ...formState && formState.changes,
          } as TEntity,
          entityId: orNull(entity, () => entity.id),
          originalEntity: { ...entity as {} } as TEntity,
          isNewEntity: !entity || R.isNil(entity.id),
          touched: formState && formState.touched,
        });

export const listSelectedEntityMapper =
    <TEntity extends IEntity>(listWrapperState: IApplicationListWrapperState): TEntity =>
        orNull(listWrapperState.list, () => listWrapperState.list.selected as TEntity);

export const listWrapperSelectedEntityMapper =
    <TEntity extends IEntity>(listWrapperState: IApplicationListWrapperState,
                              formState?: IApplicationFormState): IEntityWrapper<TEntity> =>
    entityMapper<TEntity>(
        listSelectedEntityMapper<TEntity>(listWrapperState),
        formState
    );

export const formMapper = (formState: IApplicationFormState): IFormable<IApplicationFormState> => ({
  form: {
    ...formState,
  },
});

export const listMapper = (listState: IApplicationListState) => ({
  list: {
    ...listState,
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

export const userMapper = (state: ApplicationStateT): IApplicationUserWrapperState => ({
  user: {
    ...state.user,
  },
});

export const notificationMapper = (state: ApplicationStateT): IApplicationNotificationWrapperState => ({
  notification: {
    ...state.notification,
  },
});

export const transportMapper = (state: ApplicationStateT): IApplicationTransportWrapperState => ({
  transport: {
    ...state.transport,
  },
});

export const dictionariesMapper = (state: ApplicationStateT): IApplicationDictionariesWrapperState => ({
  dictionaries: {
    ...state.dictionaries,
  },
});

export const listWrapperMapper = (listState: IApplicationListWrapperState) =>
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
  dictionariesMapper
];
