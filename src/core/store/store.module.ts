import { AnyAction, applyMiddleware, combineReducers, createStore, Middleware, Reducer, Store } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { EffectsService, effectsMiddleware } from 'redux-effects-promise';

import { IApplicationSettings } from '../settings';
import { PROD_MODE } from '../env';
import { appContainer, DI_TYPES } from '../di';
import { APPLICATION_STATE_KEY, IApplicationStorage } from '../storage';
import { AnyT } from '../definition.interface';

import { ApplicationStateT, defaultReducers } from './store.interface';

export function makeStore(
    reducers: { [reducerName: string]: Reducer<AnyT> },
    applicationSettings?: IApplicationSettings,
    appMiddlewares?: Middleware[]
): Store<ApplicationStateT> {
  const middlewares = [effectsMiddleware].concat(appMiddlewares || []);

  const preloadedState = applicationSettings && applicationSettings.usePersistence
      ? (appContainer.get(DI_TYPES.Storage) as IApplicationStorage).get(APPLICATION_STATE_KEY)
      : null;

  const store = createStore(
      (state) => state,
      preloadedState as ApplicationStateT,
      PROD_MODE
          ? applyMiddleware(...middlewares)
          : composeWithDevTools(applyMiddleware(...middlewares)),
  );

  // Configuring of store at runtime
  appContainer.bind<Store<ApplicationStateT>>(DI_TYPES.Store).toConstantValue(store);
  EffectsService.configure(appContainer, store);

  // Set the app reducer
  store.replaceReducer(
      combineReducers(
          {
            ...defaultReducers,
            ...reducers,
          }
      ));
  return store;
}
