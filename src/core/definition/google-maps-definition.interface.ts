import {
  EntityIdT,
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
  IRefreshWrapper,
  ITrackableWrapper,
  IUrlWrapper,
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
 * @stable [09.06.2021]
 */
export interface IGoogleMapsRefreshMarkerConfigEntity
  extends ILatLngEntity,
    IMarkerWrapper<string | google.maps.Marker>,
    IRefreshWrapper,
    IUrlWrapper,
    IVisibleWrapper,
    IZoomWrapper {
}

/**
 * @config-entity
 * @stable [09.06.2021]
 */
export interface IGoogleMapsAddMarkerConfigEntity
  extends google.maps.MarkerOptions,
    ITrackableWrapper {
}

/**
 * @config-entity
 * @stable [09.01.2020]
 */
export interface IGoogleMapsHeatMapLayerConfigEntity
  extends IPointsWrapper<ILatLngEntity[]>,
    IRefreshWrapper,
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
 * @component
 * @stable [09.01.2020]
 */
export interface IGoogleMaps {
  isInitialized: boolean;
  markers: Map<EntityIdT, google.maps.Marker>;
  addDirectionPolyline(directionCfg: google.maps.DirectionsRequest, polylineCfg: google.maps.PolylineOptions): void;
  addHeatMapLayer(cfg: IGoogleMapsHeatMapLayerConfigEntity): void;
  addMarker(cfg: IGoogleMapsAddMarkerConfigEntity, id?: string): google.maps.Marker;
  addPolyline(polylineCfg: google.maps.PolylineOptions, id?: EntityIdT): google.maps.Polyline;
  fitBounds(bounds: google.maps.LatLngBounds | google.maps.LatLngBoundsLiteral, padding?: number | google.maps.Padding): void;
  makePoint(x: number, y: number): google.maps.Point;
  refreshMarker(cfg: IGoogleMapsRefreshMarkerConfigEntity): void;
  removeMarker(name: EntityIdT): void;
  removePolyLine(name: EntityIdT): void;
}

/**
 * @classes
 * @stable [28.07.2020]
 */
export enum GoogleMapsClassesEnum {
  GOOGLE_MAPS = 'rac-google-maps',
  GOOGLE_MAPS_BODY = 'rac-google-maps__body',
}
