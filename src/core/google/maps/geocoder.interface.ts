import * as Promise from 'bluebird';

/**
 * @stable [30.07.2018]
 */
export interface IGeoCoder {
  geocode(request: google.maps.GeocoderRequest): Promise<google.maps.GeocoderResult[]>;
}
