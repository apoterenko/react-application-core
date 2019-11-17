import {
  bindToConstantValue,
  DI_TYPES,
} from '../../di';
import {
  IConnectorEntity,
} from '../../definition';

/**
 * @stable [17.11.2019]
 */
bindToConstantValue(DI_TYPES.DynamicSections, new Map<string, IConnectorEntity>());
