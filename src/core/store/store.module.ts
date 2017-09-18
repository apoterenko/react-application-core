import { AnyAction, applyMiddleware, createStore, Middleware, Store } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { EffectsService, effectsMiddleware } from 'redux-effects-promise';

import { IApplicationSettings } from 'core/settings';
import { PROD_MODE } from 'core/env';
import { IApplicationPermissionsState } from 'core/permission';
import { appContainer, DI_TYPES } from 'core/di';
import { APPLICATION_STATE_KEY, IStorage } from 'core/storage';

import { IApplicationState, INITIAL_APPLICATION_STATE } from './store.interface';

export type ApplicationStateT = IApplicationState<{}, IApplicationPermissionsState<{}>, {}>;

export function storeFactory(applicationSettings?: IApplicationSettings, appMiddlewares?: Middleware[]): Store<ApplicationStateT> {
  const middlewares = [effectsMiddleware].concat(appMiddlewares || []);

  const preloadedState = applicationSettings && applicationSettings.usePersistence
      ? (appContainer.get(DI_TYPES.Storage) as IStorage).get(APPLICATION_STATE_KEY)
      : null;

  const store = createStore(
      (state) => state,
      (preloadedState || INITIAL_APPLICATION_STATE) as ApplicationStateT,
      PROD_MODE
          ? applyMiddleware(...middlewares)
          : composeWithDevTools(applyMiddleware(...middlewares)),
  );

  // Configuring of store at runtime
  appContainer.bind<Store<ApplicationStateT>>(DI_TYPES.Store).toConstantValue(store);
  EffectsService.configure(appContainer, store);

  return store;
}
