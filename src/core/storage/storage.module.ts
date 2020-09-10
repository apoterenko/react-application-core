import {
  appContainer,
  DI_TYPES,
  DiServices,
} from '../di';
import { DefaultStorage } from './default/default-storage.service';
import {
  DefaultEntities,
  StorageTypesEnum,
} from '../definition';
import { StorageUtils } from '../util';

import './database/database-storage.module';
import './default/default-storage.module';
import './multi-entity/multi-entity-storage.module';
import './universal-storage.effects';

/**
 * @stable [10.09.2020]
 */
appContainer
  .bind(DI_TYPES.NotVersionedPersistentStorage)
  .toConstantValue(
    new DefaultStorage(
      StorageUtils.asNotVersionedKey(DefaultEntities.ENVIRONMENT_ENTITY),
      DiServices.settings,
      StorageTypesEnum.LOCAL
    )
  );

/**
 * @stable [10.09.2020]
 */
appContainer
  .bind(DI_TYPES.NotVersionedSessionStorage)
  .toConstantValue(
    new DefaultStorage(
      StorageUtils.asNotVersionedKey(DefaultEntities.ENVIRONMENT_ENTITY),
      DiServices.settings,
      StorageTypesEnum.SESSION
    )
  );
