import { Middleware, ReducersMapObject, Store } from 'redux';

import './stack/stack.module';
import { buildUniversalStore } from './universal-store.factory';
import { IApplicationSettings } from '../settings';
import { defaultReducers } from './store.interface';
import { IApplicationStoreEntity } from '../entities-definitions.interface';

export function makeStore(reducers: ReducersMapObject,
                          applicationSettings?: IApplicationSettings,
                          appMiddlewares?: Middleware[]): Store<IApplicationStoreEntity> {
  return buildUniversalStore<IApplicationStoreEntity>(
    {
      ...defaultReducers,
      ...reducers,
    },
    applicationSettings,
    appMiddlewares
  );
}
