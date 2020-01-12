import { IComponentProps } from '../../../definition';
import {
  IItemWrapper,
  IMenuOptionsWrapper,
  INameWrapper,
  IOnChangePlaceWrapper,
  IOnClickWrapper,
  IOnInitWrapper,
  IOnSelectWrapper,
  IOptionsWrapper,
} from '../../../definitions.interface';
import {
  IGoogleMapsMenuItemEntity,
  ILatLngEntity,
  IMenuItemEntity,
} from '../../../definition';

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
    IOnSelectWrapper<IGoogleMapsMenuItemEntity>,
    IOptionsWrapper<google.maps.MapOptions>,
    IOnInitWrapper,
    IOnChangePlaceWrapper<IGoogleMapsMarkerChangePlaceEntity>,
    IOnClickWrapper<IGoogleMapsClickPayloadEntity> {
}

/**
 * @stable [03.03.2019]
 */
export interface IGoogleMapsClickPayloadEntity {
  pixel?: google.maps.Point;
  latLng?: google.maps.LatLng;
}
