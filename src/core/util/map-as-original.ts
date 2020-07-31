import {
  IExtendedEntity,
  IReduxActiveValueHolderEntity,
  IReduxChannelEntity,
  IReduxChannelHolderEntity,
  IReduxDictionariesEntity,
  IReduxDictionariesHolderEntity,
  IReduxFormHolderEntity,
  IReduxLayoutEntity,
  IReduxLayoutHolderEntity,
  IReduxNotificationEntity,
  IReduxNotificationHolderEntity,
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
  ISectionNameWrapper,
} from '../definitions.interface';
import { FilterUtils } from './filter';

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
 * @map-as-original
 *
 * @stable [31.07.2020]
 * @param entity
 */
const mapStoreEntity =
  <TDictionaries = {}>(entity: IReduxStoreEntity<TDictionaries>): IReduxStoreEntity<TDictionaries> =>
    ({
      ...mapChannelHolderEntity(entity),
      ...mapDictionariesHolderEntity(entity),
      ...mapLayoutHolderEntity(entity),
      ...mapNotificationHolderEntity(entity),
      ...mapStackHolderEntity(entity),
      ...mapTransportHolderEntity(entity),
      ...mapUserHolderEntity(entity),
    });

/**
 * @stable [27.07.2020]
 */
export class MapAsOriginalUtils {
  public static readonly activeValueHolderEntity = mapActiveValueHolderEntity;
  public static readonly extendedEntity = mapExtendedEntity;
  public static readonly formHolderEntity = mapFormHolderEntity;
  public static readonly sectionNameWrapper = mapSectionNameWrapper;
  public static readonly stackHolderEntity = mapStackHolderEntity;
  public static readonly storeEntity = mapStoreEntity;
  public static readonly tabPanelHolderEntity = mapTabPanelHolderEntity;
  public static readonly transportHolderEntity = mapTransportHolderEntity;
  public static readonly userHolderEntity = mapUserHolderEntity;
}
