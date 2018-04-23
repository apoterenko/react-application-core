import { applyMiddleware, combineReducers, createStore, Middleware, ReducersMapObject, Store } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { EffectsService, effectsMiddleware } from 'redux-effects-promise';

import { IApplicationSettings } from '../settings';
import { PROD_MODE, RN_MODE_ENABLED } from '../env';
import { appContainer, DI_TYPES, staticInjector } from '../di';
import { APPLICATION_STATE_KEY, IApplicationStorage } from '../storage';
import { orDefault } from '../util';
import { universalReducers } from '../store/universal-default-reducers.interface';

export function buildUniversalStore<TState>(reducers: ReducersMapObject,
                                            applicationSettings?: IApplicationSettings,
                                            appMiddlewares?: Middleware[]): Store<TState> {
  const middlewares = [effectsMiddleware].concat(appMiddlewares || []);

  const preloadedState = orDefault(
    !RN_MODE_ENABLED && applicationSettings && applicationSettings.usePersistence,
    () => staticInjector<IApplicationStorage>(DI_TYPES.Storage).get(APPLICATION_STATE_KEY),
    {}
  );

  const store = createStore(
    (state) => state,
    preloadedState as TState,
    PROD_MODE || RN_MODE_ENABLED
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
