import {
  IReduxActiveValueHolderEntity,
  IReduxTabPanelEntity,
  IReduxTabPanelHolderEntity,
} from '../definition';
import { Selectors } from './select';
import { MapAsWrapperUtils } from './map-as-wrapper';
import { ISectionNameWrapper } from '../definitions.interface';

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
 * @stable [27.07.2020]
 */
export class MapAsOriginalUtils {
  public static readonly activeValueHolderEntity = mapActiveValueHolderEntity;
  public static readonly sectionNameWrapper = mapSectionNameWrapper;
  public static readonly tabPanelHolderEntity = mapTabPanelHolderEntity;
}
