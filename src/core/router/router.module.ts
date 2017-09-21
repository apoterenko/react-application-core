import { appContainer, DI_TYPES } from 'core/di';
import { RouteContainerT } from 'core/router';

import './router.effects';
import { DYNAMIC_ROUTES, IRouteComponentConfig } from './router.interface';

appContainer.bind<Map<RouteContainerT, IRouteComponentConfig>>(DI_TYPES.DynamicRoutes)
    .toConstantValue(DYNAMIC_ROUTES);
