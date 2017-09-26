import { appContainer, DI_TYPES } from 'core/di';

import { EventManager } from './event.manager';

appContainer.bind(DI_TYPES.EventManager).to(EventManager);
