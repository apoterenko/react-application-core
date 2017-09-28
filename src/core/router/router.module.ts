import { appContainer, DI_TYPES } from '../di';
import { RouteContainerT } from '../router';
import { ConnectorConfigT } from '../component/store';

import './router.effects';
import { DYNAMIC_ROUTES } from './router.interface';

appContainer.bind<Map<RouteContainerT, ConnectorConfigT>>(DI_TYPES.DynamicRoutes)
    .toConstantValue(DYNAMIC_ROUTES);
