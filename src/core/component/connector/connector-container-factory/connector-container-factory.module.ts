import {
  bindInSingleton,
  DI_TYPES,
} from '../../../di';

import { ConnectorContainerFactory } from './connector-container-factory.service';

/**
 * @stable [11.06.2020]
 */
bindInSingleton(DI_TYPES.ConnectorContainerFactory, ConnectorContainerFactory);
