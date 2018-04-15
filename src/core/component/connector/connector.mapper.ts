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
  IListEntity,
  IListWrapperEntity,
  IDefaultFormEntity,
  IQueryFilterEntity,
  IQueryFilterWrapperEntity,
  ITransportWrapperEntity,
  ILayoutWrapperEntity,
  IUserWrapperEntity,
  IRootWrapperEntity,
  INotificationWrapperEntity,
} from '../../entities-definitions.interface';

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

export const userMapper = (state: IDefaultApplicationState): IUserWrapperEntity => ({
  user: {
    ...state.user,
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

export const transportMapper = (state: IDefaultApplicationState): ITransportWrapperEntity => ({
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
