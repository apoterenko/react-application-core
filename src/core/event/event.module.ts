import { appContainer, DI_TYPES } from '../di';

import { EventManager } from './event.manager';

appContainer.bind(DI_TYPES.EventManager).to(EventManager).inSingletonScope();
