import { Middleware, ReducersMapObject, Store } from 'redux';

import './stack/stack.module';
import { buildStore } from './store.factory';
import { IApplicationSettings } from '../settings';
import { defaultReducers } from './store.interface';
import { IApplicationStoreEntity } from '../entities-definitions.interface';

export function makeStore(reducers: ReducersMapObject,
                          applicationSettings?: IApplicationSettings,
                          appMiddlewares?: Middleware[]): Store<IApplicationStoreEntity> {
  return buildStore<IApplicationStoreEntity>(
    {
      ...defaultReducers,
      ...reducers,
    },
    applicationSettings,
    appMiddlewares
  );
}
