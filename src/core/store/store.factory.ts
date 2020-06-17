import {
  Middleware,
  ReducersMapObject,
  Store,
} from 'redux';

import { buildUniversalStore } from './universal-store.factory';
import { defaultReducers } from './store.interface';
import { IStoreEntity } from '../definition';

/**
 * @stable [17.06.2020]
 * @param {TReducers} reducers
 * @param {Middleware[]} appMiddlewares
 * @returns {Promise<Store<IStoreEntity>>}
 */
export const makeStore =
  <TReducers = ReducersMapObject>(reducers: TReducers,
                                  appMiddlewares?: Middleware[]): Promise<Store<IStoreEntity>> =>
    buildUniversalStore<IStoreEntity>( // TODO
      {
        ...defaultReducers,
        ...reducers as {},
      },
      appMiddlewares
    );
