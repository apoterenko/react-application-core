import { IDefaultApplicationState } from '../../store';
import {
  IEntity,
  IFormWrapper,
  IDictionariesWrapper,
  IDictionaries,
  SortDirectionEnum,
  IKeyValue,
} from '../../definitions.interface';
import {
  IApplicationFilterFormWrapperState,
} from '../../component/filter';
import {
  IChannelWrapperEntity,
  IDefaultFormEntity,
  IQueryFilterEntity,
  IQueryFilterWrapperEntity,
  ILayoutWrapperEntity,
  IRootWrapperEntity,
  INotificationWrapperEntity,
} from '../../entities-definitions.interface';
import { universalDefaultMappers } from './universal-connector.mapper';

export const rootMapper = (state: IDefaultApplicationState): IRootWrapperEntity => ({
  root: {
    ...state.root,
  },
});

export const layoutMapper = (state: IDefaultApplicationState): ILayoutWrapperEntity => ({
  layout: {
    ...state.layout,
  },
});

export const formMapper = (formState: IDefaultFormEntity): IFormWrapper<IDefaultFormEntity> => ({
  form: {
    ...formState,
  },
});

export const filterMapper = (filterState: IQueryFilterEntity) => ({
  filter: {
    ...filterState,
  },
});

export const filterFormMapper = (formState: IDefaultFormEntity) => ({
  filterForm: {
    ...formState,
  },
});

export const notificationMapper = (state: IDefaultApplicationState): INotificationWrapperEntity => ({
  notification: {
    ...state.notification,
  },
});

export const channelMapper = (state: IDefaultApplicationState): IChannelWrapperEntity => ({
  channel: {
    ...state.channel,
  },
});

export const dictionariesMapper = (state: IDefaultApplicationState): IDictionariesWrapper<IDictionaries> => ({
  dictionaries: {
    ...state.dictionaries,
  },
});

export const filterWrapperMapper = (filterState: IQueryFilterWrapperEntity) =>
    filterMapper(filterState.filter);

export const filterFormWrapperMapper = (filterState: IApplicationFilterFormWrapperState) =>
    filterFormMapper(filterState.filterForm);

export const defaultMappers = [
  ...universalDefaultMappers,
  layoutMapper,
  rootMapper,
  notificationMapper,
  dictionariesMapper,
  channelMapper
];
