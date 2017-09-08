import { appContainer, DI_TYPES } from 'core/di';
import { EventManager } from 'core/event';
import { DateConverter } from 'core/converter';
import { StorageService } from 'core/storage';

appContainer.bind(DI_TYPES.EventManager).to(EventManager);
appContainer.bind(DI_TYPES.DateConverter).to(DateConverter);
appContainer.bind(DI_TYPES.Storage).to(StorageService);
