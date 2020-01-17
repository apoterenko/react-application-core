import {
  bindInSingleton,
  DI_TYPES,
} from '../../di';
import { EventEmitter } from './event-emitter.service';

/**
 * @stable [24.09.2019]
 */
bindInSingleton(DI_TYPES.EventEmitter, EventEmitter);
