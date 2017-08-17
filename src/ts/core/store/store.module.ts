import { applyMiddleware, AnyAction, createStore, Store, Middleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { effectsMiddleware } from 'redux-effects-promise';

import { PROD_MODE } from '../env/env.interface';
import { IApplicationState, INITIAL_APPLICATION_STATE } from './store.interface';
import { IApplicationPermissionState } from '../permission/permission.interface';

let middlewares = [effectsMiddleware];

export function storeFactory<TAppState extends IApplicationState<TPermissionState, TPermissions>,
                             TPermissionState extends IApplicationPermissionState<TPermissions>,
                             TPermissions>
      (preloadedState: TAppState, appMiddlewares?: Middleware[]): Store<TAppState> {
  middlewares = middlewares.concat(appMiddlewares || []);
  return createStore(
      state => state,
      preloadedState || INITIAL_APPLICATION_STATE as TAppState,
      PROD_MODE
          ? applyMiddleware(...middlewares)
          : composeWithDevTools(applyMiddleware(...middlewares))
  );
}
