import { appContainer, DI_TYPES } from 'core/di';
import { RouteContainerT } from 'core/router';
import { ConnectorConfigT } from 'core/component/store';

import './router.effects';
import { DYNAMIC_ROUTES } from './router.interface';

appContainer.bind<Map<RouteContainerT, ConnectorConfigT>>(DI_TYPES.DynamicRoutes)
    .toConstantValue(DYNAMIC_ROUTES);
