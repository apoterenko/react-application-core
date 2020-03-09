import * as R from 'ramda';

import {
  IChangesWrapper,
  IDataWrapper,
  IEntity,
  IEntityWrapper,
  IFormWrapper,
  ITokenWrapper,
  UNDEF,
} from '../definitions.interface';

/**
 * @stable [29.02.2020]
 * @param {IFormWrapper<TValue>} wrapper
 * @returns {TValue}
 */
export const selectForm = <TValue>(wrapper: IFormWrapper<TValue>): TValue =>
  R.isNil(wrapper) ? UNDEF : wrapper.form;

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
