import {
  IExtendedEntity,
  IReduxActiveValueHolderEntity,
  IReduxFormHolderEntity,
  IReduxTabPanelEntity,
  IReduxTabPanelHolderEntity,
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
 * @stable [27.07.2020]
 */
export class MapAsOriginalUtils {
  public static readonly activeValueHolderEntity = mapActiveValueHolderEntity;
  public static readonly extendedEntity = mapExtendedEntity;
  public static readonly formHolderEntity = mapFormHolderEntity;
  public static readonly sectionNameWrapper = mapSectionNameWrapper;
  public static readonly tabPanelHolderEntity = mapTabPanelHolderEntity;
}
