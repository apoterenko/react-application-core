import { AnyAction, applyMiddleware, createStore, Middleware, Store } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { EffectsService, effectsMiddleware } from 'redux-effects-promise';

import { IApplicationSettings } from 'core/settings';
import { PROD_MODE } from 'core/env';
import { IApplicationPermissionsState } from 'core/permission';
import { appContainer, DI_TYPES } from 'core/di';
import { APPLICATION_STATE_KEY, IStorage } from 'core/storage';
import { IApplicationDictionariesState } from 'core/dictionary';

import { IApplicationState, INITIAL_APPLICATION_STATE } from './store.interface';

export function storeFactory<TAppState extends IApplicationState<TDictionariesState, TPermissionsState, TPermissions>,
                             TDictionariesState extends IApplicationDictionariesState,
                             TPermissionsState extends IApplicationPermissionsState<TPermissions>,
                             TPermissions>(applicationSettings?: IApplicationSettings, appMiddlewares?: Middleware[]): Store<TAppState> {
  const middlewares = [effectsMiddleware].concat(appMiddlewares || []);

  const preloadedState = applicationSettings && applicationSettings.usePersistence
      ? (appContainer.get(DI_TYPES.Storage) as IStorage).get(APPLICATION_STATE_KEY)
      : null;

  const store = createStore(
      (state) => state,
      (preloadedState || INITIAL_APPLICATION_STATE) as TAppState,
      PROD_MODE
          ? applyMiddleware(...middlewares)
          : composeWithDevTools(applyMiddleware(...middlewares)),
  );

  // Configuring of store at runtime
  appContainer.bind<Store<TAppState>>(DI_TYPES.Store).toConstantValue(store);
  EffectsService.configure(appContainer, store);

  return store;
}
