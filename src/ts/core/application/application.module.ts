import { appContainer, DI_TYPES } from 'core/di';
import { EventManager } from 'core/event';
import { DateConverter } from 'core/converter';

appContainer.bind(DI_TYPES.EventManager).to(EventManager);
appContainer.bind(DI_TYPES.DateConverter).to(DateConverter);
