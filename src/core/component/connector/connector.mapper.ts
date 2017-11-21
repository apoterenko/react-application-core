import { IApplicationFormState } from '../../component/form';
import { ApplicationStateT } from '../../store';
import { IApplicationListState, IApplicationListWrapperState } from '../../component/list';
import { IEntity } from '../../definition.interface';
import {
  IApplicationFilterFormWrapperState,
  IApplicationFilterState,
  IApplicationFilterWrapperState,
} from '../../component/filter';
import { IApplicationDictionariesWrapperState } from '../../dictionary';
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

export const entityMapper = (entity: IEntity, formState?: IApplicationFormState): IEntity => ({
  entity: {
    ...entity || {},
    ...formState && formState.changes,
  },
});

export const listWrapperEntityMapper = (listWrapperState: IApplicationListWrapperState,
                                        formState?: IApplicationFormState): IEntity =>
    entityMapper(listWrapperState.list ? listWrapperState.list.selected : null, formState);

export const formMapper = (formState: IApplicationFormState) => ({
  form: {
    ...formState || {},
  },
});

export const listMapper = (listState: IApplicationListState) => ({
  list: {
    ...listState || {},
  },
});

export const filterMapper = (filterState: IApplicationFilterState) => ({
  filter: {
    ...filterState || {},
  },
});

export const filterFormMapper = (formState: IApplicationFormState) => ({
  filterForm: {
    ...formState || {},
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
