import * as localforage from 'localforage';

import {
  appContainer,
  DI_TYPES,
} from '../../di';
import { DatabaseStorage } from './database-storage.service';
import { STORAGE_VERSIONED_KEY } from '../../definition';

appContainer.bind(DI_TYPES.DatabaseStorage).toConstantValue(
  new DatabaseStorage(
    localforage.createInstance({
      driver: localforage.INDEXEDDB,
      name: 'racApp',
      storeName: 'racDatabase',
      version: 1.0,
    }),
    STORAGE_VERSIONED_KEY
  )
);
