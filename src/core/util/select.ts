import { IEffectsAction } from 'redux-effects-promise';
import * as R from 'ramda';

import {
  AnyT,
  EntityIdT,
  IChangesWrapper,
  IDataWrapper,
  IEntity,
  IEntityIdTWrapper,
  IEntityWrapper,
  IFormWrapper,
  IInitialDataWrapper,
  IListWrapper,
  IPayloadWrapper,
  IPreventEffectsWrapper,
  IQueueWrapper,
  IRawDataWrapper,
  ISelectedWrapper,
  ITokenWrapper,
  ITypeWrapper,
  IValidWrapper,
  UNDEF,
  UNDEF_SYMBOL,
} from '../definitions.interface';
import { coalesce } from './nvl';
import {
  IDictionariesWrapperEntity,
  IListWrapperEntity,
  IPreviousActionWrapperEntity,
  ITransportWrapperEntity,
  IUserWrapperEntity,
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
export const selectRawData = <TData = AnyT>(wrapper: IRawDataWrapper<TData>): TData =>
  R.isNil(wrapper) ? UNDEF : wrapper.rawData;

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
 * @stable [28.03.2020]
 * @param {IUserWrapperEntity<TUser>} entity
 * @returns {TUser}
 */
export const selectUser = <TUser>(entity: IUserWrapperEntity<TUser>): TUser =>
  R.isNil(entity) ? UNDEF : entity.user;

/**
 * @stable [28.03.2020]
 * @param {ITransportWrapperEntity<TTransport>} entity
 * @returns {TTransport}
 */
export const selectTransport = <TTransport>(entity: ITransportWrapperEntity<TTransport>): TTransport =>
  R.isNil(entity) ? UNDEF : entity.transport;

/**
 * @stable [28.03.2020]
 * @param {IDictionariesWrapperEntity<TDictionaries>} entity
 * @returns {TDictionaries}
 */
export const selectDictionaries = <TDictionaries>(entity: IDictionariesWrapperEntity<TDictionaries>): TDictionaries =>
  R.isNil(entity) ? UNDEF : entity.dictionaries;

/**
 * @stable [30.03.2020]
 * @param {IInitialDataWrapper<TData>} wrapper
 * @returns {TData}
 */
export const selectInitialData = <TData>(wrapper: IInitialDataWrapper<TData>): TData =>
  R.isNil(wrapper) ? UNDEF : wrapper.initialData;

/**
 * @stable [30.03.2020]
 * @param {IEffectsAction} action
 * @returns {TPayload}
 */
export const selectInitialDataPayloadFromAction = <TPayload>(action: IEffectsAction): TPayload =>
  selectPayload(selectInitialData(action));

/**
 * @stable [30.03.2020]
 * @param {IListWrapperEntity<TEntity extends IEntity>} listWrapperEntity
 * @returns {TEntity}
 */
export const selectListSelectedEntity =
  <TEntity extends IEntity>(listWrapperEntity: IListWrapperEntity<TEntity>): TEntity =>
    ifNotNilThanValue(selectList(listWrapperEntity), (list) => selectSelected(list), UNDEF_SYMBOL);
