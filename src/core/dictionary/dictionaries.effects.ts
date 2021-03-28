import {
  EffectsService,
  IEffectsAction,
} from 'redux-effects-promise';

import {
  DictionariesEnum,
  IPlaceApi,
  ISimplePlaceEntity,
} from '../definition';
import {
  DI_TYPES,
  lazyInject,
  provideInSingleton,
} from '../di';
import { DictionariesActionBuilder } from '../action';
import { Selectors } from '../util';

@provideInSingleton(DictionariesEffects)
export class DictionariesEffects {
  @lazyInject(DI_TYPES.PlacesApi) private readonly placesApi: IPlaceApi;

  /**
   * @stable [27.03.2021]
   * @param action
   */
  @EffectsService.effects(DictionariesActionBuilder.buildLoadActionType(DictionariesEnum.PLACES))
  public readonly $onSearchPlaces = (action: IEffectsAction): Promise<ISimplePlaceEntity[]> =>
    this.placesApi.searchPlaces(Selectors.payloadFromAction(action))
}
