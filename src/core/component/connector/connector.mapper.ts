import { orNull } from '../../util';
import { IDefaultApplicationState } from '../../store';
import {
  IEntity,
  IEntityWrapper,
  IFormWrapper,
  IUserWrapper,
  IDictionariesWrapper,
  IDictionaries,
  SortDirectionEnum,
  IKeyValue,
} from '../../definitions.interface';
import {
  IApplicationFilterFormWrapperState,
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
  IDefaultFormEntity,
  IQueryFilterEntity,
  IQueryFilterWrapperEntity,
} from '../../entities-definitions.interface';

export const rootMapper = (state: IDefaultApplicationState): IApplicationRootWrapperState => ({
  root: {
    ...state.root,
  },
});

export const layoutMapper = (state: IDefaultApplicationState): IApplicationLayoutWrapperState => ({
  layout: {
    ...state.layout,
  },
});

export const formMapper = (formState: IDefaultFormEntity): IFormWrapper<IDefaultFormEntity> => ({
  form: {
    ...formState,
  },
});

export const listMapper = (listEntity: IListEntity) => ({
  list: {
    ...listEntity,
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

export const userMapper = (state: IDefaultApplicationState): IUserWrapper<IApplicationUserState> => ({
  user: {
    ...state.user,
  },
});

export const notificationMapper = (state: IDefaultApplicationState): IApplicationNotificationWrapperState => ({
  notification: {
    ...state.notification,
  },
});

export const channelMapper = (state: IDefaultApplicationState): IChannelWrapperEntity => ({
  channel: {
    ...state.channel,
  },
});

export const transportMapper = (state: IDefaultApplicationState): IApplicationTransportWrapperState => ({
  transport: {
    ...state.transport,
  },
});

export const dictionariesMapper = (state: IDefaultApplicationState): IDictionariesWrapper<IDictionaries> => ({
  dictionaries: {
    ...state.dictionaries,
  },
});

export const listWrapperMapper = (listState: IListWrapperEntity) =>
    listMapper(listState.list);

export const filterWrapperMapper = (filterState: IQueryFilterWrapperEntity) =>
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
