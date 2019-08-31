import {
  IAreaWrapper,
  ICityWrapper,
  ICountryWrapper,
  ILatWrapper,
  ILngWrapper,
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
export interface IPlaceEntity
  extends ICountryWrapper,
    IRegionWrapper,
    IAreaWrapper,
    ICityWrapper,
    IStreetWrapper,
    IStreetNumberWrapper,
    IZipCodeWrapper {
}
