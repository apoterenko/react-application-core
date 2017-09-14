import { IApplicationFormState, IFormEntity } from 'core/component/form';
import { IApplicationState } from 'core/store';
import { IApplicationPermissionState } from 'core/permission';
import { IApplicationListState } from 'core/component/list';
import { IApplicationFilterState } from 'core/component/filter';

export const rootMapper = <TAppState extends IApplicationState<TPermissionState, TPermissions>,
                           TPermissionState extends IApplicationPermissionState<TPermissions>,
                           TPermissions>
(state: TAppState) => ({
  root: {
    ...state.root,
  },
});

export const layoutMapper = <TAppState extends IApplicationState<TPermissionState, TPermissions>,
                             TPermissionState extends IApplicationPermissionState<TPermissions>,
                             TPermissions>
(state: TAppState) => ({
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
  attributes: {
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

export const userMapper = <TAppState extends IApplicationState<TPermissionState, TPermissions>,
                           TPermissionState extends IApplicationPermissionState<TPermissions>,
                           TPermissions>
(state: TAppState) => ({
  user: {
    ...state.user,
  },
});

export const defaultMappers = [
  layoutMapper,
  rootMapper,
  userMapper
];
