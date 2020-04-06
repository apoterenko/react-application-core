import { IEffectsAction } from 'redux-effects-promise';
import * as R from 'ramda';

import {
  AnyT,
  EntityIdT,
  IChangesWrapper,
  IDataWrapper,
  IDictionariesWrapper,
  IDirectionsWrapper,
  IElementWrapper,
  IEntity,
  IEntityIdTWrapper,
  IEntityWrapper,
  IFormWrapper,
  IListWrapper,
  IPayloadWrapper,
  IPreventEffectsWrapper,
  IQueueWrapper,
  IRawDataWrapper,
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
import { coalesce } from './nvl';
import {
  IGenericListEntity,
  IListWrapperEntity,
  IPreviousActionWrapperEntity,
  ISortDirectionsEntity,
} from '../definition';
import { ifNotNilThanValue } from './cond';

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
 * @stable [27.03.2020]
 * @param {IListWrapper<TValue>} wrapper
 * @returns {TValue}
 */
export const selectList = <TValue>(wrapper: IListWrapper<TValue>): TValue => R.isNil(wrapper) ? UNDEF : wrapper.list;

/**
 * @stable [26.03.2020]
 * @param {ITypeWrapper<TValue>} wrapper
 * @returns {TValue}
 */
export const selectType = <TValue>(wrapper: ITypeWrapper<TValue>): TValue => R.isNil(wrapper) ? UNDEF : wrapper.type;

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
export const selectSectionName = (wrapper: ISectionNameWrapper): string =>
  R.isNil(wrapper) ? UNDEF : wrapper.sectionName;

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
