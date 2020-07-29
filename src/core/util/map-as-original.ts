import {
  IReduxTabPanelHolderEntity,
  IReduxTabPanelEntity,
} from '../definition';
import { Selectors } from './select';
import { MapAsWrapperUtils } from './map-as-wrapper';

/**
 * @map-as-original
 *
 * @stable [29.07.2020]
 * @param entity
 */
export const mapTabPanelHolderEntity =
  <TEntity = IReduxTabPanelEntity>(entity: IReduxTabPanelHolderEntity<TEntity>): IReduxTabPanelHolderEntity<TEntity> =>
    MapAsWrapperUtils.tabPanel(Selectors.tabPanel(entity));

/**
 * @stable [27.07.2020]
 */
export class MapAsOriginalUtils {
  public static readonly tabPanelHolderEntity = mapTabPanelHolderEntity;
}
