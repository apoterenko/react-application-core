import * as localforage from 'localforage';

import {
  appContainer,
  DI_TYPES,
} from '../../di';
import { DatabaseStorage } from './database-storage.service';
import { StorageUtils } from '../../util';
import { DefaultEntities } from '../../definition';

/**
 * @stable [10.09.2020]
 */
appContainer
  .bind(DI_TYPES.DatabaseStorage)
  .toConstantValue(
    new DatabaseStorage(
      localforage.createInstance({
        driver: localforage.INDEXEDDB,
        name: 'racApp',
        storeName: 'racDatabase',
        version: 1.0,
      }),
      StorageUtils.asVersionedKey(DefaultEntities.ENVIRONMENT_ENTITY)
    )
  );
