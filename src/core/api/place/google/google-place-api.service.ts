import * as BPromise from 'bluebird';
import { injectable } from 'inversify';

import { ISettingsEntity } from '../../../settings';
import {
  DI_TYPES,
  lazyInject,
} from '../../../di';
import {
  AsyncLibsEnum,
  IAsyncLibManager,
  IFieldConverter,
  IPlaceApi,
  IPlaceEntity,
  IPlaceGeoCodeApiRequest,
  ISimplePlaceEntity,
  ISearchPlacesApiRequest,
} from '../../../definition';
import {
  ConditionUtils,
  FilterUtils,
  NvlUtils,
} from '../../../util';

/**
 * @service-impl
 * @stable [28.03.2021]
 */
@injectable()
export class GooglePlaceApi implements IPlaceApi {
  @lazyInject(DI_TYPES.AsyncLibManager) private readonly asyncLibManager: IAsyncLibManager;
  @lazyInject(DI_TYPES.FieldConverter) private readonly fieldConverter: IFieldConverter;
  @lazyInject(DI_TYPES.Settings) private readonly settings: ISettingsEntity;

  /**
   * @stable [28.03.2021]
   * @param req
   */
  public async getPlaceGeoCode(req: IPlaceGeoCodeApiRequest): BPromise<IPlaceEntity[]> {
    await this.awaitLib();

    return new BPromise((resolve) => {
      new google.maps.Geocoder().geocode(
        this.asGeocoderRequest(req),
        (result) => resolve(
          (result || []).map(this.fieldConverter.fromGeoCodeResultToPlaceEntity)
        )
      );
    });
  }

  /**
   * @stable [28.03.2021]
   * @param request
   */
  public async searchPlaces(request: ISearchPlacesApiRequest): BPromise<ISimplePlaceEntity[]> {
    await this.awaitLib();

    return new BPromise(
      (resolve: (entities: ISimplePlaceEntity[]) => void) =>
        new google.maps.places.AutocompleteService()
          .getPlacePredictions(
            this.asAutoCompletionRequest(request),
            (result: google.maps.places.AutocompletePrediction[]) => {
              resolve(
                (result || []).map(this.fieldConverter.fromAutocompletePredictionToSimplePlaceEntity)
              );
            },
          )
    );
  }

  /**
   * @stable [28.03.2021]
   * @param request
   */
  private asAutoCompletionRequest(request: ISearchPlacesApiRequest): google.maps.places.AutocompletionRequest {
    const {
      country,
      query = ' ',
    } = request || {};

    return FilterUtils.notNilValuesFilter<google.maps.places.AutocompletionRequest, google.maps.places.AutocompletionRequest>({
      componentRestrictions: FilterUtils.notNilValuesFilter<google.maps.places.ComponentRestrictions, google.maps.places.ComponentRestrictions>(
        {
          country: NvlUtils.nvl(
            country,
            this.settings?.googleMaps?.componentRestrictions?.country
          ),
        }
      ),
      input: query,
    });
  }

  /**
   * @stable [28.03.2021]
   * @param req
   */
  private asGeocoderRequest(req: IPlaceGeoCodeApiRequest): google.maps.GeocoderRequest {
    return FilterUtils.notNilValuesFilter<google.maps.GeocoderRequest, google.maps.GeocoderRequest>({
      placeId: req.placeId,
      ...(
        ConditionUtils.ifNotNilThanValue(
          NvlUtils.nvl(req.lat, req.lng),
          (): google.maps.GeocoderRequest => ({location: {lat: req.lat, lng: req.lng}})
        )
      ),
    });
  }

  /**
   * @stable [28.03.2021]
   */
  private readonly awaitLib = (): Promise<HTMLScriptElement> =>
    this.asyncLibManager
      .waitForLib({alias: AsyncLibsEnum.GOOGLE_MAPS});
}
