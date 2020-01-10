import {
  bindInSingleton,
  DI_TYPES,
} from '../../../di';

import { GooglePlaceApi } from './google-place-api.service';

/**
 * @stable [09.10.2019]
 */
bindInSingleton(DI_TYPES.PlacesApi, GooglePlaceApi);
