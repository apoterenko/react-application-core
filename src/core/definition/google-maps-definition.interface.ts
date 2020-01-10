import {
  IItemWrapper,
  IMarkerWrapper,
  IPointsWrapper,
  IRefreshMapWrapper,
  IVisibleWrapper,
  IZoomWrapper,
} from '../definitions.interface';
import {
  ILatLngEntity,
} from './place-definition.interface';
import { IMenuItemEntity } from './menu-definition.interface';
import { IXYEntity } from './xy-definition.interface';

/**
 * @stable [09.01.2020]
 */
export interface IGoogleMapsMenuItemEntity
  extends IItemWrapper<IMenuItemEntity>,
    ILatLngEntity {
}

/**
 * @stable [09.01.2020]
 */
export interface IGoogleMapsMarkerConfigEntity
  extends ILatLngEntity,
    IMarkerWrapper<string | google.maps.Marker>,
    IRefreshMapWrapper,
    IVisibleWrapper,
    IZoomWrapper {
}

/**
 * @stable [09.01.2020]
 */
export interface IGoogleMapsHeatMapLayerConfigEntity
  extends IPointsWrapper<ILatLngEntity[]>,
    IRefreshMapWrapper,
    IZoomWrapper {
}

/**
 * @stable [10.01.2020]
 */
export interface IGoogleMapsOpenMenuContextEntity
  extends ILatLngEntity,
    IXYEntity {
}

/**
 * @stable [09.01.2020]
 */
export interface IGoogleMaps {
  addHeatMapLayer(cfg: IGoogleMapsHeatMapLayerConfigEntity): void;
  addMarker(cfg?: google.maps.MarkerOptions, name?: string): google.maps.Marker;
  setMarkerState(cfg: IGoogleMapsMarkerConfigEntity): void;
}
