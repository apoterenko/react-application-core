import * as R from 'ramda';

import { ConditionUtils } from './cond';
import { TypeUtils } from './type';
import {
  FieldConstants,
  IPlaceEntity,
  PlaceEntityValueT,
} from '../definition';
import { FilterUtils } from './filter';
import { JoinUtils } from './join';

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
export const asPlaceEntity = (place: google.maps.GeocoderResult | google.maps.places.PlaceResult): IPlaceEntity => {
  if (!Array.isArray(place.address_components)) {
    return null;
  }
  return {
    ...ConditionUtils.ifNotNilThanValue(
      place.geometry,
      (geometry) => ({
        lat: geometry.location.lat(),
        lng: geometry.location.lng(),
      })
    ),
    placeId: place.place_id,
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

/**
 * @stable [17.05.2020]
 * @param {IPlaceEntity} placeEntity
 * @returns {string}
 */
const formatPlaceEntity = (placeEntity: IPlaceEntity): string =>
  JoinUtils.join(
    FilterUtils.notEmptyValuesArrayFilter(
      ...[
        `${placeEntity.streetNumber || ''} ${placeEntity.street || ''}`,
        placeEntity.city,
        placeEntity.region,
        placeEntity.country
      ].map((v) => (v || '').trim())
    ),
    ', '
  );

/**
 * @stable [17.05.2020]
 * @param {PlaceEntityValueT} placeEntity
 * @param {(placeEntity: IPlaceEntity) => string} placeEntityFormatter
 * @returns {string}
 */
const fromPlaceEntityToDisplayValue = (placeEntity: PlaceEntityValueT,
                                       placeEntityFormatter = formatPlaceEntity): string => {
  if (R.isNil(placeEntity)) {
    return placeEntity;
  }
  if (TypeUtils.isPrimitive(placeEntity)) {
    return placeEntity as string;
  }
  const placeEntityAsObject = placeEntity as IPlaceEntity;

  return placeEntityFormatter(placeEntityAsObject)
    || placeEntityAsObject.formattedName
    || FieldConstants.DISPLAY_EMPTY_VALUE;
};

/**
 * @stable [17.05.2020]
 */
export class PlaceUtils {
  public static formatPlaceEntity = formatPlaceEntity;                                             /* @stable [17.05.2020] */
  public static fromPlaceEntityToDisplayValue = fromPlaceEntityToDisplayValue;                     /* @stable [17.05.2020] */
}
