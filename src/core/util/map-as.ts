import * as R from 'ramda';

import { FilterUtils } from './filter';
import {
  DEFAULT_PAGE_SIZE,
  FIRST_PAGE,
  IApiEntity,
  IExtendedEntity,
  IExtendedFormEntity,
  INamedEntity,
  IOptionEntity,
  IPresetsBaseSelectEntity,
  IPresetsRawDataLabeledValueEntity,
  IPresetsSelectOptionEntity,
  IPrimaryFilterExtendedFormEntity,
  IReduxDictionaryEntity,
  IReduxFormEntity,
  IReduxListHolderEntity,
  IReduxPagedEntity,
  IReduxPaginatedEntity,
  IReduxPrimaryFilterFormEntity,
  IReduxQueryFilterHolderEntity,
  IReduxSecondaryFilterFormEntity,
  ISecondaryFilterExtendedFormEntity,
} from '../definition';
import {
  AnyT,
  IDisabledWrapper,
  IEntity,
  IProgressWrapper,
  IQueryWrapper,
  UNDEF_SYMBOL,
} from '../definitions.interface';
import { ConditionUtils } from './cond';
import { EntityUtils } from './entity';
import { MapAsOriginalUtils } from './map-as-original';
import { MapAsWrapperUtils } from './map-as-wrapper';
import { NvlUtils } from './nvl';
import { Selectors } from './select';
import { TypeUtils } from './type';
import { WrapperUtils } from './wrapper';

/**
 * @map-as
 *
 * @stable [02.08.2020]
 * @param entity
 * @param pageSize
 */
const mapPaginatedEntityAsPagedEntity =
  (entity: IReduxPaginatedEntity, pageSize = DEFAULT_PAGE_SIZE): IReduxPagedEntity =>
    ConditionUtils.ifNotNilThanValue(
      entity,
      () => MapAsOriginalUtils.pagedEntity({
        page: entity.lockPage ? entity.page : FIRST_PAGE,  // lockPage <=> backward, forward, last, first
        pageSize,
      }),
      UNDEF_SYMBOL
    );

/**
 * @map-as
 *
 * @stable [02.08.2020]
 * @param entity
 * @param pageSize
 */
const mapListHolderEntityAsPagedEntity = (entity: IReduxListHolderEntity, pageSize = DEFAULT_PAGE_SIZE): IReduxPagedEntity =>
  mapPaginatedEntityAsPagedEntity(Selectors.list(entity), pageSize);

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
 * @stable [10.08.2020]
 * @param dictionaryEntity
 */
const mapDictionaryEntityAsDisabled = (dictionaryEntity: IReduxDictionaryEntity): IDisabledWrapper =>
  mapProgressAsDisabled(dictionaryEntity);

/**
 * @map-as
 *
 * @stable [10.08.2020]
 * @param dictionaryEntity
 */
const mapDictionaryEntityAsProgress = (dictionaryEntity: IReduxDictionaryEntity): IProgressWrapper =>
  MapAsOriginalUtils.progressWrapper(dictionaryEntity);

/**
 * @map-as
 *
 * @stable [02.08.2020]
 * @param entity
 */
const mapQueryFilterHolderEntityAsQuery = (entity: IReduxQueryFilterHolderEntity): IQueryWrapper =>
  MapAsWrapperUtils.query(Selectors.queryFilterEntityQuery(entity));

/**
 * @map-as
 *
 * @stable [02.08.2020]
 * @param formEntity
 * @param entity
 */
const mapFormEntityAsFinalEntity = <TEntity = IEntity>(formEntity: IReduxFormEntity<TEntity>,
                                                       entity?: TEntity): TEntity =>
  mapEntityAsExtendedFormEntity(formEntity, entity).entity;

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
    mapEntityAsExtendedFormEntity(
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
 * @map-as
 *
 * @stable [02.08.2020]
 * @param entity
 */
const mapNamedEntityAsRawDataLabeledValueEntity = (entity: INamedEntity): IPresetsRawDataLabeledValueEntity =>
  ConditionUtils.ifNotNilThanValue(
    entity,
    () => (
      FilterUtils.defValuesFilter<IPresetsRawDataLabeledValueEntity, IPresetsRawDataLabeledValueEntity>({
        value: entity.id,
        label: entity.name || String(entity.id),
        rawData: entity,
      })
    ),
    UNDEF_SYMBOL
  );

/**
 * @map-as
 *
 * @stable [02.08.2020]
 * @param formEntity
 * @param entity
 */
const mapFormEntityAsPrimaryFilterExtendedFormEntity =
  <TEntity = IEntity>(formEntity: IReduxFormEntity<TEntity>,
                      entity?: TEntity): IPrimaryFilterExtendedFormEntity<TEntity> =>
    MapAsWrapperUtils.primaryFilter(
      mapEntityAsExtendedFormEntity(formEntity, entity)
    );

/**
 * @map-as
 *
 * @stable [02.08.2020]
 * @param formEntity
 * @param entity
 */
const mapFormEntityAsSecondaryFilterExtendedFormEntity =
  <TEntity = IEntity>(formEntity: IReduxFormEntity<TEntity>,
                      entity?: TEntity): ISecondaryFilterExtendedFormEntity<TEntity> =>
    MapAsWrapperUtils.secondaryFilter(
      mapEntityAsExtendedFormEntity(formEntity, entity)
    );

/**
 * @map-as
 *
 * @stable [02.08.2020]
 * @param primaryFilterFormEntity
 * @param entity
 */
const mapPrimaryFilterFormEntityAsPrimaryFilterExtendedFormEntity =
  <TEntity = IEntity>(primaryFilterFormEntity: IReduxPrimaryFilterFormEntity<TEntity>,
                      entity?: TEntity): IPrimaryFilterExtendedFormEntity<TEntity> =>
    mapFormEntityAsPrimaryFilterExtendedFormEntity(Selectors.primaryFilter(primaryFilterFormEntity), entity);

/**
 * @map-as
 *
 * @stable [02.08.2020]
 * @param secondaryFilterFormEntity
 * @param entity
 */
const mapSecondaryFilterFormEntityAsSecondaryFilterExtendedFormEntity =
  <TEntity = IEntity>(secondaryFilterFormEntity: IReduxSecondaryFilterFormEntity<TEntity>,
                      entity?: TEntity): ISecondaryFilterExtendedFormEntity<TEntity> =>
    mapFormEntityAsSecondaryFilterExtendedFormEntity(Selectors.secondaryFilter(secondaryFilterFormEntity), entity);

/**
 * @map-as
 *
 * @stable [02.08.2020]
 * @param entity
 * @param cfg
 */
const mapEntityAsFullSearchFilter =
  <TFilter, TEntity = IEntity>(entity: IReduxQueryFilterHolderEntity
                                        & IReduxListHolderEntity<TEntity>
                                        & IReduxPrimaryFilterFormEntity<TFilter>
                                        & IReduxSecondaryFilterFormEntity<TFilter>,
                               cfg = {paging: true}): TFilter => ({
    /* query */
    ...mapQueryFilterHolderEntityAsQuery(entity),

    /* filters */
    ...mapFormEntityAsFinalEntity(Selectors.primaryFilter(entity)),
    ...mapFormEntityAsFinalEntity(Selectors.secondaryFilter(entity)),

    /* paging */
    ...cfg.paging ? mapListHolderEntityAsPagedEntity(entity) : {},
  }) as TFilter;

/**
 * @map-as
 *
 * @stable [02.08.2020]
 * @param entity
 */
const mapOptionEntityAsSelectOptionEntity =
  <TEntity extends IOptionEntity>(entity: TEntity): IPresetsSelectOptionEntity<TEntity> =>
    MapAsOriginalUtils.selectOptionEntity<TEntity>({
      disabled: entity.disabled,
      label: entity.name,
      rawData: entity,
      value: entity.id,
    });

/**
 * @map-as
 *
 * @stable [02.08.2020]
 * @param data
 */
const mapOptionEntitiesAsSelectOptionEntities =
  <TEntity extends IOptionEntity>(data: TEntity[] | TEntity): IPresetsSelectOptionEntity<TEntity>[] =>
    ConditionUtils.ifNotNilThanValue(
      data,
      () => [].concat(data).map((entity) => mapOptionEntityAsSelectOptionEntity(entity)),
      UNDEF_SYMBOL
    );

/**
 * @map-as
 *
 * @stable [02.08.2020]
 * @param dictionaryEntity
 * @param accessor
 */
const mapDictionaryEntityAsSelectOptionEntities =
  <TEntity>(dictionaryEntity: IReduxDictionaryEntity<TEntity>,
            accessor?: (data: TEntity | TEntity[]) => AnyT): IPresetsSelectOptionEntity<TEntity>[] =>
    mapOptionEntitiesAsSelectOptionEntities(
      ConditionUtils.ifNotNilThanValue(
        Selectors.data(dictionaryEntity),
        (data) => TypeUtils.isFn(accessor) ? accessor(data) : data
      )
    );

/**
 * @map-as
 *
 * @stable [06.08.2020]
 * @param entity
 * @param accessor
 */
const mapDictionaryEntityAsSelectEntity =
  <TEntity, TResult = TEntity[]>(entity: IReduxDictionaryEntity<TEntity>,
                                 accessor?: (data: TEntity[]) => TResult): IPresetsBaseSelectEntity => ({
    ...MapAsWrapperUtils.waitingForOptions(WrapperUtils.inProgress(entity)),
    ...MapAsWrapperUtils.options(MapAsUtils.dictionaryEntityAsSelectOptionEntities(entity, accessor)),
  });

/**
 * @stable [31.07.2020]
 */
export class MapAsUtils {
  public static readonly dictionaryEntityAsDisabled = mapDictionaryEntityAsDisabled;
  public static readonly dictionaryEntityAsProgress = mapDictionaryEntityAsProgress;
  public static readonly dictionaryEntityAsSelectEntity = mapDictionaryEntityAsSelectEntity;
  public static readonly dictionaryEntityAsSelectOptionEntities = mapDictionaryEntityAsSelectOptionEntities;
  public static readonly entityAsExtendedEntity = mapEntityAsExtendedEntity;
  public static readonly entityAsExtendedFormEntity = mapEntityAsExtendedFormEntity;
  public static readonly entityAsFullSearchFilter = mapEntityAsFullSearchFilter;
  public static readonly extendedEntityAsApiEntity = mapExtendedEntityAsApiEntity;
  public static readonly formEntityAsFinalEntity = mapFormEntityAsFinalEntity;
  public static readonly listHolderEntityAsDisabled = mapListHolderEntityAsDisabled;
  public static readonly listHolderEntityAsPagedEntity = mapListHolderEntityAsPagedEntity;
  public static readonly listSelectedEntityAsExtendedFormEntity = mapListSelectedEntityAsExtendedFormEntity;
  public static readonly listSelectedEntityAsFinalEntity = mapListSelectedEntityAsFinalEntity;
  public static readonly namedEntityAsRawDataLabeledValueEntity = mapNamedEntityAsRawDataLabeledValueEntity;
  public static readonly optionEntitiesAsSelectOptionEntities = mapOptionEntitiesAsSelectOptionEntities;
  public static readonly primaryFilterFormEntityAsPrimaryFilterExtendedFormEntity = mapPrimaryFilterFormEntityAsPrimaryFilterExtendedFormEntity;
  public static readonly queryFilterHolderEntityAsQuery = mapQueryFilterHolderEntityAsQuery;
  public static readonly secondaryFilterFormEntityAsSecondaryFilterExtendedFormEntity = mapSecondaryFilterFormEntityAsSecondaryFilterExtendedFormEntity;
}
