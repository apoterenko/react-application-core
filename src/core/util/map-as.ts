import * as R from 'ramda';

import { FilterUtils } from './filter';
import {
  IApiEntity,
  IExtendedEntity,
  IReduxFormEntity,
} from '../definition';
import {
  IEntity,
} from '../definitions.interface';
import { ConditionUtils } from './cond';
import { EntityUtils } from './entity';
import { MapAsOriginalUtils } from './map-as-original';
import { NvlUtils } from './nvl';
import { Selectors } from './select';

/**
 * @map-as
 *
 * @stable [31.07.2020]
 * @param extendedEntity
 */
const mapExtendedEntityAsApiEntity =
  <TEntity = IEntity>(extendedEntity: IExtendedEntity<TEntity>): IApiEntity<TEntity> => {
    const {
      changes,
      entity,
      originalEntity,
    } = extendedEntity;

    const entityId = Selectors.entityId(entity);
    const newEntity = R.isNil(entityId);

    return FilterUtils.defValuesFilter<IApiEntity<TEntity>, IApiEntity<TEntity>>({
      changes,
      diff: newEntity ? entity : changes,
      entity,
      entityId,
      newEntity,
      originalEntity,
    });
  };

/**
 * @map-as
 *
 * @stable [31.07.2020]
 * @param formEntity
 * @param entity
 */
const mapEntityAsExtendedEntity =
  <TEntity extends IEntity = IEntity>(formEntity: IReduxFormEntity<TEntity>,
                                      entity?: TEntity): IExtendedEntity<TEntity> => {
    const newEntity = EntityUtils.isNewEntity(entity);
    const {
      changes,
      defaultChanges,
    } = formEntity || {} as IReduxFormEntity<TEntity>;
    let originalEntity;

    if (!R.isNil(NvlUtils.nvl(defaultChanges, entity))) {
      originalEntity = {...defaultChanges as {}, ...entity as {}};
    }

    return MapAsOriginalUtils.extendedEntity({
      changes,
      entity: {...originalEntity as {}, ...changes as {}},
      entityId: ConditionUtils.orUndef(!newEntity, () => entity.id),
      newEntity,
      originalEntity,
    });
  };

/**
 * @stable [31.07.2020]
 */
export class MapAsUtils {
  public static readonly entityAsExtendedEntity = mapEntityAsExtendedEntity;
  public static readonly extendedEntityAsApiEntity = mapExtendedEntityAsApiEntity;
}
