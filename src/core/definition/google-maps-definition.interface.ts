import {
  IEventWrapper,
  IGoogleMapsConfigurationWrapper,
  IInitialMarkersWrapper,
  IItemWrapper,
  IMarkerWrapper,
  IMenuOptionsWrapper,
  INameWrapper,
  IOnClickWrapper,
  IOnInitWrapper,
  IOnMarkerClickWrapper,
  IOnMarkerDragEndWrapper,
  IOnMarkerDragStartWrapper,
  IOnMarkerEnterWrapper,
  IOnMarkerLeaveWrapper,
  IOnSelectWrapper,
  IOptionsWrapper,
  IPointsWrapper,
  IRefreshMapWrapper,
  ITrackableWrapper,
  IVisibleWrapper,
  IZoomWrapper,
} from '../definitions.interface';
import { ILatLngEntity } from './place-definition.interface';
import { IPresetsMenuItemEntity } from './menu-definition.interface';
import { IGenericComponentProps } from './generic-component-definition.interface';

/**
 * @entity
 * @stable [09.01.2020]
 */
export interface IGoogleMapsMenuItemEntity
  extends IItemWrapper<IPresetsMenuItemEntity>,
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
export interface IGoogleMapsMarkerInfoEntity
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
 * @presets-entity
 * @stable [18.05.2020]
 */
export interface IPresetsGoogleMapsEntity
  extends IInitialMarkersWrapper<google.maps.MarkerOptions[]>,
    IMenuOptionsWrapper<IPresetsMenuItemEntity[]>,
    IOnClickWrapper<IGoogleMapsEventEntity>,
    IOnInitWrapper,
    IOnMarkerClickWrapper<IGoogleMapsMarkerInfoEntity>,
    IOnMarkerDragEndWrapper<IGoogleMapsMarkerInfoEntity>,
    IOnMarkerDragStartWrapper<IGoogleMapsMarkerInfoEntity>,
    IOnMarkerEnterWrapper,
    IOnMarkerLeaveWrapper,
    IOnSelectWrapper<IGoogleMapsMenuItemEntity>,
    IOptionsWrapper<google.maps.MapOptions> {
}

/**
 * @generic-entity
 * @stable [23.01.2020]
 */
export interface IGenericGoogleMapsEntity
  extends IPresetsGoogleMapsEntity {
}

/**
 * @props
 * @stable [23.01.2020]
 */
export interface IGoogleMapsProps
  extends IGenericComponentProps,
    IGenericGoogleMapsEntity {
}

/**
 * @configuration-entity
 * @stable [03.04.2020]
 */
export interface IGoogleMapsConfigurationEntity
  extends IGoogleMapsConfigurationWrapper<IGoogleMapsProps> {
}

/**
 * @config-entity
 * @stable [28.07.2020]
 */
export interface IGoogleMapsMarkerOptionConfigEntity
  extends google.maps.MarkerOptions,
    ITrackableWrapper {
}

/**
 * @component
 * @stable [09.01.2020]
 */
export interface IGoogleMaps {
  isInitialized: boolean;
  addDirectionPolyline(directionCfg: google.maps.DirectionsRequest, polylineCfg: google.maps.PolylineOptions): void;
  addHeatMapLayer(cfg: IGoogleMapsHeatMapLayerConfigEntity): void;
  addMarker(cfg?: IGoogleMapsMarkerOptionConfigEntity, name?: string): google.maps.Marker;
  addPolyline(polylineCfg: google.maps.PolylineOptions): google.maps.Polyline;
  fitBounds(bounds: google.maps.LatLngBounds | google.maps.LatLngBoundsLiteral, padding?: number | google.maps.Padding): void;
  getMarkers(): Map<string, google.maps.Marker>;
  refreshMarker(cfg: IGoogleMapsMarkerConfigEntity): void;
  removeMarker(name: string): void;
}

/**
 * @classes
 * @stable [28.07.2020]
 */
export enum GoogleMapsClassesEnum {
  GOOGLE_MAPS = 'rac-google-maps',
  GOOGLE_MAPS_BODY = 'rac-google-maps__body',
}
