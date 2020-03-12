import {
  Middleware,
  ReducersMapObject,
  Store,
} from 'redux';

import { buildUniversalStore } from './universal-store.factory';
import { defaultReducers } from './store.interface';
import { IStoreEntity } from '../definition';

/**
 * @stable [11.03.2020]
 * @param {ReducersMapObject} reducers
 * @param {Middleware[]} appMiddlewares
 * @returns {Promise<Store<IStoreEntity>>}
 */
export const makeStore = (reducers: ReducersMapObject,
                          appMiddlewares?: Middleware[]): Promise<Store<IStoreEntity>> =>
  buildUniversalStore<IStoreEntity>(
    {
      ...defaultReducers,
      ...reducers,
    },
    appMiddlewares
  );
