import {
  DI_TYPES,
  DiSupport,
} from '../../di';
import { IConnectorEntity } from '../../definition';

import './connector-container-factory/connector-container-factory.module';

/**
 * @stable [11.06.2020]
 */
DiSupport.bindToConstantValue(DI_TYPES.DynamicSections, new Map<string, IConnectorEntity>());
