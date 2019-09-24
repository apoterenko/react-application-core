import { Middleware, ReducersMapObject, Store } from 'redux';

import './stack/stack.module';
import { buildUniversalStore } from './universal-store.factory';
import { defaultReducers } from './store.interface';
import { IStoreEntity } from '../entities-definitions.interface';

export function makeStore(reducers: ReducersMapObject,
                          appMiddlewares?: Middleware[]): Promise<Store<IStoreEntity>> {
  return buildUniversalStore<IStoreEntity>(
    {
      ...defaultReducers,
      ...reducers,
    },
    appMiddlewares
  );
}
