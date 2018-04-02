import { Middleware, ReducersMapObject, Store } from 'redux';

import './stack/stack.module';
import { buildStore } from './store.factory';
import { IApplicationSettings } from '../settings';
import { IDefaultApplicationState, defaultReducers } from './store.interface';

export function makeStore(reducers: ReducersMapObject,
                          applicationSettings?: IApplicationSettings,
                          appMiddlewares?: Middleware[]): Store<IDefaultApplicationState> {
  return buildStore(
    {
      ...defaultReducers,
      ...reducers,
    },
    applicationSettings,
    appMiddlewares
  );
}
