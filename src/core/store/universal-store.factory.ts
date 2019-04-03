import { applyMiddleware, combineReducers, createStore, Middleware, ReducersMapObject, Store } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { EffectsService, effectsMiddleware } from 'redux-effects-promise';

import { ISettings } from '../settings';
import { ENV } from '../env';
import { appContainer, DI_TYPES, staticInjector } from '../di';
import { APPLICATION_STATE_KEY, IStorage } from '../storage/storage.interface';
import { universalReducers } from '../store/universal-default-reducers.interface';

export async function buildUniversalStore<TState>(reducers: ReducersMapObject,
                                                  applicationSettings?: ISettings,
                                                  appMiddlewares?: Middleware[]): Promise<Store<TState>> {
  const middlewares = [effectsMiddleware].concat(appMiddlewares || []);

  let preloadedState = {} as TState;
  if (!ENV.rnPlatform && applicationSettings && applicationSettings.usePersistence) {
    preloadedState = await staticInjector<IStorage>(DI_TYPES.Storage).get(APPLICATION_STATE_KEY);
  }

  const store = createStore(
    (state) => state,
    preloadedState,
    (ENV.prodMode || ENV.rnPlatform) && !ENV.devModeEnabled
      ? applyMiddleware(...middlewares)
      : composeWithDevTools(applyMiddleware(...middlewares)),
  );

  // Configuring of store at runtime
  appContainer.bind<Store<TState>>(DI_TYPES.Store).toConstantValue(store);
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
