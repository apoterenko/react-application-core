import * as R from 'ramda';

import { FilterUtils } from './filter';
import {
  IApiEntity,
  IExtendedEntity,
  IExtendedFormEntity,
  IReduxFormEntity,
  IReduxListHolderEntity,
} from '../definition';
import {
  IDisabledWrapper,
  IEntity,
  IProgressWrapper,
} from '../definitions.interface';
import { ConditionUtils } from './cond';
import { EntityUtils } from './entity';
import { MapAsOriginalUtils } from './map-as-original';
import { MapAsWrapperUtils } from './map-as-wrapper';
import { NvlUtils } from './nvl';
import { Selectors } from './select';
import { WrapperUtils } from './wrapper';

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
 * @map-as
 *
 * @stable [31.07.2020]
 * @param formEntity
 * @param entity
 */
const mapEntityAsExtendedFormEntity = <TEntity = IEntity>(formEntity: IReduxFormEntity<TEntity>,
                                                          entity?: TEntity): IExtendedFormEntity<TEntity> =>
  ({
    ...MapAsWrapperUtils.form(formEntity),
    ...mapEntityAsExtendedEntity(formEntity, entity),
  });

/**
 * @map-as
 *
 * @stable [31.07.2020]
 * @param entity
 */
const mapProgressAsDisabled = (entity: IProgressWrapper): IDisabledWrapper =>
  MapAsWrapperUtils.disabled(WrapperUtils.inProgress(entity));

/**
 * @map-as
 *
 * @stable [31.07.2020]
 * @param listEntity
 */
const mapListHolderEntityAsDisabled = (listEntity: IReduxListHolderEntity): IDisabledWrapper =>
  mapProgressAsDisabled(Selectors.list(listEntity));

/**
 * @map-as
 *
 * @stable [01.08.2020]
 * @param listHolderEntity
 * @param formEntity
 */
const mapListSelectedEntityAsExtendedFormEntity =
  <TEntity = IEntity>(listHolderEntity: IReduxListHolderEntity<TEntity>,
                      formEntity: IReduxFormEntity<TEntity>): IExtendedFormEntity<TEntity> =>
    MapAsUtils.entityAsExtendedFormEntity(
      formEntity,
      Selectors.listSelectedEntity(listHolderEntity)
    );

/**
 * @map-as
 *
 * @stable [01.08.2020]
 * @param listHolderEntity
 * @param formEntity
 */
const mapListSelectedEntityAsFinalEntity =
  <TEntity = IEntity>(listHolderEntity: IReduxListHolderEntity<TEntity>,
                      formEntity: IReduxFormEntity<TEntity>): TEntity =>
    mapListSelectedEntityAsExtendedFormEntity<TEntity>(listHolderEntity, formEntity).entity;

/**
 * @stable [31.07.2020]
 */
export class MapAsUtils {
  public static readonly entityAsExtendedEntity = mapEntityAsExtendedEntity;
  public static readonly entityAsExtendedFormEntity = mapEntityAsExtendedFormEntity;
  public static readonly extendedEntityAsApiEntity = mapExtendedEntityAsApiEntity;
  public static readonly listHolderEntityAsDisabled = mapListHolderEntityAsDisabled;
  public static readonly listSelectedEntityAsExtendedFormEntity = mapListSelectedEntityAsExtendedFormEntity;
  public static readonly listSelectedEntityAsFinalEntity = mapListSelectedEntityAsFinalEntity;
}
