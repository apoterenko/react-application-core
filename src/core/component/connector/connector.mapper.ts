import * as R from 'ramda';

import { isDef } from '../../util';

import {
  IEditableEntity,
  ILayoutWrapperEntity,
  ITransportWrapperEntity,
  IUserWrapperEntity,
  INotificationWrapperEntity,
  IDictionariesWrapperEntity,
  IUniversalApplicationStoreEntity,
  IFilterFormWrapperEntity,
  IListAndFilterFormWrapperEntity,
  IListEntity,
  IStackWrapperEntity,
} from '../../entities-definitions.interface';
import {
  IChannelWrapperEntity,
  IQueryFilterEntity,
  IQueryFilterWrapperEntity,
} from '../../definition';
import {
  IFilterActionConfiguration,
  ToolbarActionEnum,
  IFilterConfiguration,
} from '../../configurations-definitions.interface';
import {
  universalDefaultMappers,
  actionsDisabledListWrapperEntityMapper,
} from './universal-connector.mapper';
import { IEntity, IKeyValue } from '../../definitions.interface';

export const layoutMapper = (state: ILayoutWrapperEntity): ILayoutWrapperEntity => ({
  layout: {
    ...state.layout,
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
  ({className: editableEntity && editableEntity.dirty && 'rac-filter-active'});

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
    type: ToolbarActionEnum.OPEN_FILTER,
    ...activeClassNameFilterFormWrapperEntityMapper(filterFormWrapperEntity),
  });

/**
 * @deprecated
 */
export const refreshListAndFilterFormWrapperEntityMapper =
  (mappedEntity: IListAndFilterFormWrapperEntity, actions?: IFilterActionConfiguration[]): IFilterConfiguration => ({
    actions: (
      isDef(mappedEntity.filterForm)
        ? [openFilterFilterFormWrapperEntityMapper(mappedEntity)]
        : []
    ).concat((actions || []).map((action) => ({disabled: R.isNil(mappedEntity.list.data) || mappedEntity.list.progress, ...action}))),
    notUseField: true,
    icon: 'refresh',
    ...actionsDisabledListWrapperEntityMapper(mappedEntity),
  });

/**
 * @stable [18.09.2018]
 * @param {IStackWrapperEntity} state
 * @returns {IStackWrapperEntity}
 */
export const stackMapper = (state: IStackWrapperEntity): IStackWrapperEntity => ({
  stack: {
    ...state.stack,
  },
});

export const defaultMappers = [
  ...universalDefaultMappers,
  stackMapper,
  layoutMapper,
  notificationMapper,
  channelMapper
];
