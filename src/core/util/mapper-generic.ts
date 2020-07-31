import {
  AnyT,
  IDisabledWrapper,
  IEntity,
  IProgressWrapper,
  IQueryWrapper,
  UNDEF_SYMBOL,
} from '../definitions.interface';
import {
  FilterUtils,
} from './filter';
import {
  ConditionUtils,
} from './cond';
import {
  DEFAULT_PAGE_SIZE,
  FIRST_PAGE,
  IExtendedFormEntity,
  INamedEntity,
  IOptionEntity,
  IPresetsRawDataLabeledValueEntity,
  IPresetsSelectOptionEntity,
  IPrimaryFilterExtendedFormEntity,
  IReduxBaseSelectEntity,
  IReduxDictionaryEntity,
  IReduxFormEntity,
  IReduxFormHolderEntity,
  IReduxHolderListEntity,
  IReduxHolderPrimaryFilterFormEntity,
  IReduxHolderQueryFilterEntity,
  IReduxHolderSecondaryFilterFormEntity,
  IReduxLifeCycleEntity,
  IReduxPagedEntity,
  IReduxPaginatedEntity,
  IReduxPaginatedLifeCycleEntity,
  IReduxQueryFilterEntity,
  ISecondaryFilterExtendedFormEntity,
  ISecondaryFilterFormEntity,
} from '../definition';
import { Selectors } from './select';
import { WrapperUtils } from './wrapper';
import { TypeUtils } from './type';
import { MapAsWrapperUtils } from './map-as-wrapper';
import { MapAsOriginalUtils } from './map-as-original';
import { MapAsUtils } from './map-as';

/**
 * @map-as
 * @map-as-original
 * @map-as-wrapper
 */

/**
 * @map-as-original
 *
 * @stable [26.07.2020]
 * @param {IReduxHolderQueryFilterEntity} entity
 * @returns {IReduxHolderQueryFilterEntity}
 */
const mapHolderQueryFilterEntity = (entity: IReduxHolderQueryFilterEntity): IReduxHolderQueryFilterEntity =>
  MapAsWrapperUtils.queryFilter(Selectors.queryFilter(entity));

/**
 * @map-as-original
 *
 * @stable [27.07.2020]
 * @param {IReduxHolderListEntity} entity
 * @returns {IReduxHolderListEntity}
 */
const mapHolderListEntity = (entity: IReduxHolderListEntity): IReduxHolderListEntity => MapAsWrapperUtils.list(Selectors.list(entity));

/**
 * @map-as
 *
 * @stable [09.06.2020]
 * @param {IProgressWrapper} entity
 * @returns {IDisabledWrapper}
 */
const mapProgressAsDisabled = (entity: IProgressWrapper): IDisabledWrapper => MapAsWrapperUtils.disabled(WrapperUtils.inProgress(entity));

/**
 * @map-as
 *
 * @stable [08.07.2020]
 * @param {IReduxHolderListEntity} listEntity
 * @returns {IDisabledWrapper}
 */
const mapHolderListEntityAsDisabled = (listEntity: IReduxHolderListEntity): IDisabledWrapper =>
  mapProgressAsDisabled(Selectors.list(listEntity));

/**
 * @map-as
 *
 * @stable [08.07.2020]
 * @param {INamedEntity} entity
 * @returns {IPresetsRawDataLabeledValueEntity}
 */
const mapNamedEntityAsRawDataLabeledValueEntity =
  (entity: INamedEntity): IPresetsRawDataLabeledValueEntity =>
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
 * @stable [27.07.2020]
 * @param entity
 */
const mapSecondaryFilterFormEntityAsHolderFormEntity =
  <TEntity = IEntity>(entity: ISecondaryFilterFormEntity<TEntity>): IReduxFormHolderEntity<TEntity> =>
    MapAsOriginalUtils.formHolderEntity(Selectors.secondaryFilter(entity));

/**
 * @map-as
 *
 * @stable [27.07.2020]
 * @param entity
 */
const mapHolderQueryFilterEntityAsQuery = (entity: IReduxHolderQueryFilterEntity): IQueryWrapper =>
  MapAsWrapperUtils.query(Selectors.queryFilterEntityQuery(entity));

/**
 * @map-as-original
 *
 * @stable [27.07.2020]
 * @param {IReduxPagedEntity} entity
 * @returns {IReduxPagedEntity}
 */
const mapPagedEntity = (entity: IReduxPagedEntity): IReduxPagedEntity =>
  ConditionUtils.ifNotNilThanValue(
    entity,
    () => FilterUtils.defValuesFilter<IReduxPagedEntity, IReduxPagedEntity>({
      page: entity.page,
      pageSize: entity.pageSize,
    }),
    UNDEF_SYMBOL
  );

/**
 * @stable [19.05.2020]
 * @param {IPresetsSelectOptionEntity<TRawData>} entity
 * @returns {IPresetsSelectOptionEntity<TRawData>}
 */
const mapSelectOptionEntity =
  <TRawData = IEntity>(entity: IPresetsSelectOptionEntity<TRawData>): IPresetsSelectOptionEntity<TRawData> =>
    FilterUtils.defValuesFilter<IPresetsSelectOptionEntity<TRawData>, IPresetsSelectOptionEntity<TRawData>>({
      disabled: entity.disabled,
      label: entity.label,
      rawData: entity.rawData,
      value: entity.value,
    });

/**
 * @stable [19.05.2020]
 * @param {TEntity} entity
 * @returns {IPresetsSelectOptionEntity<TEntity extends IOptionEntity>}
 */
const mapOptionEntityAsSelectOptionEntity =
  <TEntity extends IOptionEntity>(entity: TEntity): IPresetsSelectOptionEntity<TEntity> =>
    mapSelectOptionEntity<TEntity>({
      value: entity.id,
      label: entity.name,
      disabled: entity.disabled,
      rawData: entity,
    });

/**
 * @stable [19.05.2020]
 * @param {TEntity[] | TEntity} data
 * @returns {Array<IPresetsSelectOptionEntity<TEntity extends IOptionEntity>>}
 */
const mapOptionEntitiesAsSelectOptionEntities =
  <TEntity extends IOptionEntity>(data: TEntity[] | TEntity): Array<IPresetsSelectOptionEntity<TEntity>> =>
    ConditionUtils.ifNotNilThanValue(
      data,
      () => [].concat(data).map((entity) => mapOptionEntityAsSelectOptionEntity(entity)),
      UNDEF_SYMBOL
    );

/**
 * @mapper
 * @stable [10.05.2020]
 * @param {IReduxFormEntity<TEntity>} formEntity
 * @param {TEntity} entity
 * @returns {IExtendedFormEntity<TEntity>}
 */
const mapEntityAsExtendedFormEntity = <TEntity = IEntity>(formEntity: IReduxFormEntity<TEntity>,
                                                          entity?: TEntity): IExtendedFormEntity<TEntity> =>
  ({
    ...MapAsWrapperUtils.form(formEntity),
    ...MapAsUtils.entityAsExtendedEntity(formEntity, entity),
  });

/**
 * @mapper
 * @stable [10.05.2020]
 * @param {IReduxFormEntity<TEntity>} formEntity
 * @param {TEntity} entity
 * @returns {TEntity}
 */
const mapExtendedFormEntityAsFinalEntity = <TEntity = IEntity>(formEntity: IReduxFormEntity<TEntity>,
                                                               entity?: TEntity): TEntity =>
  mapEntityAsExtendedFormEntity(formEntity, entity).entity;

/**
 * @map-as
 *
 * @stable [27.07.2020]
 * @param holderListEntity
 * @param formEntity
 */
const mapListSelectedEntityAsExtendedFormEntity =
  <TEntity = IEntity>(holderListEntity: IReduxHolderListEntity<TEntity>,
                      formEntity: IReduxFormEntity<TEntity>): IExtendedFormEntity<TEntity> =>
    mapEntityAsExtendedFormEntity(
      formEntity,
      Selectors.listSelectedEntity(holderListEntity)
    );

/**
 * @stable [10.05.2020]
 * @param {IReduxHolderListEntity<TEntity>} listEntity
 * @param {IReduxFormEntity<TEntity>} formEntity
 * @returns {TEntity}
 */
const mapListSelectedExtendedFormEntityAsFinalEntity =
  <TEntity = IEntity>(listEntity: IReduxHolderListEntity<TEntity>,
                      formEntity: IReduxFormEntity<TEntity>): TEntity =>
    mapListSelectedEntityAsExtendedFormEntity<TEntity>(listEntity, formEntity).entity;

/**
 * @map-as-original
 *
 * @stable [27.07.2020]
 * @param entity
 */
const mapQueryFilterEntity = (entity: IReduxQueryFilterEntity): IReduxQueryFilterEntity =>
  ConditionUtils.ifNotNilThanValue(
    entity,
    () => FilterUtils.defValuesFilter<IReduxQueryFilterEntity, IReduxQueryFilterEntity>({
      active: entity.active,
      query: entity.query,
    }),
    UNDEF_SYMBOL
  );

/**
 * @map-as-original
 *
 * @stable [27.07.2020]
 * @param entity
 */
const mapLifeCycleEntity = (entity: IReduxLifeCycleEntity): IReduxLifeCycleEntity =>
  ConditionUtils.ifNotNilThanValue(
    entity,
    () => FilterUtils.defValuesFilter<IReduxLifeCycleEntity, IReduxLifeCycleEntity>({
      error: entity.error,
      progress: entity.progress,
      touched: entity.touched,
    }),
    UNDEF_SYMBOL
  );

/**
 * @map-as-original
 *
 * @stable [27.07.2020]
 * @param {IReduxPaginatedEntity} entity
 * @returns {IReduxPaginatedEntity}
 */
const mapPaginatedEntity = (entity: IReduxPaginatedEntity): IReduxPaginatedEntity =>
  ConditionUtils.ifNotNilThanValue(
    entity,
    () => FilterUtils.defValuesFilter<IReduxPaginatedEntity, IReduxPaginatedEntity>({
      ...mapPagedEntity(entity),
      lockPage: entity.lockPage,
      totalAmount: entity.totalAmount,
      totalCount: entity.totalCount,
    }),
    UNDEF_SYMBOL
  );

/**
 * @mapper
 * @stable [09.05.2020]
 * @param {IReduxPaginatedEntity} entity
 * @param {number} pageSize
 * @returns {IReduxPagedEntity}
 */
const mapPaginatedEntityAsPagedEntity =
  (entity: IReduxPaginatedEntity, pageSize = DEFAULT_PAGE_SIZE): IReduxPagedEntity =>
    ConditionUtils.ifNotNilThanValue(
      entity,
      () => mapPagedEntity({
        page: entity.lockPage ? entity.page : FIRST_PAGE,  // lockPage <=> backward, forward, last, first
        pageSize,
      }),
      UNDEF_SYMBOL
    );

/**
 * @mapper
 * @stable [09.05.2020]
 * @param {IReduxHolderListEntity} entity
 * @param {number} pageSize
 * @returns {IReduxPagedEntity}
 */
const mapListEntityAsPagedEntity = (entity: IReduxHolderListEntity, pageSize = DEFAULT_PAGE_SIZE): IReduxPagedEntity =>
  mapPaginatedEntityAsPagedEntity(Selectors.list(entity), pageSize);

/**
 * @map-as-original
 *
 * @stable [10.06.2020]
 * @param {IReduxPaginatedLifeCycleEntity} entity
 * @returns {IReduxPaginatedLifeCycleEntity}
 */
const mapPaginatedLifeCycleEntity = (entity: IReduxPaginatedLifeCycleEntity): IReduxPaginatedLifeCycleEntity => ({
  ...mapLifeCycleEntity(entity),
  ...mapPaginatedEntity(entity),
});

/**
 * @mapper
 * @stable [10.05.2020]
 * @param {IReduxHolderPrimaryFilterFormEntity<TEntity>} formEntity
 * @param {TEntity} entity
 * @returns {TEntity}
 */
const mapPrimaryFilterEntityAsFinalEntity = <TEntity = IEntity>(formEntity: IReduxHolderPrimaryFilterFormEntity<TEntity>,
                                                                entity?: TEntity): TEntity =>
  mapExtendedFormEntityAsFinalEntity(Selectors.primaryFilter(formEntity), entity);

/**
 * @mapper
 * @stable [10.05.2020]
 * @param {IReduxHolderSecondaryFilterFormEntity<TEntity>} formEntity
 * @param {TEntity} entity
 * @returns {TEntity}
 */
const mapSecondaryFilterEntityAsFinalEntity = <TEntity = IEntity>(formEntity: IReduxHolderSecondaryFilterFormEntity<TEntity>,
                                                                  entity?: TEntity): TEntity =>
  mapExtendedFormEntityAsFinalEntity(Selectors.secondaryFilter(formEntity), entity);

/**
 * @mapper
 * @stable [10.05.2020]
 * @param {IReduxHolderPrimaryFilterFormEntity<TEntity>} wrapper
 * @param {TEntity} entity
 * @returns {IPrimaryFilterExtendedFormEntity<TEntity>}
 */
const mapPrimaryFilterEntityAsPrimaryFilterExtendedFormEntity =
  <TEntity = IEntity>(wrapper: IReduxHolderPrimaryFilterFormEntity<TEntity>,
                      entity?: TEntity): IPrimaryFilterExtendedFormEntity<TEntity> =>
    mapEntityAsPrimaryFilterExtendedFormEntity(Selectors.primaryFilter(wrapper), entity);

/**
 * @map-as
 *
 * @stable [27.07.2020]
 * @param formEntity
 * @param entity
 */
const mapEntityAsPrimaryFilterExtendedFormEntity =
  <TEntity = IEntity>(formEntity: IReduxFormEntity<TEntity>,
                      entity?: TEntity): IPrimaryFilterExtendedFormEntity<TEntity> =>
    MapAsWrapperUtils.primaryFilter(
      mapEntityAsExtendedFormEntity(formEntity, entity)
    );

/**
 * @map-as
 *
 * @stable [27.07.2020]
 * @param formEntity
 * @param entity
 */
const mapEntityAsSecondaryFilterExtendedFormEntity =
  <TEntity = IEntity>(formEntity: IReduxFormEntity<TEntity>,
                      entity?: TEntity): ISecondaryFilterExtendedFormEntity<TEntity> =>
    MapAsWrapperUtils.secondaryFilter(
      mapEntityAsExtendedFormEntity(formEntity, entity)
    );

/**
 * @mapper
 * @stable [10.05.2020]
 * @param {IReduxHolderSecondaryFilterFormEntity<TEntity>} wrapper
 * @param {TEntity} entity
 * @returns {ISecondaryFilterExtendedFormEntity<TEntity>}
 */
const mapSecondaryFilterEntityAsSecondaryFilterExtendedFormEntity =
  <TEntity = IEntity>(wrapper: IReduxHolderSecondaryFilterFormEntity<TEntity>,
                      entity?: TEntity): ISecondaryFilterExtendedFormEntity<TEntity> =>
    mapEntityAsSecondaryFilterExtendedFormEntity(Selectors.secondaryFilter(wrapper), entity);

/**
 * @mapper
 * @stable [10.05.2020]
 * @param wrapper
 * @param cfg
 */
const mapFullSearchFilter =
  <TFilter, TEntity = IEntity>(wrapper: IReduxHolderQueryFilterEntity & IReduxHolderListEntity<TEntity>,
                               cfg = {paging: true}): TFilter => ({
    /* query */
    ...mapHolderQueryFilterEntityAsQuery(wrapper),

    /* filters */
    ...mapPrimaryFilterEntityAsFinalEntity(wrapper),
    ...mapSecondaryFilterEntityAsFinalEntity(wrapper),

    /* paging */
    ...cfg.paging ? mapListEntityAsPagedEntity(wrapper) : {},
  }) as TFilter;

/**
 * @stable [19.05.2020]
 * @param {IReduxDictionaryEntity<TEntity>} dictionaryEntity
 * @param {(data: (TEntity[] | TEntity)) => AnyT} accessor
 * @returns {Array<IPresetsSelectOptionEntity<TEntity>>}
 */
const mapDictionaryEntityAsSelectOptionEntities =
  <TEntity>(dictionaryEntity: IReduxDictionaryEntity<TEntity>,
            accessor?: (data: TEntity | TEntity[]) => AnyT): Array<IPresetsSelectOptionEntity<TEntity>> =>
    GenericMappers.optionEntitiesAsSelectOptionEntities(
      ConditionUtils.ifNotNilThanValue(
        Selectors.data(dictionaryEntity),
        (data) => TypeUtils.isFn(accessor) ? accessor(data) : data
      )
    );

/**
 * @stable [19.05.2020]
 * @param {IReduxDictionaryEntity<TEntity>} entity
 * @param {(data: TEntity[]) => TResult} accessor
 * @returns {IReduxBaseSelectEntity}
 */
const mapDictionaryEntityAsSelectEntity =
  <TEntity, TResult = TEntity[]>(entity: IReduxDictionaryEntity<TEntity>,
                                 accessor?: (data: TEntity[]) => TResult): IReduxBaseSelectEntity =>
    ({
      ...MapAsWrapperUtils.waitingForOptions(WrapperUtils.isLoading(entity)),
      ...MapAsWrapperUtils.options(mapDictionaryEntityAsSelectOptionEntities<TEntity>(entity, accessor)),
    });

/**
 * @stable [06.05.2020]
 */
export class GenericMappers {
  public static readonly dictionaryEntityAsSelectEntity = mapDictionaryEntityAsSelectEntity;                                                      /* stable [19.05.2020] */
  public static readonly dictionaryEntityAsSelectOptionEntities = mapDictionaryEntityAsSelectOptionEntities;                                      /* stable [19.05.2020] */
  public static readonly entityAsExtendedFormEntity = mapEntityAsExtendedFormEntity;                                                              /* stable [10.05.2020] */
  public static readonly fullSearchFilter = mapFullSearchFilter;                                                                                  /* stable [10.05.2020] */
  public static readonly holderListEntity = mapHolderListEntity;                                                                                  /* stable [12.06.2020] */
  public static readonly holderListEntityAsDisabled = mapHolderListEntityAsDisabled;                                                              /* stable [08.07.2020] */
  public static readonly holderQueryFilterEntity = mapHolderQueryFilterEntity;                                                                    /* stable [26.07.2020] */
  public static readonly holderQueryFilterEntityAsQuery = mapHolderQueryFilterEntityAsQuery;                                                      /* stable [27.07.2020] */
  public static readonly listEntityAsPagedEntity = mapListEntityAsPagedEntity;                                                                    /* stable [09.05.2020] */
  public static readonly listSelectedEntityAsExtendedFormEntity = mapListSelectedEntityAsExtendedFormEntity;                                      /* stable [09.05.2020] */
  public static readonly listSelectedExtendedFormEntityAsFinalEntity = mapListSelectedExtendedFormEntityAsFinalEntity;                            /* stable [10.05.2020] */
  public static readonly namedEntityAsRawDataLabeledValueEntity = mapNamedEntityAsRawDataLabeledValueEntity;                                      /* stable [08.07.2020] */
  public static readonly optionEntitiesAsSelectOptionEntities = mapOptionEntitiesAsSelectOptionEntities;                                          /* stable [19.05.2020] */
  public static readonly pagedEntity = mapPagedEntity;                                                                                            /* stable [07.05.2020] */
  public static readonly paginatedEntity = mapPaginatedEntity;                                                                                    /* stable [07.05.2020] */
  public static readonly paginatedLifeCycleEntity = mapPaginatedLifeCycleEntity;                                                                  /* stable [07.05.2020] */
  public static readonly primaryFilterEntityAsPrimaryFilterExtendedFormEntity = mapPrimaryFilterEntityAsPrimaryFilterExtendedFormEntity;          /* stable [10.05.2020] */
  public static readonly queryFilterEntity = mapQueryFilterEntity;                                                                                /* stable [27.07.2020] */
  public static readonly secondaryFilterEntityAsSecondaryFilterExtendedFormEntity = mapSecondaryFilterEntityAsSecondaryFilterExtendedFormEntity;  /* stable [10.05.2020] */
  public static readonly secondaryFilterFormEntityAsHolderFormEntity = mapSecondaryFilterFormEntityAsHolderFormEntity;                            /* stable [27.07.2020] */
}
