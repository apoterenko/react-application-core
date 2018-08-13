import { appContainer, DI_TYPES } from '../di';
import { IDefaultConnectorConfiguration } from '../configurations-definitions.interface';
import { IUniversalContainerClassEntity } from '../entities-definitions.interface';
import { DYNAMIC_ROUTES } from './router.interface';

/**
 * @stable [13.08.2018]
 */
appContainer.bind<Map<IUniversalContainerClassEntity, IDefaultConnectorConfiguration>>(DI_TYPES.DynamicRoutes)
  .toConstantValue(DYNAMIC_ROUTES);
