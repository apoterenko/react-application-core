import * as R from 'ramda';

import {
  EntityIdT,
  IEntity,
  IEntityIdTWrapper,
} from '../definitions.interface';
import {
  IExtendedEntity,
  MultiFieldEntityT,
} from '../definition';
import { ifNotNilThanValue } from './cond';
import { isPrimitive } from './type';
import { selectEntityId } from './select';

/**
 * @stable [19.10.2019]
 * @param {TEntity} entity
 * @returns {boolean}
 */
export const isNewEntity = <TEntity extends IEntityIdTWrapper>(entity: TEntity): boolean =>
  R.isNil(entity) || R.isNil(selectEntityId(entity));

/**
 * @stable [03.02.2020]
 * @param {IExtendedEntity<TEntity extends IEntity>} entity
 * @returns {boolean}
 */
export const isNewExtendedEntity = <TEntity extends IEntity>(entity: IExtendedEntity<TEntity>): boolean =>
  R.isNil(entity) || entity.newEntity === true;

/**
 * @stable [01.10.2019]
 * @param {IExtendedEntity<TEntity extends IEntity>} extendedEntity
 * @returns {boolean}
 */
export const doesExtendedEntityExist = <TEntity extends IEntity>(extendedEntity: IExtendedEntity<TEntity>): boolean =>
  !isNewExtendedEntity(extendedEntity);

/**
 * @stable [30.08.2019]
 * @param {TEntity} entity
 * @returns {string}
 */
export const entityAsFileName = <TEntity extends IEntity>(entity: TEntity): string => ifNotNilThanValue(
  entity,
  () => `${entity.id}${ifNotNilThanValue(entity.name, (name) => `-${name.replace(/ /g, '_')}`, '')}`,
  ''
);

/**
 * @stable [12.10.2019]
 * @param {MultiFieldEntityT | EntityIdT} value
 * @returns {boolean}
 */
export const isNotMultiEntity = (value: MultiFieldEntityT | EntityIdT): boolean =>
  Array.isArray(value) || isPrimitive(value);
