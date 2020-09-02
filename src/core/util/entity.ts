import * as R from 'ramda';

import {
  IEntity,
  IEntityIdTWrapper,
} from '../definitions.interface';
import {
  IExtendedEntity,
} from '../definition';
import { ifNotNilThanValue } from './cond';

/**
 * @stable [31.07.2020]
 * @param entity
 */
const isNewEntity = <TEntity extends IEntityIdTWrapper>(entity: TEntity): boolean =>
  R.isNil(entity) || R.isNil(entity.id);

/**
 * @stable [17.08.2020]
 * @param entity
 */
const isPhantomEntity = <TEntity extends IEntityIdTWrapper>(entity: TEntity): boolean =>
  !isNewEntity(entity) && entity.id < 0;

/**
 * @stable [01.09.2020]
 * @param entity
 */
const isNewExtendedEntity = <TEntity extends IEntity>(entity: IExtendedEntity<TEntity>): boolean =>
  R.isNil(entity) || entity.newEntity === true;

/**
 * @stable [01.09.2020]
 * @param extendedEntity
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
 * @stable [31.07.2020]
 */
export class EntityUtils {
  public static readonly doesExtendedEntityExist = doesExtendedEntityExist;
  public static readonly isNewEntity = isNewEntity;
  public static readonly isPhantomEntity = isPhantomEntity;
}
