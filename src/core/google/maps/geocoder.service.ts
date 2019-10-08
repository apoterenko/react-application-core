import * as Promise from 'bluebird';
import { injectable } from 'inversify';

import { getGoogleMapsScript } from '../../util';
import { IGeoCoder } from './geocoder.interface';
import { DI_TYPES, lazyInject } from '../../di';
import { ISettingsEntity } from '../../settings';

@injectable()
export class GeoCoder implements IGeoCoder {
  @lazyInject(DI_TYPES.Settings) private settings: ISettingsEntity;
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
    return getGoogleMapsScript(this.settings.googleMaps.libraries).then(() => this.initGoogleMapsObjects());
  }

  /**
   * @stable [30.07.2018]
   */
  private initGoogleMapsObjects(): void {
    this.geocoder = new google.maps.Geocoder();
  }
}
