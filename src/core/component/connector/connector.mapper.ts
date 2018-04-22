import {
  IEntity,
  IFormWrapper,
  IDictionariesWrapper,
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
  ITransportWrapperEntity,
  IUserWrapperEntity,
  INotificationWrapperEntity,
  IDictionariesWrapperEntity,
  IUniversalApplicationStoreEntity,
} from '../../entities-definitions.interface';
import { universalDefaultMappers } from './universal-connector.mapper';

export const rootMapper = (state: IRootWrapperEntity): IRootWrapperEntity => ({
  root: {
    ...state.root,
  },
});

export const layoutMapper = (state: ILayoutWrapperEntity): ILayoutWrapperEntity => ({
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

export const notificationMapper = (state: INotificationWrapperEntity): INotificationWrapperEntity => ({
  notification: {
    ...state.notification,
  },
});

export const channelMapper = (state: IChannelWrapperEntity): IChannelWrapperEntity => ({
  channel: {
    ...state.channel,
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
  channelMapper
];
