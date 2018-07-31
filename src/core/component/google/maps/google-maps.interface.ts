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
} from '../../../definitions.interface';
import { IMenuItemEntity, IComponent } from '../../../entities-definitions.interface';

/**
 * @stable [31.07.2018]
 */
export interface IGoogleMapsSelectEntity extends IItemWrapper<IMenuItemEntity>,
                                                 ILatWrapper,
                                                 ILngWrapper {
}

/**
 * @stable [31.07.2018]
 */
export interface IGoogleMapsMarkerChangePlaceEntity extends ILatWrapper,
                                                            ILngWrapper,
                                                            INameWrapper,
                                                            IItemWrapper<google.maps.Marker> {
}

/**
 * @stable [31.07.2018]
 */
export interface IGoogleMapsProps extends IComponentProps,
                                          IOnSelectWrapper<IGoogleMapsSelectEntity>,
                                          IOptionsWrapper<IMenuItemEntity[]>,
                                          IOnInitWrapper,
                                          IOnChangePlaceWrapper<IGoogleMapsMarkerChangePlaceEntity> {
}

/**
 * @stable [31.07.2018]
 */
export interface IGoogleMaps extends IComponent {
  addMarker(cfg?: google.maps.MarkerOptions, name?: string): google.maps.Marker;
  setMarkerState(marker: string | google.maps.Marker,
                 markerVisibility: boolean,
                 refreshMap: boolean,
                 lat?: number,
                 lng?: number,
                 zoom?: number): void;
}
