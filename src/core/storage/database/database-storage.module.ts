import * as localforage from 'localforage';

import { appContainer, DI_TYPES } from '../../di';
import { DatabaseStorage } from './database-storage.service';
import { VERSIONED_STORAGE_KEY } from '../storage.interface';

appContainer.bind(DI_TYPES.DatabaseStorage).toConstantValue(
  new DatabaseStorage(
    localforage.createInstance({
      driver: localforage.INDEXEDDB,
      name: 'sweedposApp',
      version: 1.0,
      storeName: 'sweedposDefaultDatabase',
    }),
    VERSIONED_STORAGE_KEY
  )
);
