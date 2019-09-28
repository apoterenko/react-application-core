import { Middleware, ReducersMapObject, Store } from 'redux';

import './stack/stack.module';
import './state/serializer/state-serializer.module';
import { buildUniversalStore } from './universal-store.factory';
import { defaultReducers } from './store.interface';
import { IStoreEntity } from '../definition';

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
