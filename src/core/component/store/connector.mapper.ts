import { IApplicationFormState, IFormEntity } from 'core/component/form';
import { IApplicationState } from 'core/store';
import { IApplicationPermissionsState } from 'core/permission';
import { IApplicationListState } from 'core/component/list';
import { IApplicationFilterState } from 'core/component/filter';

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

export const entityMapper = (entity: IFormEntity, formState?: IApplicationFormState) => ({
  entity: {
    ...entity || {},
    ...formState && formState.changes,
  },
});

export const formAttributesMapper = (formState: IApplicationFormState) => ({
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

export const defaultMappers = [
  layoutMapper,
  rootMapper,
  userMapper,
  notificationMapper,
  dictionariesMapper
];
