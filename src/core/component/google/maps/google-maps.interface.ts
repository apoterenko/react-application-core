import { IComponentProps } from '../../../props-definitions.interface';
import {
  IOnInitWrapper,
  IOptionsWrapper,
  IOnSelectWrapper,
  IItemWrapper,
  ILatWrapper,
  ILngWrapper,
  IOnChangePlaceWrapper,
  INameWrapper,
  IMenuOptionsWrapper,
  IOnClickWrapper,
} from '../../../definitions.interface';
import {
  IMenuItemEntity,
  IComponent,
} from '../../../entities-definitions.interface';
import { ILatLngEntity } from '../../../definition';

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
    IOnSelectWrapper<IGoogleMapsSelectEntity>,
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
  extends ILatWrapper,
    ILngWrapper {
  refreshMap?: boolean;
  visible?: boolean;
  marker?: string | google.maps.Marker;
  zoom?: number;
}

/**
 * @stable [31.07.2018]
 */
export interface IGoogleMaps extends IComponent {
  addMarker(cfg?: google.maps.MarkerOptions, name?: string): google.maps.Marker;
  setMarkerState(cfg: IGoogleMapsMarkerConfigEntity): void;
  addHeatMapLayer(points: ILatLngEntity[]): void;
}
