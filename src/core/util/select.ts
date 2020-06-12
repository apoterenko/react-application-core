import { IEffectsAction } from 'redux-effects-promise';
import * as R from 'ramda';

import {
  AnyT,
  EntityIdT,
  IActiveValueWrapper,
  IChangesWrapper,
  IChannelWrapper,
  IDataWrapper,
  IDictionariesWrapper,
  IDiffWrapper,
  IDirectionsWrapper,
  IDirtyWrapper,
  IElementWrapper,
  IEntity,
  IEntityIdTWrapper,
  IEntityWrapper,
  IFilterWrapper,
  IFormWrapper,
  ILayoutWrapper,
  IListWrapper,
  IModeWrapper,
  INotificationWrapper,
  IPayloadWrapper,
  IPreventEffectsWrapper,
  IPreviousActionWrapper,
  IPrimaryFilterWrapper,
  IQueryFilterWrapper,
  IQueryWrapper,
  IQueueWrapper,
  IRawDataWrapper,
  ISecondaryFilterWrapper,
  ISectionNameWrapper,
  ISelectedWrapper,
  IStackWrapper,
  ITabPanelWrapper,
  ITokenWrapper,
  ITransportWrapper,
  IUserWrapper,
  IValidWrapper,
  UNDEF,
  UNDEF_SYMBOL,
} from '../definitions.interface';
import { NvlUtils } from './nvl';
import {
  IReduxHolderFormEntity,
  IReduxHolderListEntity,
  IQueryFilterEntity,
  IReduxHolderLayoutEntity,
  IReduxHolderStackEntity,
  IReduxStackItemEntity,
  LayoutModesEnum,
  ToolbarToolsEnum,
} from '../definition';
import { ConditionUtils } from './cond';
import {
  inProgress,
  isDirty,
} from './wrapper';

/**
 * @stable [30.03.2020]
 * @param {IQueueWrapper<TValue>} wrapper
 * @returns {TValue}
 */
const selectQueue = <TValue>(wrapper: IQueueWrapper<TValue>): TValue =>
  R.isNil(wrapper) ? UNDEF : wrapper.queue;

/**
 * @stable [30.03.2020]
 * @param {IRawDataWrapper<TData>} wrapper
 * @returns {TData}
 */
const selectRawData = <TValue = AnyT>(wrapper: IRawDataWrapper<TValue>): TValue =>
  R.isNil(wrapper) ? UNDEF : wrapper.rawData;

/**
 * @stable [06.04.2020]
 * @param {IElementWrapper<TValue>} wrapper
 * @returns {TValue}
 */
const selectElement = <TValue = AnyT>(wrapper: IElementWrapper<TValue>): TValue =>
  R.isNil(wrapper) ? UNDEF : wrapper.element;

/**
 * @stable [27.03.2020]
 * @param {IEntityIdTWrapper} entity
 * @returns {EntityIdT}
 */
export const selectEntityId = (entity: IEntityIdTWrapper): EntityIdT => R.isNil(entity) ? UNDEF : entity.id;

/**
 * @stable [29.02.2020]
 * @param {IFormWrapper<TValue>} wrapper
 * @returns {TValue}
 */
export const selectForm = <TValue>(wrapper: IFormWrapper<TValue>): TValue => R.isNil(wrapper) ? UNDEF : wrapper.form;

/**
 * @stable [08.05.2020]
 * @param {ISecondaryFilterWrapper<TValue>} wrapper
 * @returns {TValue}
 */
const selectSecondaryFilter = <TValue>(wrapper: ISecondaryFilterWrapper<TValue>): TValue =>
  R.isNil(wrapper) ? UNDEF : wrapper.secondaryFilter;

/**
 * @stable [10.05.2020]
 * @param {IPrimaryFilterWrapper<TValue>} wrapper
 * @returns {TValue}
 */
const selectPrimaryFilter = <TValue>(wrapper: IPrimaryFilterWrapper<TValue>): TValue =>
  R.isNil(wrapper) ? UNDEF : wrapper.primaryFilter;

/**
 * @stable [27.03.2020]
 * @param {IListWrapper<TValue>} wrapper
 * @returns {TValue}
 */
const selectList = <TValue>(wrapper: IListWrapper<TValue>): TValue =>
  R.isNil(wrapper) ? UNDEF : wrapper.list;

/**
 * @stable [09.04.2020]
 * @param {IFilterWrapper<TValue>} wrapper
 * @returns {TValue}
 */
const selectFilter = <TValue = string>(wrapper: IFilterWrapper<TValue>): TValue =>
  R.isNil(wrapper) ? UNDEF : wrapper.filter;

/**
 * @stable [07.05.2020]
 * @param {IQueryFilterWrapper<TValue>} wrapper
 * @returns {TValue}
 */
const selectQueryFilter = <TValue = string>(wrapper: IQueryFilterWrapper<TValue>): TValue =>
  R.isNil(wrapper) ? UNDEF : wrapper.queryFilter;

/**
 * @stable [29.02.2020]
 * @param {ITokenWrapper<TValue>} wrapper
 * @returns {TValue}
 */
export const selectToken = <TValue = string>(wrapper: ITokenWrapper<TValue>): TValue =>
  R.isNil(wrapper) ? UNDEF : wrapper.token;

/**
 * @stable [05.03.2020]
 * @param {IChangesWrapper<TResult>} entity
 * @returns {TResult}
 */
export const selectChanges = <TResult = IEntity>(entity: IChangesWrapper<TResult>): TResult =>
  R.isNil(entity) ? UNDEF : entity.changes;

/**
 * @stable [13.04.2020]
 * @param {IDiffWrapper<TResult>} entity
 * @returns {TResult}
 */
export const selectDiff = <TResult = IEntity>(entity: IDiffWrapper<TResult>): TResult =>
  R.isNil(entity) ? UNDEF : entity.diff;

/**
 * @stable [05.03.2020]
 * @param {IEntityWrapper<TResult>} entity
 * @returns {TResult}
 */
export const selectEntity = <TResult = IEntity>(entity: IEntityWrapper<TResult>): TResult =>
  R.isNil(entity) ? UNDEF : entity.entity;

/**
 * @stable [05.03.2020]
 * @param {IDataWrapper<TData>} wrapper
 * @returns {TData}
 */
export const selectData = <TData>(wrapper: IDataWrapper<TData>): TData =>
  R.isNil(wrapper) ? UNDEF : wrapper.data;

/**
 * @stable [12.04.2020]
 * @param {IActiveValueWrapper<TValue>} wrapper
 * @returns {TValue}
 */
export const selectActiveValue = <TValue>(wrapper: IActiveValueWrapper<TValue>): TValue =>
  R.isNil(wrapper) ? UNDEF : wrapper.activeValue;

/**
 * @stable [30.03.2020]
 * @param {IPayloadWrapper<TPayload>} wrapper
 * @returns {TPayload}
 */
export const selectPayload = <TPayload>(wrapper: IPayloadWrapper<TPayload>): TPayload =>
  R.isNil(wrapper) ? UNDEF : wrapper.payload;

/**
 * @stable [30.03.2020]
 * @param {IEffectsAction} action
 * @returns {TPayload}
 */
export const selectDataPayloadFromAction = <TPayload>(action: IEffectsAction): TPayload =>
  selectPayload(selectData(action));

/**
 * @stable [27.03.2020]
 * @param {IValidWrapper} wrapper
 * @returns {boolean}
 */
export const selectValid = (wrapper: IValidWrapper): boolean =>
  R.isNil(wrapper) ? UNDEF : wrapper.valid;

/**
 * @stable [27.03.2020]
 * @param {IEffectsAction} wrapper
 * @returns {boolean}
 */
export const selectValidFromAction = (wrapper: IEffectsAction): boolean =>
  R.isNil(wrapper) ? UNDEF : selectValid(wrapper.data);

/**
 * @stable [26.03.2020]
 * @param {IPreventEffectsWrapper} wrapper
 * @returns {boolean}
 */
const selectPreventEffects = (wrapper: IPreventEffectsWrapper): boolean =>
  R.isNil(wrapper) ? UNDEF : wrapper.preventEffects;

/**
 * @stable [26.03.2020]
 * @param {IEffectsAction} wrapper
 * @returns {boolean}
 */
const selectPreventEffectsFromAction = (wrapper: IEffectsAction): boolean =>
  R.isNil(wrapper)
    ? UNDEF
    : NvlUtils.coalesce(selectPreventEffects(wrapper.data), selectPreventEffects(wrapper.initialData));

/**
 * @stable [08.06.2020]
 * @param {IPreviousActionWrapper<TValue>} wrapper
 * @returns {IPreviousActionWrapper<TValue>}
 */
const selectPreviousAction = <TValue>(wrapper: IPreviousActionWrapper<TValue>): IPreviousActionWrapper<TValue> =>
  R.isNil(wrapper) ? UNDEF : wrapper.previousAction;

/**
 * @stable [08.05.2020]
 * @param {IReduxHolderListEntity} entity
 * @returns {boolean}
 */
const selectListProgress = (entity: IReduxHolderListEntity): boolean => inProgress(selectList(entity));

/**
 * @stable [26.03.2020]
 * @param {IEffectsAction} wrapper
 * @returns {IEffectsAction}
 */
const selectPreviousActionFromAction = (wrapper: IEffectsAction): IEffectsAction =>
  R.isNil(wrapper)
    ? UNDEF
    : NvlUtils.coalesce(selectPreviousAction(wrapper.data), selectPreviousAction(wrapper.initialData));

/**
 * @stable [26.03.2020]
 * @param {IEffectsAction} action
 * @returns {string}
 */
const selectPreviousActionTypeFromAction = (action: IEffectsAction): string =>
  ConditionUtils.ifNotNilThanValue(
    selectPreviousActionFromAction(action),
    (previousAction) => previousAction.type,
    UNDEF_SYMBOL
  );

/**
 * @stable [27.03.2020]
 * @param {ISelectedWrapper<TEntity extends IEntity>} entity
 * @returns {TEntity}
 */
export const selectSelected = <TEntity extends IEntity>(entity: ISelectedWrapper<TEntity>): TEntity =>
  R.isNil(entity) ? UNDEF : entity.selected;

/**
 * @stable [27.03.2020]
 * @param {IEffectsAction} action
 * @returns {TEntity}
 */
export const selectSelectedEntityFromAction = <TEntity extends IEntity = IEntity>(action: IEffectsAction): TEntity =>
  ConditionUtils.ifNotNilThanValue(
    selectData(action),
    (data) => selectSelected(data),
    UNDEF_SYMBOL
  );

/**
 * @stable [27.03.2020]
 * @param {IEffectsAction} action
 * @returns {EntityIdT}
 */
export const selectSelectedEntityIdFromAction = <TEntity extends IEntity = IEntity>(action: IEffectsAction): EntityIdT =>
  ConditionUtils.ifNotNilThanValue(
    selectSelectedEntityFromAction(action),
    (entity: TEntity) => selectEntityId(entity),
    UNDEF_SYMBOL
  );

/**
 * @stable [30.03.2020]
 * @param {IUserWrapper<TUser>} wrapper
 * @returns {TUser}
 */
const selectUser = <TUser>(wrapper: IUserWrapper<TUser>): TUser =>
  R.isNil(wrapper) ? UNDEF : wrapper.user;

/**
 * @stable [30.03.2020]
 * @param {IStackWrapper<TEntity>} wrapper
 * @returns {TEntity}
 */
const selectStack = <TEntity>(wrapper: IStackWrapper<TEntity>): TEntity =>
  R.isNil(wrapper) ? UNDEF : wrapper.stack;

/**
 * @stable [14.04.2020]
 * @param {INotificationWrapper<TEntity>} wrapper
 * @returns {TEntity}
 */
export const selectNotification = <TEntity>(wrapper: INotificationWrapper<TEntity>): TEntity =>
  R.isNil(wrapper) ? UNDEF : wrapper.notification;

/**
 * @stable [24.04.2020]
 * @param {IQueryWrapper} wrapper
 * @returns {string}
 */
const selectQuery = (wrapper: IQueryWrapper): string => R.isNil(wrapper) ? UNDEF : wrapper.query;

/**
 * @stable [14.04.2020]
 * @param {ILayoutWrapper<TEntity>} wrapper
 * @returns {TEntity}
 */
const selectLayout = <TEntity>(wrapper: ILayoutWrapper<TEntity>): TEntity =>
  R.isNil(wrapper) ? UNDEF : wrapper.layout;

/**
 * @stable [21.05.2020]
 * @param {IModeWrapper<TEntity>} wrapper
 * @returns {TEntity}
 */
const selectMode = <TEntity>(wrapper: IModeWrapper<TEntity>): TEntity =>
  R.isNil(wrapper) ? UNDEF : wrapper.mode;

/**
 * @stable [14.04.2020]
 * @param {IChannelWrapper<TEntity>} wrapper
 * @returns {TEntity}
 */
export const selectChannel = <TEntity>(wrapper: IChannelWrapper<TEntity>): TEntity =>
  R.isNil(wrapper) ? UNDEF : wrapper.channel;

/**
 * @stable [30.03.2020]
 * @param {ITransportWrapper<TTransport>} wrapper
 * @returns {TTransport}
 */
export const selectTransport = <TTransport>(wrapper: ITransportWrapper<TTransport>): TTransport =>
  R.isNil(wrapper) ? UNDEF : wrapper.transport;

/**
 * @stable [09.06.2020]
 * @param {IDictionariesWrapper<TValue>} wrapper
 * @returns {TValue}
 */
const selectDictionaries = <TValue>(wrapper: IDictionariesWrapper<TValue>): TValue =>
  R.isNil(wrapper) ? UNDEF : wrapper.dictionaries;

/**
 * @stable [30.03.2020]
 * @param {ISectionNameWrapper} wrapper
 * @returns {string}
 */
const selectSectionName = (wrapper: ISectionNameWrapper): string => R.isNil(wrapper) ? UNDEF : wrapper.sectionName;

/**
 * @stable [17.05.2020]
 * @param {ITabPanelWrapper<TTabPanel>} entity
 * @returns {TTabPanel}
 */
const selectTabPanel = <TTabPanel>(entity: ITabPanelWrapper<TTabPanel>): TTabPanel =>
  R.isNil(entity) ? UNDEF : entity.tabPanel;

/**
 * @stable [08.05.2020]
 * @param {IReduxHolderListEntity<TEntity extends IEntity>} entity
 * @returns {TEntity}
 */
const selectListSelectedEntity = <TEntity extends IEntity>(entity: IReduxHolderListEntity<TEntity>): TEntity =>
  selectSelected(selectList(entity));

/**
 * @stable [08.05.2020]
 * @param {IDirectionsWrapper<TValue>} wrapper
 * @returns {TValue}
 */
const selectDirections = <TValue>(wrapper: IDirectionsWrapper<TValue>): TValue =>
  R.isNil(wrapper) ? UNDEF : wrapper.directions;

/**
 * @stable [08.05.2020]
 * @param {IReduxHolderListEntity} entity
 * @returns {TRawData}
 */
const selectListRawData = <TRawData = AnyT>(entity: IReduxHolderListEntity): TRawData => selectRawData(selectList(entity));

/**
 * @stable [08.05.2020]
 * @param {IReduxHolderFormEntity<TEntity>} entity
 * @returns {TEntity}
 */
const selectFormEntityChanges = <TEntity = IEntity>(entity: IReduxHolderFormEntity<TEntity>): TEntity =>
  selectChanges(selectForm(entity));

/**
 * @stable [08.05.2020]
 * @param {IDirtyWrapper} wrapper
 * @returns {ToolbarToolsEnum[]}
 */
const selectActiveToolbarToolsFromDirtyWrapper = (wrapper: IDirtyWrapper): ToolbarToolsEnum[] =>
  isDirty(wrapper)
    ? [ToolbarToolsEnum.FILTER]
    : [];

/**
 * @stable [07.05.2020]
 * @param {IQueryFilterEntity} entity
 * @returns {string}
 */
const selectQueryFilterEntityQuery = (entity: IQueryFilterEntity): string =>
  selectQuery(selectQueryFilter(entity));

/**
 * @stable [21.05.2020]
 * @param {IReduxHolderStackEntity} entity
 * @returns {IReduxStackItemEntity[]}
 */
const selectStackItemEntities = (entity: IReduxHolderStackEntity): IReduxStackItemEntity[] => selectStack(selectStack(entity));

/**
 * @stable [21.05.2020]
 * @param {IReduxHolderLayoutEntity} entity
 * @returns {LayoutModesEnum}
 */
const selectLayoutMode = (entity: IReduxHolderLayoutEntity): LayoutModesEnum => selectMode(selectLayout(entity));

/**
 * @stable [21.05.2020]
 * @param {IReduxHolderLayoutEntity} merged
 * @param {IReduxHolderLayoutEntity} original
 * @returns {LayoutModesEnum}
 */
const selectMergedLayoutMode = (merged: IReduxHolderLayoutEntity,
                                original: IReduxHolderLayoutEntity): LayoutModesEnum =>
  NvlUtils.nvl(
    selectLayoutMode(merged),
    selectLayoutMode(original)
  );

/**
 * @stable [06.05.2020]
 */
export class Selectors {
  public static readonly activeToolbarToolsFromDirtyWrapper = selectActiveToolbarToolsFromDirtyWrapper;         /* @stable [08.05.2020] */
  public static readonly changes = selectChanges;
  public static readonly data = selectData;                                                                     /* @stable [19.05.2020] */
  public static readonly dataPayloadFromAction = selectDataPayloadFromAction;                                   /* @stable [08.06.2020] */
  public static readonly dictionaries = selectDictionaries;                                                     /* @stable [09.06.2020] */
  public static readonly directions = selectDirections;                                                         /* @stable [08.05.2020] */
  public static readonly element = selectElement;                                                               /* @stable [08.06.2020] */
  public static readonly entity = selectEntity;
  public static readonly filter = selectFilter;
  public static readonly form = selectForm;                                                                     /* @stable [11.05.2020] */
  public static readonly formEntityChanges = selectFormEntityChanges;                                           /* @stable [11.05.2020] */
  public static readonly layout = selectLayout;                                                                 /* @stable [08.05.2020] */
  public static readonly layoutMode = selectLayoutMode;                                                         /* @stable [21.05.2020] */
  public static readonly list = selectList;
  public static readonly listProgress = selectListProgress;                                                     /* @stable [08.05.2020] */
  public static readonly listRawData = selectListRawData;                                                       /* @stable [08.05.2020] */
  public static readonly listSelectedEntity = selectListSelectedEntity;                                         /* @stable [08.05.2020] */
  public static readonly mergedLayoutMode = selectMergedLayoutMode;                                             /* @stable [21.05.2020] */
  public static readonly preventEffectsFromAction = selectPreventEffectsFromAction;                             /* @stable [08.06.2020] */
  public static readonly previousActionFromAction = selectPreviousActionFromAction;                             /* @stable [08.05.2020] */
  public static readonly previousActionTypeFromAction = selectPreviousActionTypeFromAction;                     /* @stable [08.05.2020] */
  public static readonly primaryFilter = selectPrimaryFilter;                                                   /* @stable [10.05.2020] */
  public static readonly query = selectQuery;
  public static readonly queryFilter = selectQueryFilter;
  public static readonly queryFilterEntityQuery = selectQueryFilterEntityQuery;
  public static readonly queue = selectQueue;                                                                   /* @stable [09.06.2020] */
  public static readonly rawData = selectRawData;                                                               /* @stable [09.06.2020] */
  public static readonly secondaryFilter = selectSecondaryFilter;                                               /* @stable [09.05.2020] */
  public static readonly sectionName = selectSectionName;
  public static readonly stack = selectStack;                                                                   /* @stable [21.05.2020] */
  public static readonly stackItemEntities = selectStackItemEntities;                                           /* @stable [21.05.2020] */
  public static readonly tabPanel = selectTabPanel;                                                             /* @stable [17.05.2020] */
  public static readonly user = selectUser;                                                                     /* @stable [09.06.2020] */
}
