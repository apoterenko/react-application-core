import { injectable } from 'inversify';
import * as BPromise from 'bluebird';

import { ISettingsEntity } from '../../../settings';
import {
  DI_TYPES,
  lazyInject,
} from '../../../di';
import {
  AsyncLibsEnum,
  FieldConverterTypesEnum,
  IAsyncLibManager,
  IFieldConverter,
  IPlaceApi,
  IPlaceEntity,
  IPlaceGeoCodeRequestEntity,
  ISearchPlaceEntity,
  ISearchPlacesRequestEntity,
} from '../../../definition';
import {
  isFn,
  isObjectNotEmpty,
  notNilValuesFilter,
  nvl,
} from '../../../util';
import {
  AnyT,
  IEntityIdTWrapper,
} from '../../../definitions.interface';

@injectable()
export class GooglePlaceApi implements IPlaceApi {
  @lazyInject(DI_TYPES.AsyncLibManager) private readonly asyncLibManager: IAsyncLibManager;
  @lazyInject(DI_TYPES.FieldConverter) private readonly fieldConverter: IFieldConverter;
  @lazyInject(DI_TYPES.Settings) private readonly settings: ISettingsEntity;

  /**
   * @stable [09.01.2020]
   * @param {IPlaceGeoCodeRequestEntity} req
   * @returns {Bluebird<IPlaceEntity[]> | AnyT}
   */
  public getPlaceGeoCode(req: IPlaceGeoCodeRequestEntity): BPromise<IPlaceEntity[]> | AnyT {
    const request: google.maps.GeocoderRequest = {
      location: {lat: req.lat, lng: req.lng},
    };
    return this.makePromise((resolve) => {
      new google.maps.Geocoder()
        .geocode(request, (result) => {
          if (isObjectNotEmpty(result)) {
            const converter = this.fieldConverter.converter({
              from: FieldConverterTypesEnum.GEO_CODER_RESULT,
              to: FieldConverterTypesEnum.PLACE_ENTITY,
            });
            if (isFn(converter)) {
              resolve(result.map(converter));
            } else {
              resolve(result);
            }
          } else {
            resolve([]);
          }
        });
    });
  }

  /**
   * @stable [10.01.2020]
   * @param {ISearchPlacesRequestEntity} request
   * @returns {Bluebird<ISearchPlaceEntity[]> | AnyT}
   */
  public searchPlaces(request: ISearchPlacesRequestEntity): BPromise<ISearchPlaceEntity[]> | AnyT {
    const requestCountry = request.country;
    const {query = ' '} = request;

    const {googleMaps = {}} = this.settings || {};
    const {componentRestrictions = {}} = googleMaps;
    const {country = {}} = componentRestrictions || {};

    return this.makePromise((resolve) => {
      const searchService = new google.maps.places.AutocompleteService();
      searchService.getPlacePredictions(
        notNilValuesFilter({
          componentRestrictions: notNilValuesFilter({country: nvl(requestCountry, country)}),
          input: query,
        }),
        (result: Array<google.maps.places.AutocompletePrediction & IEntityIdTWrapper>) => {
          resolve(
            (result || []).map((entity): ISearchPlaceEntity => ({
              id: entity.id,
              name: entity.description,
              placeId: entity.place_id,
            }))
          );
        },
      );
    });
  }

  /**
   * @stable [10.01.2020]
   * @param {(resolve: (value?: TResult) => void) => void} callback
   * @returns {Bluebird<TResult>}
   */
  private readonly makePromise = <TResult>(callback: (resolve: (value?: TResult) => void) => void): BPromise<TResult> =>
    new BPromise<TResult>((resolve) => (
      this.asyncLibManager
        .loadLib({alias: AsyncLibsEnum.GOOGLE_MAPS})
        .then(() => {
          callback(resolve);
        })
    ))
}
