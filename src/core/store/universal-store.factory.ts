import {
  applyMiddleware,
  combineReducers,
  createStore,
  Middleware,
  ReducersMapObject,
  Store,
} from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import {
  effectsMiddleware,
  EffectsService,
} from 'redux-effects-promise';

import {
  appContainer,
  bindToConstantValue,
  DI_TYPES,
  getSettings,
  getStorage,
} from '../di';
import { NvlUtils } from '../util';
import { universalReducers } from '../store/universal-default-reducers.interface';
import { DefaultEntities } from '../definition';

// TODO Make a service
export async function buildUniversalStore<TState>(reducers: ReducersMapObject,
                                                  appMiddlewares?: Middleware[]): Promise<Store<TState>> {
  const middlewares = [effectsMiddleware].concat(appMiddlewares || []);

  const storageSettings = getSettings().storage || {};
  let preloadedState = {} as TState;
  if (storageSettings.appStateSyncEnabled) {
    preloadedState = NvlUtils.nvl(await getStorage().get(storageSettings.appStateKeyName), preloadedState);
  }

  const store = createStore(
    (state) => state,
    preloadedState,
    DefaultEntities.ENVIRONMENT_ENTITY.prodMode && !DefaultEntities.ENVIRONMENT_ENTITY.devMode
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
