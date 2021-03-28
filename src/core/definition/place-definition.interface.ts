import * as BPromise from 'bluebird';

import {
  IAreaWrapper,
  ICityWrapper,
  ICountryWrapper,
  IFormattedNameWrapper,
  ILatWrapper,
  ILngWrapper,
  IPlaceEntityWrapper,
  IPlaceIdWrapper,
  IQueryWrapper,
  IRegionWrapper,
  IStreetNumberWrapper,
  IStreetWrapper,
  IZipCodeWrapper,
} from '../definitions.interface';
import { INamedEntity } from './entity-definition.interface';

/**
 * @entity
 * @stable [28.03.2021]
 */
export interface ILatLngEntity
  extends ILatWrapper,
    ILngWrapper {
}

/**
 * @entity
 * @stable [28.03.2021]
 */
export interface ISimplePlaceEntity
  extends INamedEntity {
}

/**
 * @api-request
 * @stable [28.03.2021]
 */
export interface ISearchPlacesApiRequest
  extends ICountryWrapper,
    IQueryWrapper {
}

/**
 * @api-request
 * @stable [28.03.2021]
 */
export interface IPlaceGeoCodeApiRequest
  extends ICountryWrapper,
    ILatLngEntity,
    IPlaceIdWrapper {
}

/**
 * @entity
 * @stable [28.03.2021]
 */
export interface IPlaceEntity<TCity = string>
  extends IAreaWrapper,
    ICityWrapper<TCity>,
    ICountryWrapper,
    IFormattedNameWrapper,
    ILatLngEntity,
    IPlaceIdWrapper,
    IRegionWrapper,
    IStreetNumberWrapper,
    IStreetWrapper,
    IZipCodeWrapper {
}

/**
 * @stable [28.03.2021]
 */
export type PlaceEntityValueT = IPlaceEntity | string;

/**
 * @wrapper-entity
 * @stable [28.03.2021]
 */
export interface IPlaceEntityWrapperEntity<TCity = string>
  extends IPlaceEntityWrapper<IPlaceEntity<TCity>> {
}

/**
 * @service
 * @stable [28.03.2021]
 */
export interface IPlaceApi {
  getPlaceGeoCode(request: IPlaceGeoCodeApiRequest): BPromise<IPlaceEntity[]>;
  searchPlaces(request: ISearchPlacesApiRequest): BPromise<ISimplePlaceEntity[]>;
}
