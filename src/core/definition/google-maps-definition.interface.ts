import {
  EntityIdT,
  IElementWrapper,
  IEventWrapper,
  IGoogleMapsConfigurationWrapper,
  IInitialMarkersWrapper,
  IItemWrapper,
  IMarkerIdWrapper,
  IMarkerWrapper,
  IMenuOptionsWrapper,
  IMultiWrapper,
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
  IScaledSizeWrapper,
  ISizeWrapper,
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
    IScaledSizeWrapper<number[]>,
    ISizeWrapper<number[]>,
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
 * @stable [11.06.2021]
 */
export interface IGoogleMapsAddOverlayConfigEntity {
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
 * @stable [10.01.2020]
 */
export interface IGoogleMapsMenuContextEntity
  extends IEventWrapper,
    ILatLngEntity {
}

/**
 * @framework-entity
 * @stable [16.06.2021]
 */
export interface IGoogleMapsFrameworkEventEntity {
  domEvent?: MouseEvent;
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
 * @config-entity
 * @stable [16.06.2021]
 */
export interface IGoogleMapsMarkerEventContextConfigEntity
  extends IElementWrapper<HTMLElement>,
    IEventWrapper<IGoogleMapsFrameworkEventEntity>,
    ILatLngEntity,
    IMarkerIdWrapper,
    IMarkerWrapper<google.maps.Marker>,
    IMultiWrapper,
    INameWrapper {
}

/**
 * @presets-entity
 * @stable [18.05.2020]
 */
export interface IPresetsGoogleMapsEntity
  extends IInitialMarkersWrapper<google.maps.MarkerOptions[]>,
    IMenuOptionsWrapper<IPresetsMenuItemEntity[]>,
    IOnClickWrapper<IGoogleMapsFrameworkEventEntity>,
    IOnInitWrapper,
    IOnMarkerClickWrapper<IGoogleMapsMarkerEventContextConfigEntity>,
    IOnMarkerDragEndWrapper<IGoogleMapsMarkerEventContextConfigEntity>,
    IOnMarkerDragStartWrapper<IGoogleMapsMarkerEventContextConfigEntity>,
    IOnMarkerEnterWrapper<IGoogleMapsMarkerEventContextConfigEntity>,
    IOnMarkerLeaveWrapper<IGoogleMapsMarkerEventContextConfigEntity>,
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
  addOverlay(cfg?: IGoogleMapsAddOverlayConfigEntity): void;
  addPolyline(polylineCfg: google.maps.PolylineOptions, id?: EntityIdT): google.maps.Polyline;
  fitBoundByMarkers(minCount?: number): void;
  fitBounds(bounds: google.maps.LatLngBounds | google.maps.LatLngBoundsLiteral, padding?: number | google.maps.Padding): void;
  makeLatLng(lat: number, lng: number): google.maps.LatLng;
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
