import { DefaultStorage } from './default-storage.service';
import { appContainer, DI_TYPES, getSettings } from '../../di';
import { STORAGE_VERSIONED_KEY } from '../../definition';

appContainer.bind(DI_TYPES.Storage).toConstantValue(
  new DefaultStorage(STORAGE_VERSIONED_KEY, getSettings)
);
