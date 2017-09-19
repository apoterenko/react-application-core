import { appContainer, DI_TYPES } from 'core/di';

import './router.effects';
import { dynamicRoutesMap, IRouteComponentConfig } from './router.interface';

appContainer.bind<Map<any, IRouteComponentConfig>>(DI_TYPES.DynamicRoutes).toConstantValue(dynamicRoutesMap);
