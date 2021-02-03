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
  IDirectionsWrapper,
  IDirtyWrapper,
  IElementWrapper,
  IEntity,
  IEntityIdTWrapper,
  IEntityWrapper,
  IErrorWrapper,
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
  IProgressWrapper,
  IQueryFilterWrapper,
  IQueryWrapper,
  IQueueWrapper,
  IRawDataWrapper,
  ISecondaryFilterWrapper,
  ISectionNameWrapper,
  ISectionWrapper,
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
  IReduxChannelEntity,
  IReduxChannelHolderEntity,
  IReduxChannelMessageEntity,
  IReduxChannelsEntity,
  IReduxFormHolderEntity,
  IReduxLayoutHolderEntity,
  IReduxListHolderEntity,
  IReduxQueryFilterHolderEntity,
  IReduxStackHolderEntity,
  IReduxStackItemEntity,
  LayoutModesEnum,
  ToolbarToolsEnum,
} from '../definition';
import { ConditionUtils } from './cond';
import { WrapperUtils } from './wrapper';

/**
 * @stable [20.01.2021]
 * @param wrapper
 */
const asPreviousAction = <TValue>(wrapper: IPreviousActionWrapper<TValue>): IPreviousActionWrapper<TValue> => wrapper?.previousAction;

/**
 * @stable [20.01.2021]
 * @param wrapper
 */
const asData = <TData>(wrapper: IDataWrapper<TData>): TData => wrapper?.data;

/**
 * @stable [20.01.2021]
 * @param wrapper
 */
const asError = <TValue = unknown>(wrapper: IErrorWrapper<TValue>): TValue => wrapper?.error;

/**
 * @stable [20.01.2021]
 * @param wrapper
 */
const asPreventEffects = (wrapper: IPreventEffectsWrapper): boolean => wrapper?.preventEffects;

/**
 * @stable [20.01.2021]
 * @param wrapper
 */
const asQueue = <TValue>(wrapper: IQueueWrapper<TValue>): TValue => wrapper?.queue;

/**
 * @stable [20.01.2021]
 * @param wrapper
 */
const asRawData = <TValue = unknown>(wrapper: IRawDataWrapper<TValue>): TValue => wrapper?.rawData;

/**
 * @stable [20.01.2021]
 * @param wrapper
 */
const asElement = <TValue = unknown>(wrapper: IElementWrapper<TValue>): TValue => wrapper?.element;

/**
 * @stable [20.01.2021]
 * @param wrapper
 */
const asEntityId = (wrapper: IEntityIdTWrapper): EntityIdT => wrapper?.id;

/**
 * @stable [20.01.2021]
 * @param wrapper
 */
const asForm = <TValue>(wrapper: IFormWrapper<TValue>): TValue => wrapper?.form;

/**
 * @stable [20.01.2021]
 * @param wrapper
 */
const asSelected = <TValue = IEntity>(wrapper: ISelectedWrapper<TValue>): TValue => wrapper?.selected;

/**
 * @stable [22.09.2020]
 * @param wrapper
 */
const selectSecondaryFilter = <TValue>(wrapper: ISecondaryFilterWrapper<TValue>): TValue =>
  R.isNil(wrapper) ? UNDEF : wrapper.secondaryFilter;

/**
 * @stable [22.09.2020]
 * @param wrapper
 */
const selectPrimaryFilter = <TValue>(wrapper: IPrimaryFilterWrapper<TValue>): TValue =>
  R.isNil(wrapper) ? UNDEF : wrapper.primaryFilter;

/**
 * @stable [22.09.2020]
 * @param wrapper
 */
const selectList = <TValue>(wrapper: IListWrapper<TValue>): TValue =>
  R.isNil(wrapper) ? UNDEF : wrapper.list;

/**
 * @stable [22.09.2020]
 * @param wrapper
 */
const selectFilter = <TValue = string>(wrapper: IFilterWrapper<TValue>): TValue =>
  R.isNil(wrapper) ? UNDEF : wrapper.filter;

/**
 * @stable [01.08.2020]
 * @param wrapper
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
 * @stable [05.03.2020]
 * @param {IEntityWrapper<TResult>} entity
 * @returns {TResult}
 */
export const selectEntity = <TResult = IEntity>(entity: IEntityWrapper<TResult>): TResult => entity?.entity;

/**
 * @stable [30.07.2020]
 * @param wrapper
 */
const selectActiveValue = <TValue>(wrapper: IActiveValueWrapper<TValue>): TValue => wrapper?.activeValue;

/**
 * @stable [01.02.2021]
 * @param action
 */
const asPayloadFromAction = <TPayload>(action: IEffectsAction<IPayloadWrapper<TPayload>>): TPayload =>
  asData<IPayloadWrapper<TPayload>>(action)?.payload;

/**
 * @stable [12.01.2021]
 * @param action
 */
const selectValidFromAction = (action: IEffectsAction): boolean =>
  asData<IValidWrapper>(action)?.valid;

/**
 * @stable [20.01.2021]
 * @param wrapper
 */
const asPreventEffectsFromAction = (wrapper: IEffectsAction): boolean =>
  R.isNil(wrapper)
    ? UNDEF
    : NvlUtils.nvl(asPreventEffects(wrapper.data), asPreventEffects(wrapper.initialData));

/**
 * @stable [20.01.2021]
 * @param wrapper
 */
const asPreviousActionFromAction = (wrapper: IEffectsAction): IEffectsAction =>
  R.isNil(wrapper)
    ? UNDEF
    : NvlUtils.nvl(asPreviousAction(wrapper.data), asPreviousAction(wrapper.initialData));

/**
 * @stable [20.01.2021]
 * @param action
 */
const asPreviousActionTypeFromAction = (action: IEffectsAction): string => asPreviousActionFromAction(action)?.type;

/**
 * @stable [08.09.2020]
 * @param action
 */
const selectSectionFromAction = (action: IEffectsAction): string =>
  NvlUtils.nvl(
    ConditionUtils.ifNotNilThanValue(
      action.data,
      (data: ISectionWrapper) => data.section,
      UNDEF_SYMBOL
    ),
    ConditionUtils.ifNotNilThanValue(
      action.initialData,
      (initialData: ISectionWrapper) => initialData.section,
      UNDEF_SYMBOL
    )
  );

/**
 * @stable [20.01.2021]
 * @param action
 */
const asSelectedEntityFromAction = <TEntity extends IEntity = IEntity>(action: IEffectsAction): TEntity => asSelected(asData(action));

/**
 * @stable [20.01.2021]
 * @param action
 */
const asSelectedEntityIdFromAction =
  <TEntity extends IEntity = IEntity>(action: IEffectsAction): EntityIdT => asEntityId(asSelectedEntityFromAction(action));

/**
 * @stable [06.11.2020]
 * @param wrapper
 */
const selectUser = <TUser>(wrapper: IUserWrapper<TUser>): TUser => wrapper?.user;

/**
 * @stable [06.11.2020]
 * @param wrapper
 */
const selectStack = <TEntity>(wrapper: IStackWrapper<TEntity>): TEntity => wrapper?.stack;

/**
 * @stable [06.11.2020]
 * @param wrapper
 */
const selectNotification = <TEntity>(wrapper: INotificationWrapper<TEntity>): TEntity => wrapper?.notification;

/**
 * @stable [06.11.2020]
 * @param wrapper
 */
const selectQuery = (wrapper: IQueryWrapper): string => wrapper?.query;

/**
 * @stable [06.11.2020]
 * @param wrapper
 */
const selectLayout = <TEntity>(wrapper: ILayoutWrapper<TEntity>): TEntity => wrapper?.layout;

/**
 * @stable [06.11.2020]
 * @param wrapper
 */
const selectMode = <TEntity>(wrapper: IModeWrapper<TEntity>): TEntity => wrapper?.mode;

/**
 * @stable [06.11.2020]
 * @param wrapper
 */
const selectChannel = <TEntity>(wrapper: IChannelWrapper<TEntity>): TEntity => wrapper?.channel;

/**
 * @stable [06.11.2020]
 * @param wrapper
 * @param ip
 */
const selectChannelEntityByIp = <TWrapper = IReduxChannelsEntity>(wrapper: TWrapper, ip: string): IReduxChannelEntity =>
  R.isNil(wrapper) ? UNDEF : wrapper[ip];

/**
 * @stable [06.11.2020]
 * @param wrapper
 */
const selectChannelMessages = (wrapper: IReduxChannelEntity): IReduxChannelMessageEntity[] => wrapper?.messages;

/**
 * @stable [06.11.2020]
 * @param wrapper
 * @param ip
 */
const selectChannelEntity =
  <TEntity = IReduxChannelsEntity>(wrapper: IReduxChannelHolderEntity<TEntity>, ip: string): IReduxChannelEntity =>
    selectChannelEntityByIp(selectChannel<TEntity>(wrapper), ip);

/**
 * @stable [06.11.2020]
 * @param wrapper
 * @param ip
 */
const selectChannelMessagesByIp =
  <TMessage = AnyT, TEntity = IReduxChannelsEntity>(wrapper: IReduxChannelHolderEntity<TEntity>,
                                                    ip: string): IReduxChannelMessageEntity<TMessage>[] =>
    selectChannelMessages(selectChannelEntity(wrapper, ip));

/**
 * @stable [30.03.2020]
 * @param {ITransportWrapper<TTransport>} wrapper
 * @returns {TTransport}
 */
const selectTransport = <TTransport>(wrapper: ITransportWrapper<TTransport>): TTransport =>
  R.isNil(wrapper) ? UNDEF : wrapper.transport;

/**
 * @stable [09.06.2020]
 * @param {IDictionariesWrapper<TValue>} wrapper
 * @returns {TValue}
 */
const selectDictionaries = <TValue>(wrapper: IDictionariesWrapper<TValue>): TValue =>
  R.isNil(wrapper) ? UNDEF : wrapper.dictionaries;

/**
 * @stable [10.08.2020]
 * @param wrapper
 */
const selectSectionName = (wrapper: ISectionNameWrapper): string => R.isNil(wrapper) ? UNDEF : wrapper.sectionName;

/**
 * @stable [10.08.2020]
 * @param wrapper
 */
const selectProgress = (wrapper: IProgressWrapper): boolean => R.isNil(wrapper) ? UNDEF : wrapper.progress;

/**
 * @stable [17.05.2020]
 * @param {ITabPanelWrapper<TTabPanel>} entity
 * @returns {TTabPanel}
 */
const selectTabPanel = <TTabPanel>(entity: ITabPanelWrapper<TTabPanel>): TTabPanel =>
  R.isNil(entity) ? UNDEF : entity.tabPanel;

/**
 * @stable [08.05.2020]
 * @param {IReduxListHolderEntity<TEntity extends IEntity>} entity
 * @returns {TEntity}
 */
const selectListSelectedEntity = <TEntity extends IEntity>(entity: IReduxListHolderEntity<TEntity>): TEntity =>
  asSelected(selectList(entity));

/**
 * @stable [08.05.2020]
 * @param {IDirectionsWrapper<TValue>} wrapper
 * @returns {TValue}
 */
const selectDirections = <TValue>(wrapper: IDirectionsWrapper<TValue>): TValue =>
  R.isNil(wrapper) ? UNDEF : wrapper.directions;

/**
 * @stable [08.05.2020]
 * @param {IReduxListHolderEntity} entity
 * @returns {TRawData}
 */
const selectListRawData = <TRawData = AnyT>(entity: IReduxListHolderEntity): TRawData => asRawData(selectList(entity));

/**
 * @stable [01.08.2020]
 * @param entity
 */
const selectFormHolderEntityChanges = <TEntity = IEntity>(entity: IReduxFormHolderEntity<TEntity>): TEntity =>
  selectChanges(asForm(entity));

/**
 * @stable [01.08.2020]
 * @param wrapper
 */
const selectActiveToolbarToolsFromDirtyWrapper = (wrapper: IDirtyWrapper): ToolbarToolsEnum[] =>
  R.isNil(wrapper)
    ? UNDEF
    : (
      ConditionUtils.orUndef(
        WrapperUtils.isDirty(wrapper),
        () => [ToolbarToolsEnum.FILTER]
      )
    );

/**
 * @stable [07.05.2020]
 * @param {IReduxQueryFilterHolderEntity} entity
 * @returns {string}
 */
const selectQueryFilterEntityQuery = (entity: IReduxQueryFilterHolderEntity): string =>
  selectQuery(selectQueryFilter(entity));

/**
 * @stable [18.09.2020]
 * @param entity
 */
const selectStackItemEntities = (entity: IReduxStackHolderEntity): IReduxStackItemEntity[] => selectStack(selectStack(entity));

/**
 * @stable [18.09.2020]
 * @param entity
 */
const selectFirstStackItemEntity = (entity: IReduxStackHolderEntity): IReduxStackItemEntity =>
  ConditionUtils.ifNotEmptyThanValue(
    selectStackItemEntities(entity),
    (stackItemEntities) => stackItemEntities[0]
  );

/**
 * @stable [21.05.2020]
 * @param {IReduxLayoutHolderEntity} entity
 * @returns {LayoutModesEnum}
 */
const selectLayoutMode = (entity: IReduxLayoutHolderEntity): LayoutModesEnum => selectMode(selectLayout(entity));

/**
 * @stable [21.05.2020]
 * @param {IReduxLayoutHolderEntity} merged
 * @param {IReduxLayoutHolderEntity} original
 * @returns {LayoutModesEnum}
 */
const selectMergedLayoutMode = (merged: IReduxLayoutHolderEntity,
                                original: IReduxLayoutHolderEntity): LayoutModesEnum =>
  NvlUtils.nvl(
    selectLayoutMode(merged),
    selectLayoutMode(original)
  );

/**
 * @stable [06.05.2020]
 */
export class Selectors {
  public static readonly activeToolbarToolsFromDirtyWrapper = selectActiveToolbarToolsFromDirtyWrapper;         /* @stable [08.05.2020] */
  public static readonly activeValue = selectActiveValue;                                                       /* @stable [30.07.2020] */
  public static readonly changes = selectChanges;
  public static readonly channel = selectChannel;                                                               /* @stable [12.06.2020] */
  public static readonly channelEntity = selectChannelEntity;                                                   /* @stable [06.11.2020] */
  public static readonly channelMessagesByIp = selectChannelMessagesByIp;                                       /* @stable [06.11.2020] */
  public static readonly data = asData;
  public static readonly dictionaries = selectDictionaries;                                                     /* @stable [09.06.2020] */
  public static readonly directions = selectDirections;                                                         /* @stable [08.05.2020] */
  public static readonly element = asElement;
  public static readonly entity = selectEntity;
  public static readonly entityId = asEntityId;
  public static readonly error = asError;
  public static readonly filter = selectFilter;
  public static readonly firstStackItemEntity = selectFirstStackItemEntity;                                     /* @stable [18.09.2020] */
  public static readonly form = asForm;
  public static readonly formHolderEntityChanges = selectFormHolderEntityChanges;                               /* @stable [01.08.2020] */
  public static readonly layout = selectLayout;                                                                 /* @stable [08.05.2020] */
  public static readonly layoutMode = selectLayoutMode;                                                         /* @stable [21.05.2020] */
  public static readonly list = selectList;
  public static readonly listRawData = selectListRawData;                                                       /* @stable [08.05.2020] */
  public static readonly listSelectedEntity = selectListSelectedEntity;                                         /* @stable [08.05.2020] */
  public static readonly mergedLayoutMode = selectMergedLayoutMode;                                             /* @stable [21.05.2020] */
  public static readonly notification = selectNotification;                                                     /* @stable [12.06.2020] */
  public static readonly payloadFromAction = asPayloadFromAction;
  public static readonly preventEffectsFromAction = asPreventEffectsFromAction;
  public static readonly previousActionFromAction = asPreviousActionFromAction;
  public static readonly previousActionTypeFromAction = asPreviousActionTypeFromAction;
  public static readonly primaryFilter = selectPrimaryFilter;                                                   /* @stable [10.05.2020] */
  public static readonly progress = selectProgress;                                                             /* @stable [10.08.2020] */
  public static readonly query = selectQuery;
  public static readonly queryFilter = selectQueryFilter;
  public static readonly queryFilterEntityQuery = selectQueryFilterEntityQuery;
  public static readonly queue = asQueue;
  public static readonly rawData = asRawData;
  public static readonly secondaryFilter = selectSecondaryFilter;                                               /* @stable [09.05.2020] */
  public static readonly sectionFromAction = selectSectionFromAction;                                           /* @stable [08.09.2020] */
  public static readonly sectionName = selectSectionName;
  public static readonly selected = asSelected;
  public static readonly selectedEntityFromAction = asSelectedEntityFromAction;
  public static readonly selectedEntityIdFromAction = asSelectedEntityIdFromAction;
  public static readonly stack = selectStack;                                                                   /* @stable [21.05.2020] */
  public static readonly stackItemEntities = selectStackItemEntities;                                           /* @stable [21.05.2020] */
  public static readonly tabPanel = selectTabPanel;                                                             /* @stable [17.05.2020] */
  public static readonly transport = selectTransport;                                                           /* @stable [12.06.2020] */
  public static readonly user = selectUser;                                                                     /* @stable [09.06.2020] */
  public static readonly validFromAction = selectValidFromAction;                                               /* @stable [12.01.2021] */
}
