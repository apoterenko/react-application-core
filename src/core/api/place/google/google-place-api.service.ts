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
  ISearchPlacesEntity,
} from '../../../definition';
import {
  ifNotNilThanValue,
  isFn,
  isObjectNotEmpty,
  notNilValuesFilter,
  nvl,
} from '../../../util';
import {
  AnyT,
  IEntityIdTWrapper,
  IKeyValue,
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
    const request = notNilValuesFilter<google.maps.GeocoderRequest, google.maps.GeocoderRequest>({
      placeId: req.placeId,
      ...(
        ifNotNilThanValue(
          nvl(req.lat, req.lng),
          () => ({location: {lat: req.lat, lng: req.lng}})
        )
      ),
    });
    return this.makePromise((resolve) => {
      new google.maps.Geocoder().geocode(
        request,
        (result) => {
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
   * @param {ISearchPlacesEntity} request
   * @returns {Bluebird<ISearchPlaceEntity[]> | AnyT}
   */
  public searchPlaces(request: ISearchPlacesEntity): BPromise<ISearchPlaceEntity[]> | AnyT {
    request = nvl(request, {});
    const {query = ' '} = request;

    return this.makePromise((resolve) => {
      const searchService = new google.maps.places.AutocompleteService();
      searchService.getPlacePredictions(
        {
          ...this.getDefaultParams(request.country),
          input: query,
        },
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
   * @stable [11.01.2020]
   * @param {string} requestCountry
   * @returns {IKeyValue}
   */
  private getDefaultParams(requestCountry: string): IKeyValue {
    const {googleMaps = {}} = this.settings || {};
    const {componentRestrictions = {}} = googleMaps;
    const {country = {}} = componentRestrictions || {};

    return notNilValuesFilter({
      componentRestrictions: notNilValuesFilter({country: nvl(requestCountry, country)}),
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
