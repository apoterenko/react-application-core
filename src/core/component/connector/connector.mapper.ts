import {
  IEntity,
  IFormWrapper,
  IDictionariesWrapper,
  IKeyValue,
} from '../../definitions.interface';
import {
  IChannelWrapperEntity,
  IEditableEntity,
  IQueryFilterEntity,
  IQueryFilterWrapperEntity,
  ILayoutWrapperEntity,
  IRootWrapperEntity,
  ITransportWrapperEntity,
  IUserWrapperEntity,
  INotificationWrapperEntity,
  IDictionariesWrapperEntity,
  IUniversalApplicationStoreEntity,
  SortDirectionEnum,
  IFilterFormWrapperEntity,
  IListAndFilterFormWrapperEntity,
} from '../../entities-definitions.interface';
import {
  IFilterActionConfiguration,
  FilterActionEnum,
  IFilterConfiguration,
} from '../../configurations-definitions.interface';
import {
  universalDefaultMappers,
  actionsDisabledListWrapperEntityMapper,
} from './universal-connector.mapper';

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

export const formMapper = (formState: IEditableEntity): IFormWrapper<IEditableEntity> => ({
  form: {
    ...formState,
  },
});

export const filterMapper = (filterState: IQueryFilterEntity) => ({
  filter: {
    ...filterState,
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

/**
 * @stable [29.05.2018]
 * @param {IEditableEntity} editableEntity
 * @returns {IFilterActionConfiguration}
 */
export const activeClassNameEditableEntityMapper = (editableEntity: IEditableEntity): IFilterActionConfiguration =>
  ({className: editableEntity.dirty && 'rac-filter-active'});

/**
 * @stable [29.05.2018]
 * @param {IFilterFormWrapperEntity} filterFormWrapperEntity
 * @returns {IFilterActionConfiguration}
 */
export const activeClassNameFilterFormWrapperEntityMapper =
  (filterFormWrapperEntity: IFilterFormWrapperEntity): IFilterActionConfiguration =>
    activeClassNameEditableEntityMapper(filterFormWrapperEntity.filterForm);

/**
 * @stable [29.05.2018]
 * @param {IFilterFormWrapperEntity} filterFormWrapperEntity
 * @returns {IFilterActionConfiguration}
 */
export const openFilterFilterFormWrapperEntityMapper =
  (filterFormWrapperEntity: IFilterFormWrapperEntity): IFilterActionConfiguration => ({
    type: FilterActionEnum.OPEN_FILTER,
    ...activeClassNameFilterFormWrapperEntityMapper(filterFormWrapperEntity),
  });

/**
 * @stable [29.05.2018]
 * @param {IListAndFilterFormWrapperEntity} mappedEntity
 * @returns {IFilterConfiguration}
 */
export const refreshListAndFilterFormWrapperEntityMapper =
  (mappedEntity: IListAndFilterFormWrapperEntity): IFilterConfiguration => ({
    actions: mappedEntity.filterForm
      ? [openFilterFilterFormWrapperEntityMapper(mappedEntity)]
      : [],
    notUseField: true,
    icon: 'refresh',
    ...actionsDisabledListWrapperEntityMapper(mappedEntity),
  });

export const defaultMappers = [
  ...universalDefaultMappers,
  layoutMapper,
  rootMapper,
  notificationMapper,
  channelMapper
];
