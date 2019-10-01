import { appContainer, DI_TYPES } from '../di';
import { IConnectorConfigEntity } from '../configurations-definitions.interface';
import { IUniversalContainerCtor } from '../definition';
import { DYNAMIC_ROUTES } from './router.interface';

/**
 * @stable [13.08.2018]
 */
appContainer.bind<Map<IUniversalContainerCtor, IConnectorConfigEntity>>(DI_TYPES.DynamicRoutes)
  .toConstantValue(DYNAMIC_ROUTES);
