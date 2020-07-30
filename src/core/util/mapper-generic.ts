import * as R from 'ramda';

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
  IExtendedEntity,
  IExtendedFormEntity,
  INamedEntity,
  IOptionEntity,
  IPresetsRawDataLabeledValueEntity,
  IPresetsSelectOptionEntity,
  IPrimaryFilterExtendedFormEntity,
  IReduxBaseSelectEntity,
  IReduxChannelEntity,
  IReduxDictionariesEntity,
  IReduxDictionaryEntity,
  IReduxFormEntity,
  IReduxHolderChannelEntity,
  IReduxHolderDictionariesEntity,
  IReduxHolderFormEntity,
  IReduxHolderLayoutEntity,
  IReduxHolderListEntity,
  IReduxHolderNotificationEntity,
  IReduxHolderPrimaryFilterFormEntity,
  IReduxHolderQueryFilterEntity,
  IReduxHolderSecondaryFilterFormEntity,
  IReduxHolderStackEntity,
  IReduxHolderTransportEntity,
  IReduxHolderUserEntity,
  IReduxLayoutEntity,
  IReduxLifeCycleEntity,
  IReduxNotificationEntity,
  IReduxPagedEntity,
  IReduxPaginatedEntity,
  IReduxPaginatedLifeCycleEntity,
  IReduxQueryFilterEntity,
  IReduxStackEntity,
  IReduxStoreEntity,
  IReduxTransportEntity,
  IReduxUserEntity,
  ISecondaryFilterExtendedFormEntity,
  ISecondaryFilterFormEntity,
} from '../definition';
import { Selectors } from './select';
import { WrapperUtils } from './wrapper';
import { isNewEntity } from './entity';
import { NvlUtils } from './nvl';
import { TypeUtils } from './type';
import { MapAsWrapperUtils } from './map-as-wrapper';

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
 * @map-as-original
 *
 * @stable [27.07.2020]
 * @param {IReduxHolderFormEntity<TEntity>} entity
 * @returns {IReduxHolderFormEntity<TEntity>}
 */
const mapHolderFormEntity = <TEntity = IEntity>(entity: IReduxHolderFormEntity<TEntity>): IReduxHolderFormEntity<TEntity> =>
  MapAsWrapperUtils.form(Selectors.form(entity));

/**
 * @map-as-original
 *
 * @stable [27.07.2020]
 * @param entity
 */
const mapHolderChannelEntity =
  <TEntity = IReduxChannelEntity>(entity: IReduxHolderChannelEntity<TEntity>): IReduxHolderChannelEntity<TEntity> =>
    MapAsWrapperUtils.channel(Selectors.channel(entity));

/**
 * @map-as-original
 *
 * @stable [27.07.2020]
 * @param entity
 */
const mapHolderNotificationEntity =
  <TEntity = IReduxNotificationEntity>(entity: IReduxHolderNotificationEntity<TEntity>): IReduxHolderNotificationEntity<TEntity> =>
    MapAsWrapperUtils.notification(Selectors.notification(entity));

/**
 * @map-as-original
 *
 * @stable [12.06.2020]
 * @param {IReduxHolderTransportEntity<TEntity>} entity
 * @returns {IReduxHolderTransportEntity<TEntity>}
 */
const mapHolderTransportEntity =
  <TEntity = IReduxTransportEntity>(entity: IReduxHolderTransportEntity<TEntity>): IReduxHolderTransportEntity<TEntity> =>
    MapAsWrapperUtils.transport(Selectors.transport(entity));

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
  <TEntity = IEntity>(entity: ISecondaryFilterFormEntity<TEntity>): IReduxHolderFormEntity<TEntity> =>
    mapHolderFormEntity(Selectors.secondaryFilter(entity));

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
 * @map-as-original
 *
 * @stable [27.07.2020]
 * @param extendedEntity
 */
const mapExtendedEntity = <TEntity = IEntity>(extendedEntity: IExtendedEntity<TEntity>): IExtendedEntity<TEntity> =>
  FilterUtils.defValuesFilter<IExtendedEntity<TEntity>, IExtendedEntity<TEntity>>({
    changes: extendedEntity.changes,
    entity: extendedEntity.entity,
    entityId: extendedEntity.entityId,
    newEntity: extendedEntity.newEntity,
    originalEntity: extendedEntity.originalEntity,
  });

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
 * @map-as
 *
 * @stable [27.07.2020]
 * @param formEntity
 * @param entity
 */
const mapEntityAsExtendedEntity =
  <TEntity extends IEntity = IEntity>(formEntity: IReduxFormEntity<TEntity>,
                                      entity?: TEntity): IExtendedEntity<TEntity> => {
    const newEntity = isNewEntity(entity);
    const {
      changes,
      defaultChanges,
    } = formEntity || {} as IReduxFormEntity<TEntity>;
    let originalEntity;

    if (!R.isNil(NvlUtils.nvl(defaultChanges, entity))) {
      originalEntity = {...defaultChanges as {}, ...entity as {}};
    }

    return mapExtendedEntity({
      changes,
      entity: {...originalEntity as {}, ...changes as {}},
      entityId: ConditionUtils.orUndef(!newEntity, () => entity.id),
      newEntity,
      originalEntity,
    });
  };

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
    ...mapEntityAsExtendedEntity(formEntity, entity),
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
 * @map-as-original
 *
 * @stable [09.06.2020]
 * @param {IReduxHolderLayoutEntity<TEntity>} wrapper
 * @returns {IReduxHolderLayoutEntity<TEntity>}
 */
const mapHolderLayoutEntity =
  <TEntity = IReduxLayoutEntity>(wrapper: IReduxHolderLayoutEntity<TEntity>): IReduxHolderLayoutEntity<TEntity> =>
    MapAsWrapperUtils.layout(Selectors.layout(wrapper));

/**
 * @map-as-original
 *
 * @stable [09.06.2020]
 * @param {IReduxHolderStackEntity<TEntity>} wrapper
 * @returns {IReduxHolderStackEntity<TEntity>}
 */
const mapHolderStackEntity =
  <TEntity = IReduxStackEntity>(wrapper: IReduxHolderStackEntity<TEntity>): IReduxHolderStackEntity<TEntity> =>
    MapAsWrapperUtils.stack(Selectors.stack(wrapper));

/**
 * @map-as-original
 *
 * @stable [09.06.2020]
 * @param {IReduxHolderUserEntity<TEntity>} wrapper
 * @returns {IReduxHolderUserEntity<TEntity>}
 */
const mapHolderUserEntity =
  <TEntity = IReduxUserEntity>(wrapper: IReduxHolderUserEntity<TEntity>): IReduxHolderUserEntity<TEntity> =>
    MapAsWrapperUtils.user(Selectors.user(wrapper));

/**
 * @map-as-original
 *
 * @stable [09.06.2020]
 * @param {IReduxHolderDictionariesEntity<TEntity>} wrapper
 * @returns {IReduxHolderDictionariesEntity<TEntity>}
 */
const mapHolderDictionariesEntity =
  <TEntity = IReduxDictionariesEntity>(wrapper: IReduxHolderDictionariesEntity<TEntity>): IReduxHolderDictionariesEntity<TEntity> =>
    MapAsWrapperUtils.dictionaries(Selectors.dictionaries(wrapper));

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
 * @map-as-original
 *
 * @stable [09.06.2020]
 * @param {IReduxStoreEntity<TDictionaries>} entity
 * @returns {IReduxStoreEntity<TDictionaries>}
 */
const mapStoreEntity =
  <TDictionaries = {}>(entity: IReduxStoreEntity<TDictionaries>): IReduxStoreEntity<TDictionaries> =>
    ({
      ...mapHolderChannelEntity(entity),
      ...mapHolderDictionariesEntity(entity),
      ...mapHolderLayoutEntity(entity),
      ...mapHolderNotificationEntity(entity),
      ...mapHolderStackEntity(entity),
      ...mapHolderTransportEntity(entity),
      ...mapHolderUserEntity(entity),
    });

/**
 * @stable [06.05.2020]
 */
export class GenericMappers {
  public static readonly dictionaryEntityAsSelectEntity = mapDictionaryEntityAsSelectEntity;                                                      /* stable [19.05.2020] */
  public static readonly dictionaryEntityAsSelectOptionEntities = mapDictionaryEntityAsSelectOptionEntities;                                      /* stable [19.05.2020] */
  public static readonly entityAsExtendedEntity = mapEntityAsExtendedEntity;                                                                      /* stable [08.05.2020] */
  public static readonly entityAsExtendedFormEntity = mapEntityAsExtendedFormEntity;                                                              /* stable [10.05.2020] */
  public static readonly extendedEntity = mapExtendedEntity;                                                                                      /* stable [08.05.2020] */
  public static readonly fullSearchFilter = mapFullSearchFilter;                                                                                  /* stable [10.05.2020] */
  public static readonly holderDictionariesEntity = mapHolderDictionariesEntity;                                                                  /* stable [09.06.2020] */
  public static readonly holderFormEntity = mapHolderFormEntity;                                                                                  /* stable [12.06.2020] */
  public static readonly holderListEntity = mapHolderListEntity;                                                                                  /* stable [12.06.2020] */
  public static readonly holderListEntityAsDisabled = mapHolderListEntityAsDisabled;                                                              /* stable [08.07.2020] */
  public static readonly holderNotificationEntity = mapHolderNotificationEntity;                                                                  /* stable [12.06.2020] */
  public static readonly holderQueryFilterEntity = mapHolderQueryFilterEntity;                                                                    /* stable [26.07.2020] */
  public static readonly holderQueryFilterEntityAsQuery = mapHolderQueryFilterEntityAsQuery;                                                      /* stable [27.07.2020] */
  public static readonly holderTransportEntity = mapHolderTransportEntity;                                                                        /* stable [12.06.2020] */
  public static readonly holderUserEntity = mapHolderUserEntity;                                                                                  /* stable [09.06.2020] */
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
  public static readonly storeEntity = mapStoreEntity;                                                                                            /* stable [09.06.2020] */
}
