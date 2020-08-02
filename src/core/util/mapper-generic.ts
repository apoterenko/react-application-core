import {
  AnyT,
  IEntity,
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
  IOptionEntity,
  IPresetsSelectOptionEntity,
  IPrimaryFilterExtendedFormEntity,
  IReduxBaseSelectEntity,
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
import { MapAsOriginalUtils } from './map-as-original';
import { MapAsUtils } from './map-as';
import { MapAsWrapperUtils } from './map-as-wrapper';
import { Selectors } from './select';
import { TypeUtils } from './type';
import { WrapperUtils } from './wrapper';

/**
 * @map-as
 *
 * @stable [27.07.2020]
 * @param entity
 */
const mapHolderQueryFilterEntityAsQuery = (entity: IReduxQueryFilterHolderEntity): IQueryWrapper =>
  MapAsWrapperUtils.query(Selectors.queryFilterEntityQuery(entity));

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
 * @returns {TEntity}
 */
const mapExtendedFormEntityAsFinalEntity = <TEntity = IEntity>(formEntity: IReduxFormEntity<TEntity>,
                                                               entity?: TEntity): TEntity =>
  MapAsUtils.entityAsExtendedFormEntity(formEntity, entity).entity;

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
      () => MapAsOriginalUtils.pagedEntity({
        page: entity.lockPage ? entity.page : FIRST_PAGE,  // lockPage <=> backward, forward, last, first
        pageSize,
      }),
      UNDEF_SYMBOL
    );

/**
 * @mapper
 * @stable [09.05.2020]
 * @param {IReduxListHolderEntity} entity
 * @param {number} pageSize
 * @returns {IReduxPagedEntity}
 */
const mapListEntityAsPagedEntity = (entity: IReduxListHolderEntity, pageSize = DEFAULT_PAGE_SIZE): IReduxPagedEntity =>
  mapPaginatedEntityAsPagedEntity(Selectors.list(entity), pageSize);

/**
 * @mapper
 * @stable [10.05.2020]
 * @param {IReduxPrimaryFilterFormEntity<TEntity>} formEntity
 * @param {TEntity} entity
 * @returns {TEntity}
 */
const mapPrimaryFilterEntityAsFinalEntity = <TEntity = IEntity>(formEntity: IReduxPrimaryFilterFormEntity<TEntity>,
                                                                entity?: TEntity): TEntity =>
  mapExtendedFormEntityAsFinalEntity(Selectors.primaryFilter(formEntity), entity);

/**
 * @mapper
 * @stable [10.05.2020]
 * @param {IReduxSecondaryFilterFormEntity<TEntity>} formEntity
 * @param {TEntity} entity
 * @returns {TEntity}
 */
const mapSecondaryFilterEntityAsFinalEntity = <TEntity = IEntity>(formEntity: IReduxSecondaryFilterFormEntity<TEntity>,
                                                                  entity?: TEntity): TEntity =>
  mapExtendedFormEntityAsFinalEntity(Selectors.secondaryFilter(formEntity), entity);

/**
 * @mapper
 * @stable [10.05.2020]
 * @param {IReduxPrimaryFilterFormEntity<TEntity>} wrapper
 * @param {TEntity} entity
 * @returns {IPrimaryFilterExtendedFormEntity<TEntity>}
 */
const mapPrimaryFilterEntityAsPrimaryFilterExtendedFormEntity =
  <TEntity = IEntity>(wrapper: IReduxPrimaryFilterFormEntity<TEntity>,
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
      MapAsUtils.entityAsExtendedFormEntity(formEntity, entity)
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
      MapAsUtils.entityAsExtendedFormEntity(formEntity, entity)
    );

/**
 * @mapper
 * @stable [10.05.2020]
 * @param {IReduxSecondaryFilterFormEntity<TEntity>} wrapper
 * @param {TEntity} entity
 * @returns {ISecondaryFilterExtendedFormEntity<TEntity>}
 */
const mapSecondaryFilterEntityAsSecondaryFilterExtendedFormEntity =
  <TEntity = IEntity>(wrapper: IReduxSecondaryFilterFormEntity<TEntity>,
                      entity?: TEntity): ISecondaryFilterExtendedFormEntity<TEntity> =>
    mapEntityAsSecondaryFilterExtendedFormEntity(Selectors.secondaryFilter(wrapper), entity);

/**
 * @mapper
 * @stable [10.05.2020]
 * @param wrapper
 * @param cfg
 */
const mapFullSearchFilter =
  <TFilter, TEntity = IEntity>(wrapper: IReduxQueryFilterHolderEntity & IReduxListHolderEntity<TEntity>,
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
  public static readonly fullSearchFilter = mapFullSearchFilter;                                                                                  /* stable [10.05.2020] */
  public static readonly holderQueryFilterEntityAsQuery = mapHolderQueryFilterEntityAsQuery;                                                      /* stable [27.07.2020] */
  public static readonly listEntityAsPagedEntity = mapListEntityAsPagedEntity;                                                                    /* stable [09.05.2020] */
  public static readonly optionEntitiesAsSelectOptionEntities = mapOptionEntitiesAsSelectOptionEntities;                                          /* stable [19.05.2020] */
  public static readonly primaryFilterEntityAsPrimaryFilterExtendedFormEntity = mapPrimaryFilterEntityAsPrimaryFilterExtendedFormEntity;          /* stable [10.05.2020] */
  public static readonly secondaryFilterEntityAsSecondaryFilterExtendedFormEntity = mapSecondaryFilterEntityAsSecondaryFilterExtendedFormEntity;  /* stable [10.05.2020] */
}
