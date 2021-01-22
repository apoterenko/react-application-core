import * as R from 'ramda';

import {
  EntityIdT,
  IEntity,
  IEntityIdTWrapper,
} from '../definitions.interface';
import { ConditionUtils } from './cond';
import { IExtendedEntity } from '../definition';
import { JoinUtils } from './join';

/**
 * @stable [23.01.2021]
 * @param entity
 */
const isNewEntity = <TEntity extends IEntityIdTWrapper>(entity: TEntity): boolean =>
  R.isNil(entity) || R.isNil(entity.id);

/**
 * @stable [23.01.2021]
 * @param entity
 */
const isPhantomEntity = <TEntity extends IEntityIdTWrapper>(entity: TEntity): boolean =>
  !isNewEntity(entity) && entity.id < 0;

/**
 * @stable [23.01.2021]
 * @param entity
 */
const isNewExtendedEntity = <TEntity extends IEntity>(entity: IExtendedEntity<TEntity>): boolean =>
  R.isNil(entity) || entity.newEntity === true;

/**
 * @stable [23.01.2021]
 * @param extendedEntity
 */
const doesExtendedEntityExist = <TEntity extends IEntity>(extendedEntity: IExtendedEntity<TEntity>): boolean =>
  !isNewExtendedEntity(extendedEntity);

/**
 * @stable [23.01.2021]
 * @param entities
 */
const asEntitiesIds = <TEntity extends IEntity>(entities: TEntity[]): EntityIdT[] =>
  entities?.map((entity) => entity.id);

/**
 * @stable [23.01.2021]
 * @param entity
 */
const entityAsFileName = <TEntity extends IEntity>(entity: TEntity): string =>
  ConditionUtils.ifNotNilThanValue(
    entity,
    () => (
      JoinUtils.join([
        entity.id,
        ConditionUtils.ifNotNilThanValue(entity.name, (name) => `-${name.replace(/ /g, '_')}`)
      ], '')
    ),
    ''
  );

/**
 * @stable [23.01.2021]
 */
export class EntityUtils {
  public static readonly asEntitiesIds = asEntitiesIds;
  public static readonly doesExtendedEntityExist = doesExtendedEntityExist;
  public static readonly entityAsFileName = entityAsFileName;
  public static readonly isNewEntity = isNewEntity;
  public static readonly isPhantomEntity = isPhantomEntity;
}
