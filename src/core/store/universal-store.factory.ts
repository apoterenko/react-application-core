import { applyMiddleware, combineReducers, createStore, Middleware, ReducersMapObject, Store } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { EffectsService, effectsMiddleware } from 'redux-effects-promise';

import {
  appContainer,
  bindToConstantValue,
  DI_TYPES,
  getSettings,
  getStorage,
} from '../di';
import { ENV } from '../env';
import { nvl } from '../util';
import { STORAGE_APP_STATE_KEY } from '../definition';
import { universalReducers } from '../store/universal-default-reducers.interface';

export async function buildUniversalStore<TState>(reducers: ReducersMapObject,
                                                  appMiddlewares?: Middleware[]): Promise<Store<TState>> {
  const middlewares = [effectsMiddleware].concat(appMiddlewares || []);

  const stateSettings = getSettings().state || {};
  let preloadedState = {} as TState;
  if (stateSettings.syncEnabled) {
    preloadedState = nvl(await getStorage().get(STORAGE_APP_STATE_KEY), preloadedState);
  }

  const store = createStore(
    (state) => state,
    preloadedState,
    (ENV.prodMode || ENV.rnPlatform) && !ENV.devModeEnabled
      ? applyMiddleware(...middlewares)
      : composeWithDevTools(applyMiddleware(...middlewares)),
  );

  // Store configuring
  bindToConstantValue(DI_TYPES.Store, store);
  EffectsService.configure(appContainer, store);

  // Set the app reducer
  store.replaceReducer(
    combineReducers(
      {
        ...universalReducers,
        ...reducers,
      }
    ));
  return store;
}
