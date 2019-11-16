import {
  bindToConstantValue,
  DI_TYPES,
} from '../di';
import {
  IConnectorEntity,
  IUniversalContainerCtor,
} from '../definition';

/**
 * @stable [16.11.2019]
 */
bindToConstantValue(DI_TYPES.DynamicRoutes, new Map<IUniversalContainerCtor, IConnectorEntity>());
