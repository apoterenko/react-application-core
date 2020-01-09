import { ifNotNilThanValue } from './cond';
import { IPlaceEntity } from '../definition';
import { join } from './join';
import { UNDEF_SYMBOL } from '../definitions.interface';

/**
 * @stable [01.08.2018]
 * @param {IPlaceEntity} placeEntity
 * @returns {string}
 */
export const asPlaceEntityFormattedName = (placeEntity: IPlaceEntity): string =>
  ifNotNilThanValue(
    placeEntity,
    () => join([
      join([placeEntity.streetNumber, placeEntity.street], ' '),
      placeEntity.city,
      placeEntity.region,
      placeEntity.country
    ], ', ') || placeEntity.formattedName,
  );

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
 * @stable [10.01.2020]
 * @param {IPlaceEntity} placeEntity
 * @returns {string}
 */
export const asPlaceParameter = (placeEntity: IPlaceEntity): string =>
  ifNotNilThanValue(
    placeEntity,
    () => placeEntity.formattedName,
    UNDEF_SYMBOL
  );

/**
 * @stable [04.08.2018]
 * @param {google.maps.GeocoderResult | google.maps.places.PlaceResult} place
 * @returns {IPlaceEntity}
 */
export const asPlaceEntity = (place: google.maps.GeocoderResult | google.maps.places.PlaceResult): IPlaceEntity => {
  if (!Array.isArray(place.address_components)) {
    return null;
  }
  return {
    ...ifNotNilThanValue(place.geometry, (geometry) => ({lat: geometry.location.lat(), lng: geometry.location.lng()})),
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
