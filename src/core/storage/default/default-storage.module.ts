import { DefaultStorage } from './default-storage.service';
import {
  appContainer,
  DI_TYPES,
  DiServices,
} from '../../di';
import { StorageUtils } from '../../util';
import { DefaultEntities } from '../../definition';

/**
 * @stable [10.09.2020]
 */
appContainer
  .bind(DI_TYPES.Storage)
  .toConstantValue(
    new DefaultStorage(StorageUtils.asVersionedKey(DefaultEntities.ENVIRONMENT_ENTITY), DiServices.settings)
  );
