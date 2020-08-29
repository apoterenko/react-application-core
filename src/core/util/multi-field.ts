import * as R from 'ramda';

import {
  IMultiItemEntity,
  IReduxMultiEntity,
  MultiFieldValueOrEntityIdT,
  MultiFieldValueT,
  NotMultiFieldValueT,
} from '../definition';
import {
  TypeUtils,
} from './type';
import { IEntity } from '../definitions.interface';

/**
 * @stable [29.08.2020]
 * @param value
 */
const isNotMultiEntity = (value: MultiFieldValueOrEntityIdT): boolean =>
  Array.isArray(value) || TypeUtils.isPrimitive(value);

/**
 * @stable [29.08.2020]
 * @param value
 */
const notMultiFieldValueAsEntities =
  <TEntity extends IEntity = IEntity>(value: NotMultiFieldValueT<TEntity>): TEntity[] =>
    TypeUtils.isPrimitive(value)
      ? [{id: value} as TEntity]
      : value as TEntity[];

/**
 * @stable [29.08.2020]
 * @param value
 * @param converter
 * @param defaultValue
 */
const multiFieldValueAsEntities = (value: MultiFieldValueT,
                                   converter: (value: IReduxMultiEntity) => IMultiItemEntity[],
                                   defaultValue: IEntity[]): IMultiItemEntity[] | IEntity[] =>
  isNotMultiEntity(value)
    ? (
      TypeUtils.isDef(defaultValue)
        ? defaultValue
        : notMultiFieldValueAsEntities(value as NotMultiFieldValueT)
    )
    : (R.isNil(value) ? [] : converter(value as IReduxMultiEntity));

/**
 * @stable [29.08.2020]
 * @param value
 * @param defaultValue
 */
const multiFieldValueAsEditEntities = (value: MultiFieldValueT,
                                       defaultValue: IMultiItemEntity[] = []): IMultiItemEntity[] =>
  MultiFieldUtils.multiFieldValueAsEntities(value, (currentValue) => currentValue.edit, defaultValue);

/**
 * @stable [29.08.2020]
 */
export class MultiFieldUtils {
  public static readonly isNotMultiEntity = isNotMultiEntity;
  public static readonly multiFieldValueAsEditEntities = multiFieldValueAsEditEntities;
  public static readonly multiFieldValueAsEntities = multiFieldValueAsEntities;
  public static readonly notMultiFieldValueAsEntities = notMultiFieldValueAsEntities;
}
