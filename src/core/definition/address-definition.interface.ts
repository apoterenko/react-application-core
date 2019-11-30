import {
  IAreaWrapper,
  ICityWrapper,
  ICountryWrapper,
  ILatWrapper,
  ILngWrapper,
  IPlaceEntityWrapper,
  IPlaceIdWrapper,
  IRegionWrapper,
  IStreetNumberWrapper,
  IStreetWrapper,
  IZipCodeWrapper,
} from '../definitions.interface';

/**
 * @stable [04.03.2019]
 */
export interface ILatLngEntity
  extends ILatWrapper,
    ILngWrapper {
}

/**
 * @stable [26.08.2019]
 */
export interface IPlaceEntity<TCity = string>
  extends IAreaWrapper,
    ICityWrapper<TCity>,
    ICountryWrapper,
    IRegionWrapper,
    IStreetNumberWrapper,
    IStreetWrapper,
    IZipCodeWrapper {
}

/**
 * @stable [26.11.2019]
 */
export interface IChangePlacePayloadEntity
  extends ILatLngEntity,
    IPlaceIdWrapper,
    IPlaceEntityWrapper<IPlaceEntity> {
}
