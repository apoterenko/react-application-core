import {
  IExtendedEntity,
  IExtendedFormEntity,
  IPresetsSelectOptionEntity,
  IReduxActiveValueHolderEntity,
  IReduxChannelEntity,
  IReduxChannelHolderEntity,
  IReduxDictionariesEntity,
  IReduxDictionariesHolderEntity,
  IReduxFormHolderEntity,
  IReduxLayoutEntity,
  IReduxLayoutHolderEntity,
  IReduxLifeCycleEntity,
  IReduxListHolderEntity,
  IReduxNotificationEntity,
  IReduxNotificationHolderEntity,
  IReduxPagedEntity,
  IReduxPaginatedEntity,
  IReduxPaginatedLifeCycleEntity,
  IReduxQueryFilterEntity,
  IReduxQueryFilterHolderEntity,
  IReduxStackEntity,
  IReduxStackHolderEntity,
  IReduxStoreEntity,
  IReduxTabPanelEntity,
  IReduxTabPanelHolderEntity,
  IReduxTransportEntity,
  IReduxTransportHolderEntity,
  IReduxUserEntity,
  IReduxUserHolderEntity,
} from '../definition';
import { Selectors } from './select';
import { MapAsWrapperUtils } from './map-as-wrapper';
import {
  IEntity,
  IProgressWrapper,
  ISectionNameWrapper, UNDEF_SYMBOL,
} from '../definitions.interface';
import { FilterUtils } from './filter';
import { ConditionUtils } from './cond';

/**
 * @map-as-original
 *
 * @stable [02.08.2020]
 * @param entity
 */
const mapSelectOptionEntity = <TValue = IEntity>(entity: IPresetsSelectOptionEntity<TValue>): IPresetsSelectOptionEntity<TValue> =>
  ConditionUtils.ifNotNilThanValue(
    entity,
    () => FilterUtils.defValuesFilter<IPresetsSelectOptionEntity<TValue>, IPresetsSelectOptionEntity<TValue>>({
      disabled: entity.disabled,
      label: entity.label,
      rawData: entity.rawData,
      value: entity.value,
    }),
    UNDEF_SYMBOL
  );

/**
 * @map-as-original
 *
 * @stable [31.07.2020]
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
 * @param extendedEntity
 */
const mapExtendedEntity = <TEntity = IEntity>(extendedEntity: IExtendedEntity<TEntity>): IExtendedEntity<TEntity> =>
  ConditionUtils.ifNotNilThanValue(
    extendedEntity,
    () => FilterUtils.defValuesFilter<IExtendedEntity<TEntity>, IExtendedEntity<TEntity>>({
      changes: extendedEntity.changes,
      entity: extendedEntity.entity,
      entityId: extendedEntity.entityId,
      newEntity: extendedEntity.newEntity,
      originalEntity: extendedEntity.originalEntity,
    }),
    UNDEF_SYMBOL
  );

/**
 * @map-as-original
 *
 * @stable [31.07.2020]
 * @param entity
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
 * @stable [31.07.2020]
 * @param entity
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
 * @map-as-original
 *
 * @stable [31.07.2020]
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
 * @stable [29.07.2020]
 * @param entity
 */
const mapTabPanelHolderEntity =
  <TEntity = IReduxTabPanelEntity>(entity: IReduxTabPanelHolderEntity<TEntity>): IReduxTabPanelHolderEntity<TEntity> =>
    MapAsWrapperUtils.tabPanel(Selectors.tabPanel(entity));

/**
 * @map-as-original
 *
 * @stable [30.07.2020]
 * @param entity
 */
const mapActiveValueHolderEntity = (entity: IReduxActiveValueHolderEntity): IReduxActiveValueHolderEntity =>
  MapAsWrapperUtils.activeValue(Selectors.activeValue(entity));

/**
 * @map-as-original
 *
 * @stable [31.07.2020]
 * @param entity
 */
const mapPaginatedLifeCycleEntity = (entity: IReduxPaginatedLifeCycleEntity): IReduxPaginatedLifeCycleEntity => ({
  ...mapLifeCycleEntity(entity),
  ...mapPaginatedEntity(entity),
});

/**
 * @map-as-original
 *
 * @stable [31.07.2020]
 * @param entity
 */
const mapQueryFilterHolderEntity = (entity: IReduxQueryFilterHolderEntity): IReduxQueryFilterHolderEntity =>
  MapAsWrapperUtils.queryFilter(Selectors.queryFilter(entity));

/**
 * @map-as-original
 *
 * @stable [31.07.2020]
 * @param wrapper
 */
const mapUserHolderEntity =
  <TEntity = IReduxUserEntity>(wrapper: IReduxUserHolderEntity<TEntity>): IReduxUserHolderEntity<TEntity> =>
    MapAsWrapperUtils.user(Selectors.user(wrapper));

/**
 * @map-as-original
 *
 * @stable [31.07.2020]
 * @param wrapper
 */
const mapStackHolderEntity =
  <TEntity = IReduxStackEntity>(wrapper: IReduxStackHolderEntity<TEntity>): IReduxStackHolderEntity<TEntity> =>
    MapAsWrapperUtils.stack(Selectors.stack(wrapper));

/**
 * @map-as-original
 *
 * @stable [26.07.2020]
 * @param wrapper
 */
const mapSectionNameWrapper = (wrapper: ISectionNameWrapper): ISectionNameWrapper =>
  MapAsWrapperUtils.sectionName(Selectors.sectionName(wrapper));

/**
 * @map-as-original
 *
 * @stable [10.08.2020]
 * @param wrapper
 */
const mapProgressWrapper = (wrapper: IProgressWrapper): IProgressWrapper =>
  MapAsWrapperUtils.progress(Selectors.progress(wrapper));

/**
 * @map-as-original
 *
 * @stable [30.07.2020]
 * @param entity
 */
const mapFormHolderEntity = <TEntity = IEntity>(entity: IReduxFormHolderEntity<TEntity>): IReduxFormHolderEntity<TEntity> =>
  MapAsWrapperUtils.form(Selectors.form(entity));

/**
 * @map-as-original
 *
 * @stable [31.07.2020]
 * @param wrapper
 */
const mapLayoutHolderEntity =
  <TEntity = IReduxLayoutEntity>(wrapper: IReduxLayoutHolderEntity<TEntity>): IReduxLayoutHolderEntity<TEntity> =>
    MapAsWrapperUtils.layout(Selectors.layout(wrapper));

/**
 * @map-as-original
 *
 * @stable [31.07.2020]
 * @param entity
 */
const mapChannelHolderEntity =
  <TEntity = IReduxChannelEntity>(entity: IReduxChannelHolderEntity<TEntity>): IReduxChannelHolderEntity<TEntity> =>
    MapAsWrapperUtils.channel(Selectors.channel(entity));

/**
 * @map-as-original
 *
 * @stable [31.07.2020]
 * @param wrapper
 */
const mapDictionariesHolderEntity =
  <TEntity = IReduxDictionariesEntity>(wrapper: IReduxDictionariesHolderEntity<TEntity>): IReduxDictionariesHolderEntity<TEntity> =>
    MapAsWrapperUtils.dictionaries(Selectors.dictionaries(wrapper));

/**
 * @map-as-original
 *
 * @stable [30.07.2020]
 * @param entity
 */
const mapNotificationHolderEntity =
  <TEntity = IReduxNotificationEntity>(entity: IReduxNotificationHolderEntity<TEntity>): IReduxNotificationHolderEntity<TEntity> =>
    MapAsWrapperUtils.notification(Selectors.notification(entity));

/**
 * @map-as-original
 *
 * @stable [31.07.2020]
 * @param entity
 */
const mapTransportHolderEntity =
  <TEntity = IReduxTransportEntity>(entity: IReduxTransportHolderEntity<TEntity>): IReduxTransportHolderEntity<TEntity> =>
    MapAsWrapperUtils.transport(Selectors.transport(entity));

/**
 * @map-as-original
 *
 * @stable [31.07.2020]
 * @param entity
 */
const mapListHolderEntity = (entity: IReduxListHolderEntity): IReduxListHolderEntity => MapAsWrapperUtils.list(Selectors.list(entity));

/**
 * @map-as-original
 *
 * @stable [01.08.2020]
 * @param form
 */
const mapExtendedFormEntity = <TEntity = IEntity>(form: IExtendedFormEntity<TEntity>): IExtendedFormEntity<TEntity> => ({
  ...mapExtendedEntity(form),
  ...mapFormHolderEntity(form),
});

/**
 * @map-as-original
 *
 * @stable [31.07.2020]
 * @param entity
 */
const mapStoreBaseEntity =
  <TDictionaries = {}>(entity: IReduxStoreEntity<TDictionaries>): IReduxStoreEntity<TDictionaries> =>
    ({
      ...mapChannelHolderEntity(entity),
      ...mapDictionariesHolderEntity(entity),
      ...mapNotificationHolderEntity(entity),
      ...mapTransportHolderEntity(entity),
    });

/**
 * @map-as-original
 *
 * @stable [31.07.2020]
 * @param entity
 */
const mapStoreEntity =
  <TDictionaries = {}>(entity: IReduxStoreEntity<TDictionaries>): IReduxStoreEntity<TDictionaries> =>
    ({
      ...mapStoreBaseEntity(entity),
      ...mapLayoutHolderEntity(entity),
      ...mapStackHolderEntity(entity),
      ...mapUserHolderEntity(entity),
    });

/**
 * @stable [27.07.2020]
 */
export class MapAsOriginalUtils {
  public static readonly activeValueHolderEntity = mapActiveValueHolderEntity;
  public static readonly extendedEntity = mapExtendedEntity;
  public static readonly extendedFormEntity = mapExtendedFormEntity;
  public static readonly formHolderEntity = mapFormHolderEntity;
  public static readonly listHolderEntity = mapListHolderEntity;
  public static readonly pagedEntity = mapPagedEntity;
  public static readonly paginatedEntity = mapPaginatedEntity;
  public static readonly paginatedLifeCycleEntity = mapPaginatedLifeCycleEntity;
  public static readonly progressWrapper = mapProgressWrapper;
  public static readonly queryFilterEntity = mapQueryFilterEntity;
  public static readonly queryFilterHolderEntity = mapQueryFilterHolderEntity;
  public static readonly sectionNameWrapper = mapSectionNameWrapper;
  public static readonly selectOptionEntity = mapSelectOptionEntity;
  public static readonly storeBaseEntity = mapStoreBaseEntity;
  public static readonly storeEntity = mapStoreEntity;
  public static readonly tabPanelHolderEntity = mapTabPanelHolderEntity;
}
