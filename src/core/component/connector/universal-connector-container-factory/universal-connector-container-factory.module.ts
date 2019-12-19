import {
  bindInSingleton,
  DI_TYPES,
} from '../../../di';

import { UniversalConnectorContainerFactory } from './universal-connector-container-factory.service';

/**
 * @stable [19.12.2019]
 */
bindInSingleton(DI_TYPES.ConnectorContainerFactory, UniversalConnectorContainerFactory);
