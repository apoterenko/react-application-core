import { IEffectsAction } from 'redux-effects-promise';
import * as R from 'ramda';

import {
  EntityIdT,
  IChangesWrapper,
  IDataWrapper,
  IEntity,
  IEntityIdTWrapper,
  IEntityWrapper,
  IFormWrapper,
  IListWrapper,
  IPreventEffectsWrapper,
  ISelectedWrapper,
  ITokenWrapper,
  ITypeWrapper,
  UNDEF,
  UNDEF_SYMBOL,
} from '../definitions.interface';
import { coalesce } from './nvl';
import { IPreviousActionWrapperEntity } from '../definition';
import { ifNotNilThanValue } from './cond';

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
