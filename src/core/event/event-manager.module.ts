import { bindInSingleton, DI_TYPES } from '../di';
import { EventManager } from './event-manager.service';
import './emitter/event-emitter.module';

/**
 * @stable [24.09.2019]
 */
bindInSingleton(DI_TYPES.EventManager, EventManager);
