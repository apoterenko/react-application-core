import { IApplicationFormState } from 'core/component/form';
import { IApplicationState } from 'core/store';
import { IApplicationPermissionsState } from 'core/permission';
import { IApplicationListState, IApplicationListWrapperState } from 'core/component/list';
import { IEntity } from 'core/definition.interface';
import {
  IApplicationFilterFormWrapperState,
  IApplicationFilterState,
  IApplicationFilterWrapperState,
} from 'core/component/filter';

export const rootMapper = (state: IApplicationState<{}, IApplicationPermissionsState<{}>, {}>) => ({
  root: {
    ...state.root,
  },
});

export const layoutMapper = (state: IApplicationState<{}, IApplicationPermissionsState<{}>, {}>) => ({
  layout: {
    ...state.layout,
  },
});

export const entityMapper = (entity: IEntity, formState?: IApplicationFormState) => ({
  entity: {
    ...entity || {},
    ...formState && formState.changes,
  },
});

export const formMapper = (formState: IApplicationFormState) => ({
  form: {
    ...(formState || {}),
  },
});

export const listMapper = (listState: IApplicationListState) => ({
  list: {
    ...(listState || {}),
  },
});

export const filterMapper = (filterState: IApplicationFilterState) => ({
  filter: {
    ...(filterState || {}),
  },
});

export const filterFormMapper = (formState: IApplicationFormState) => ({
  filterForm: {
    ...(formState || {}),
  },
});

export const userMapper = (state: IApplicationState<{}, IApplicationPermissionsState<{}>, {}>) => ({
  user: {
    ...state.user,
  },
});

export const notificationMapper = (state: IApplicationState<{}, IApplicationPermissionsState<{}>, {}>) => ({
  notification: {
    ...state.notification,
  },
});

export const dictionariesMapper = (state: IApplicationState<{}, IApplicationPermissionsState<{}>, {}>) => ({
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
  dictionariesMapper
];
