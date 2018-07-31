import * as Promise from 'bluebird';
import { injectable } from 'inversify';

import { getGoogleMapsScript } from '../../util';
import { IGeoCoder } from './geocoder.interface';

@injectable()
export class GeoCoder implements IGeoCoder {
  private geocoder: google.maps.Geocoder;

  /**
   * @stable [30.07.2018]
   * @param {google.maps.GeocoderRequest} request
   * @returns {Bluebird<google.maps.GeocoderResult[]>}
   */
  public geocode(request: google.maps.GeocoderRequest): Promise<google.maps.GeocoderResult[]> {
    return this.getScriptPromise().then(() => new Promise((resolve) => {
      this.geocoder.geocode(
        request,
        (geocoderResults: google.maps.GeocoderResult[]) => resolve(geocoderResults)
      );
    }));
  }

  /**
   * @stable [30.07.2018]
   * @returns {Bluebird<void>}
   */
  private getScriptPromise(): Promise<void> {
    return getGoogleMapsScript().then(() => this.initGoogleMapsObjects());
  }

  /**
   * @stable [30.07.2018]
   */
  private initGoogleMapsObjects(): void {
    this.geocoder = new google.maps.Geocoder();
  }
}
