import * as R from 'ramda';

import { IPlaceEntity } from '../entities-definitions.interface';

/**
 * @stable [01.08.2018]
 * @param {IPlaceEntity} placeEntity
 * @returns {string}
 */
export const toAddress = (placeEntity: IPlaceEntity) => {
  if (!R.isNil(placeEntity)) {
    return [
      [placeEntity.streetNumber, placeEntity.street].filter((v) => !!v).join(' '),
      placeEntity.city,
      placeEntity.region,
      placeEntity.country
    ].filter((v) => !!v).join(', ');
  }
  return '';
};

/**
 * @stable [01.08.2018]
 * @param {google.maps.GeocoderAddressComponent} cmp
 * @param {(cmp: google.maps.GeocoderAddressComponent) => TType} extractor
 * @returns {TType}
 */
export const toPlaceDescription = <TType>(cmp: google.maps.GeocoderAddressComponent,
                                          extractor: (cmp: google.maps.GeocoderAddressComponent) => TType): TType =>
  cmp && extractor(cmp);

/**
 * @stable [04.08.2018]
 * @param {google.maps.GeocoderResult | google.maps.places.PlaceResult} place
 * @returns {IPlaceEntity}
 */
export const toPlace = (place: google.maps.GeocoderResult | google.maps.places.PlaceResult): IPlaceEntity => {
  if (!Array.isArray(place.address_components)) {
    return null;
  }
  return {
    country: toPlaceDescription(
      place.address_components.find((addr) => addr.types.includes('country')),
      (cmp: google.maps.GeocoderAddressComponent) => cmp.long_name
    ),
    region: toPlaceDescription(
      place.address_components.find((addr) => addr.types.includes('administrative_area_level_1')),
      (cmp: google.maps.GeocoderAddressComponent) => cmp.long_name
    ),
    area: toPlaceDescription(
      place.address_components.find((addr) => addr.types.includes('administrative_area_level_2')),
      (cmp: google.maps.GeocoderAddressComponent) => cmp.long_name
    ),
    city: toPlaceDescription(
      place.address_components.find((addr) => addr.types.includes('locality')),
      (cmp: google.maps.GeocoderAddressComponent) => cmp.long_name
    ),
    street: toPlaceDescription(
      place.address_components.find((addr) => addr.types.includes('route')),
      (cmp: google.maps.GeocoderAddressComponent) => cmp.long_name
    ),
    streetNumber: toPlaceDescription(
      place.address_components.find((addr) => addr.types.includes('street_number')),
      (cmp: google.maps.GeocoderAddressComponent) => cmp.long_name
    ),
    zipCode: toPlaceDescription(
      place.address_components.find((addr) => addr.types.includes('postal_code')),
      (cmp: google.maps.GeocoderAddressComponent) => cmp.long_name
    ),
  };
};
