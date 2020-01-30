import {
  IEventWrapper,
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
export interface IGoogleMapsMarkerChangePlaceEntity
  extends ILatLngEntity,
    INameWrapper,
    IItemWrapper<google.maps.Marker> {
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
export interface IGoogleMapsEventClickPayloadEntity {
  latLng?: google.maps.LatLng;
  pixel?: google.maps.Point;
  tb?: Event;
}

/**
 * @enum
 * @stable [04.03.2019]
 */
export enum GoogleMapsMapTypeEnum {
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
  extends IOptionsWrapper<google.maps.MapOptions>,
    IMenuOptionsWrapper<IMenuItemEntity[]> {
}

/**
 * @behavioral-entity
 * @stable [23.01.2020]
 */
export interface IBehavioralGoogleMapsEntity
  extends IOnChangePlaceWrapper<IGoogleMapsMarkerChangePlaceEntity>,
    IOnClickWrapper<IGoogleMapsEventClickPayloadEntity>,
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
 * @component
 * @stable [09.01.2020]
 */
export interface IGoogleMaps {
  addHeatMapLayer(cfg: IGoogleMapsHeatMapLayerConfigEntity): void;
  addMarker(cfg?: google.maps.MarkerOptions, name?: string): google.maps.Marker;
  setMarkerState(cfg: IGoogleMapsMarkerConfigEntity): void;
}
