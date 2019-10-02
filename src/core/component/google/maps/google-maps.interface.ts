import { IComponentProps } from '../../../definition';
import {
  IItemWrapper,
  IMarkerWrapper,
  IMenuOptionsWrapper,
  INameWrapper,
  IOnChangePlaceWrapper,
  IOnClickWrapper,
  IOnInitWrapper,
  IOnSelectWrapper,
  IOptionsWrapper,
  IPointsWrapper,
  IRefreshMapWrapper,
  IVisibleWrapper,
  IZoomWrapper,
} from '../../../definitions.interface';
import {
  IComponent,
  ILatLngEntity,
  IMenuItemEntity,
} from '../../../definition';

/**
 * @stable [31.07.2018]
 */
export interface IGoogleMapsSelectEntity
  extends IItemWrapper<IMenuItemEntity>,
    ILatLngEntity {
}

/**
 * @stable [31.07.2018]
 */
export interface IGoogleMapsMarkerChangePlaceEntity
  extends ILatLngEntity,
    INameWrapper,
    IItemWrapper<google.maps.Marker> {
}

/**
 * @stable [04.03.2019]
 */
export enum GoogleMapsMapTypeEnum {
  HYBRID,
  ROADMAP,
  SATELLITE,
  TERRAIN,
}

/**
 * @stable [31.07.2018]
 */
export interface IGoogleMapsProps
  extends IComponentProps,
    IMenuOptionsWrapper<IMenuItemEntity[]>,
    IOnSelectWrapper<(item: IGoogleMapsSelectEntity) => void>,
    IOptionsWrapper<google.maps.MapOptions>,
    IOnInitWrapper,
    IOnChangePlaceWrapper<IGoogleMapsMarkerChangePlaceEntity>,
    IOnClickWrapper<(payload: IGoogleMapsClickPayloadEntity) => void> {
}

/**
 * @stable [03.03.2019]
 */
export interface IGoogleMapsClickPayloadEntity {
  pixel?: google.maps.Point;
  latLng?: google.maps.LatLng;
}

/**
 * @stable [23.02.2019]
 */
export interface IGoogleMapsMarkerConfigEntity
  extends ILatLngEntity,
    IRefreshMapWrapper,
    IVisibleWrapper,
    IZoomWrapper,
    IMarkerWrapper<string | google.maps.Marker> {
}

/**
 * @stable [05.03.2019]
 */
export interface IGoogleMapsHeatMapLayerConfigEntity
  extends IPointsWrapper<ILatLngEntity[]>,
    IRefreshMapWrapper,
    IZoomWrapper {
}

/**
 * @stable [31.07.2018]
 */
export interface IGoogleMaps extends IComponent {
  addMarker(cfg?: google.maps.MarkerOptions, name?: string): google.maps.Marker;
  setMarkerState(cfg: IGoogleMapsMarkerConfigEntity): void;
  addHeatMapLayer(cfg: IGoogleMapsHeatMapLayerConfigEntity): void;
}
