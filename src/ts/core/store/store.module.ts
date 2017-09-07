import { AnyAction, applyMiddleware, createStore, Middleware, Store } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { effectsMiddleware } from 'redux-effects-promise';

import { PROD_MODE } from 'core/env';
import { IApplicationPermissionState } from 'core/permission';

import { IApplicationState, INITIAL_APPLICATION_STATE } from './store.interface';

let middlewares = [effectsMiddleware];

export function storeFactory<TAppState extends IApplicationState<TPermissionState, TPermissions>,
                             TPermissionState extends IApplicationPermissionState<TPermissions>,
                             TPermissions>(preloadedState: TAppState, appMiddlewares?: Middleware[]): Store<TAppState> {
  middlewares = middlewares.concat(appMiddlewares || []);
  return createStore(
      (state) => state,
      preloadedState || INITIAL_APPLICATION_STATE as TAppState,
      PROD_MODE
          ? applyMiddleware(...middlewares)
          : composeWithDevTools(applyMiddleware(...middlewares)),
  );
}
