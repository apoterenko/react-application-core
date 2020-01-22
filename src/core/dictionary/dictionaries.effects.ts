import {
  EffectsService,
  IEffectsAction,
} from 'redux-effects-promise';

import {
  DictionariesEnum,
  IPlaceApi,
  ISearchPlaceEntity,
  ISearchPlacesEntity,
} from '../definition';
import {
  DI_TYPES,
  lazyInject,
  provideInSingleton,
} from '../di';
import { DictionariesActionBuilder } from '../action';
import { selectDataPayloadFromAction } from '../util';

@provideInSingleton(DictionariesEffects)
export class DictionariesEffects {
  @lazyInject(DI_TYPES.PlacesApi) private readonly placesApi: IPlaceApi;

  /**
   * @stable [12.01.2020]
   * @param {IEffectsAction} action
   * @returns {Promise<ISearchPlaceEntity[]>}
   */
  @EffectsService.effects(DictionariesActionBuilder.buildLoadActionType(DictionariesEnum.PLACES))
  public $onSearchPlaces = (action: IEffectsAction): Promise<ISearchPlaceEntity[]> =>
    this.placesApi.searchPlaces(selectDataPayloadFromAction<ISearchPlacesEntity>(action))
}
