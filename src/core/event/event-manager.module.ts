import { appContainer, DI_TYPES } from '../di';

import { EventManager } from './event-manager.service';

appContainer.bind(DI_TYPES.EventManager).to(EventManager).inSingletonScope();
