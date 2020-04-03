import {
  IEventWrapper,
  IGoogleMapsConfigurationWrapper,
  IInitialMarkersWrapper,
  IItemWrapper,
  IMarkerWrapper,
  IMenuOptionsWrapper,
  INameWrapper,
  IOnChangePlaceWrapper,
  IOnClickPlaceWrapper,
  IOnClickWrapper,
  IOnInitWrapper,
  IOnSelectWrapper,
  IOptionsWrapper,
  IPointsWrapper,
  IRefreshMapWrapper,
  IVisibleWrapper,
  IZoomWrapper,
} from '../definitions.interface';
import {
  ILatLngEntity,
} from './place-definition.interface';
import { IMenuItemEntity } from './menu-definition.interface';
import { IComponentProps } from './props-definition.interface';

/**
 * @entity
 * @stable [09.01.2020]
 */
export interface IGoogleMapsMenuItemEntity
  extends IItemWrapper<IMenuItemEntity>,
    ILatLngEntity {
}

/**
 * @config-entity
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
 * @config-entity
 * @stable [09.01.2020]
 */
export interface IGoogleMapsHeatMapLayerConfigEntity
  extends IPointsWrapper<ILatLngEntity[]>,
    IRefreshMapWrapper,
    IZoomWrapper {
}

/**
 * @entity
 * @stable [23.01.2020]
 */
export interface IGoogleMapsMarkerPlaceEventEntity
  extends IEventWrapper<IGoogleMapsEventEntity>,
    IItemWrapper<google.maps.Marker>,
    ILatLngEntity,
    INameWrapper {
}

/**
 * @entity
 * @stable [10.01.2020]
 */
export interface IGoogleMapsMenuContextEntity
  extends IEventWrapper,
    ILatLngEntity {
}

/**
 * @external-entity
 * @stable [03.03.2019]
 */
export interface IGoogleMapsEventEntity {
  latLng?: google.maps.LatLng;
  pixel?: google.maps.Point;
}

/**
 * @enum
 * @stable [04.03.2019]
 */
export enum GoogleMapsMapTypesEnum {
  HYBRID,
  ROADMAP,
  SATELLITE,
  TERRAIN,
}

/**
 * @generic-entity
 * @stable [23.01.2020]
 */
export interface IGenericGoogleMapsEntity
  extends IInitialMarkersWrapper<google.maps.MarkerOptions[]>,
    IMenuOptionsWrapper<IMenuItemEntity[]>,
    IOptionsWrapper<google.maps.MapOptions> {
}

/**
 * @behavioral-entity
 * @stable [23.01.2020]
 */
export interface IBehavioralGoogleMapsEntity
  extends IOnChangePlaceWrapper<IGoogleMapsMarkerPlaceEventEntity>,
    IOnClickPlaceWrapper<IGoogleMapsMarkerPlaceEventEntity>,
    IOnClickWrapper<IGoogleMapsEventEntity>,
    IOnInitWrapper,
    IOnSelectWrapper<IGoogleMapsMenuItemEntity> {
}

/**
 * @props
 * @stable [23.01.2020]
 */
export interface IGoogleMapsProps
  extends IComponentProps,
    IGenericGoogleMapsEntity,
    IBehavioralGoogleMapsEntity {
}

/**
 * @configuration-entity
 * @stable [03.04.2020]
 */
export interface IGoogleMapsConfigurationEntity
  extends IGoogleMapsConfigurationWrapper<IGoogleMapsProps> {
}

/**
 * @component
 * @stable [09.01.2020]
 */
export interface IGoogleMaps {
  isInitialized: boolean;
  addDirectionPolyline(directionCfg: google.maps.DirectionsRequest, polylineCfg: google.maps.PolylineOptions): void;
  addHeatMapLayer(cfg: IGoogleMapsHeatMapLayerConfigEntity): void;
  addMarker(cfg?: google.maps.MarkerOptions, name?: string): google.maps.Marker;
  addPolyline(polylineCfg: google.maps.PolylineOptions): google.maps.Polyline;
  fitBounds(bounds: google.maps.LatLngBounds | google.maps.LatLngBoundsLiteral, padding?: number | google.maps.Padding): void;
  getMarkers(): Map<string, google.maps.Marker>;
  refreshMarker(cfg: IGoogleMapsMarkerConfigEntity): void;
  removeMarker(name: string): void;
}
