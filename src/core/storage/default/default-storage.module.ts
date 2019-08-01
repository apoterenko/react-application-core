import { DefaultStorage } from './default-storage.service';
import { appContainer, DI_TYPES, getSettings } from '../../di';
import { VERSIONED_STORAGE_KEY } from '../storage.interface';

appContainer.bind(DI_TYPES.Storage).toConstantValue(
  new DefaultStorage(VERSIONED_STORAGE_KEY, getSettings)
);
