import { IEffectsAction } from 'redux-effects-promise';
import * as R from 'ramda';

import {
  AnyT,
  EntityIdT,
  IActiveValueWrapper,
  IChangesWrapper,
  IChannelWrapper,
  IDataWrapper,
  IDefaultChangesWrapper,
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
  INotificationWrapper,
  IOriginalEntityWrapper,
  IPayloadWrapper,
  IPreventEffectsWrapper,
  IQueryFilterWrapper,
  IQueryWrapper,
  IQueueWrapper,
  IRawDataWrapper,
  ISecondaryFilterWrapper,
  ISectionNameWrapper,
  ISelectedWrapper,
  IStackWrapper,
  ITokenWrapper,
  ITransportWrapper,
  ITypeWrapper,
  IUserWrapper,
  IValidWrapper,
  UNDEF,
  UNDEF_SYMBOL,
} from '../definitions.interface';
import {
  coalesce,
} from './nvl';
import {
  IFormEditableEntity,
  IGenericEditableEntity,
  IGenericListEntity,
  IListWrapperEntity,
  IPreviousActionWrapperEntity,
  IQueryFilterEntity,
  ISortDirectionsEntity,
  ToolbarToolsEnum,
} from '../definition';
import { ifNotNilThanValue } from './cond';
import { isDirty } from './wrapper';

/**
 * @stable [30.03.2020]
 * @param {IQueueWrapper<TValue>} wrapper
 * @returns {TValue}
 */
export const selectQueue = <TValue>(wrapper: IQueueWrapper<TValue>): TValue =>
  R.isNil(wrapper) ? UNDEF : wrapper.queue;

/**
 * @stable [30.03.2020]
 * @param {IRawDataWrapper<TData>} wrapper
 * @returns {TData}
 */
export const selectRawData = <TValue = AnyT>(wrapper: IRawDataWrapper<TValue>): TValue =>
  R.isNil(wrapper) ? UNDEF : wrapper.rawData;

/**
 * @stable [06.04.2020]
 * @param {IElementWrapper<TValue>} wrapper
 * @returns {TValue}
 */
export const selectElement = <TValue = AnyT>(wrapper: IElementWrapper<TValue>): TValue =>
  R.isNil(wrapper) ? UNDEF : wrapper.element;

/**
 * @stable [12.04.2020]
 * @param {IDefaultChangesWrapper<TValue>} wrapper
 * @returns {TValue}
 */
export const selectDefaultChanges = <TValue = IEntity>(wrapper: IDefaultChangesWrapper<TValue>): TValue =>
  R.isNil(wrapper) ? UNDEF : wrapper.defaultChanges;

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
export const selectSecondaryFilter = <TValue>(wrapper: ISecondaryFilterWrapper<TValue>): TValue =>
  R.isNil(wrapper) ? UNDEF : wrapper.secondaryFilter;

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
 * @stable [26.03.2020]
 * @param {ITypeWrapper<TValue>} wrapper
 * @returns {TValue}
 */
export const selectType = <TValue>(wrapper: ITypeWrapper<TValue>): TValue =>
  R.isNil(wrapper) ? UNDEF : wrapper.type;

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
export const selectPreventEffects = (wrapper: IPreventEffectsWrapper): boolean =>
  R.isNil(wrapper) ? UNDEF : wrapper.preventEffects;

/**
 * @stable [26.03.2020]
 * @param {IEffectsAction} wrapper
 * @returns {boolean}
 */
export const selectPreventEffectsFromAction = (wrapper: IEffectsAction): boolean =>
  R.isNil(wrapper)
    ? UNDEF
    : coalesce(selectPreventEffects(wrapper.data), selectPreventEffects(wrapper.initialData));

/**
 *
 * @param {IPreviousActionWrapperEntity} wrapper
 * @returns {IEffectsAction}
 */
export const selectPreviousAction = (wrapper: IPreviousActionWrapperEntity): IEffectsAction =>
  R.isNil(wrapper) ? UNDEF : wrapper.previousAction;

/**
 * @stable [26.03.2020]
 * @param {IEffectsAction} wrapper
 * @returns {IEffectsAction}
 */
export const selectPreviousActionFromAction = (wrapper: IEffectsAction): IEffectsAction =>
  R.isNil(wrapper)
    ? UNDEF
    : coalesce(selectPreviousAction(wrapper.data), selectPreviousAction(wrapper.initialData));

/**
 * @stable [26.03.2020]
 * @param {IEffectsAction} action
 * @returns {string}
 */
export const selectPreviousActionTypeFromAction = (action: IEffectsAction): string =>
  ifNotNilThanValue(
    selectPreviousActionFromAction(action),
    (previousAction) => selectType(previousAction),
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
  ifNotNilThanValue(
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
  ifNotNilThanValue(
    selectSelectedEntityFromAction(action),
    (entity: TEntity) => selectEntityId(entity),
    UNDEF_SYMBOL
  );

/**
 * @stable [30.03.2020]
 * @param {IUserWrapper<TUser>} wrapper
 * @returns {TUser}
 */
export const selectUser = <TUser>(wrapper: IUserWrapper<TUser>): TUser =>
  R.isNil(wrapper) ? UNDEF : wrapper.user;

/**
 * @stable [30.03.2020]
 * @param {IStackWrapper<TEntity>} wrapper
 * @returns {TEntity}
 */
export const selectStack = <TEntity>(wrapper: IStackWrapper<TEntity>): TEntity =>
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
export const selectLayout = <TEntity>(wrapper: ILayoutWrapper<TEntity>): TEntity =>
  R.isNil(wrapper) ? UNDEF : wrapper.layout;

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
 * @stable [30.03.2020]
 * @param {IDictionariesWrapper<TDictionaries>} wrapper
 * @returns {TDictionaries}
 */
export const selectDictionaries = <TDictionaries>(wrapper: IDictionariesWrapper<TDictionaries>): TDictionaries =>
  R.isNil(wrapper) ? UNDEF : wrapper.dictionaries;

/**
 * @stable [30.03.2020]
 * @param {ISectionNameWrapper} wrapper
 * @returns {string}
 */
const selectSectionName = (wrapper: ISectionNameWrapper): string => R.isNil(wrapper) ? UNDEF : wrapper.sectionName;

/**
 * @stable [30.03.2020]
 * @param {IListWrapperEntity<TEntity extends IEntity>} listWrapperEntity
 * @returns {TEntity}
 */
export const selectListSelectedEntity =
  <TEntity extends IEntity>(listWrapperEntity: IListWrapperEntity<TEntity>): TEntity =>
    ifNotNilThanValue(selectList(listWrapperEntity), (list) => selectSelected(list), UNDEF_SYMBOL);

/**
 * @stable [04.04.2020]
 * @param {IDirectionsWrapper<TValue>} wrapper
 * @returns {TValue}
 */
export const selectDirections = <TValue>(wrapper: IDirectionsWrapper<TValue>): TValue =>
  R.isNil(wrapper) ? UNDEF : wrapper.directions;

/**
 * @stable [04.04.2020]
 * @param {IGenericListEntity} entity
 * @returns {ISortDirectionsEntity}
 */
export const selectListEntityDirections = (entity: IGenericListEntity): ISortDirectionsEntity =>
  selectDirections(entity);

/**
 * @stable [09.04.2020]
 * @param {IListWrapperEntity} listWrapperEntity
 * @returns {TData}
 */
export const selectListWrapperRawDataEntity = <TData = AnyT>(listWrapperEntity: IListWrapperEntity): TData =>
  selectRawData(selectList(listWrapperEntity));

/**
 * @stable [21.04.2020]
 * @param {IListWrapperEntity<TEntity>} listWrapperEntity
 * @returns {TEntity[]}
 */
export const selectListWrapperDataEntity = <TEntity = AnyT>(listWrapperEntity: IListWrapperEntity<TEntity>): TEntity[] =>
  selectData(selectList(listWrapperEntity));

/**
 * @stable [09.04.2020]
 * @param {IFormEditableEntity<TEntity>} entity
 * @returns {TEntity}
 */
const selectFormEditableEntityChanges = <TEntity = IEntity>(entity: IFormEditableEntity<TEntity>): TEntity =>
  selectChanges(selectForm(entity));

/**
 * @stable [07.05.2020]
 * @param {IGenericEditableEntity} wrapper
 * @returns {ToolbarToolsEnum[]}
 */
const selectDirtyWrapperActiveToolbarTools = (wrapper: IDirtyWrapper): ToolbarToolsEnum[] =>
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
 * @stable [06.05.2020]
 */
export class Selectors {
  public static changes = selectChanges;
  public static dirtyWrapperActiveToolbarTools = selectDirtyWrapperActiveToolbarTools;
  public static entity = selectEntity;
  public static filter = selectFilter;
  public static form = selectForm;
  public static formEditableEntityChanges = selectFormEditableEntityChanges;
  public static list = selectList;
  public static query = selectQuery;
  public static queryFilter = selectQueryFilter;
  public static queryFilterEntityQuery = selectQueryFilterEntityQuery;
  public static secondaryFilter = selectSecondaryFilter;
  public static sectionName = selectSectionName;
}
