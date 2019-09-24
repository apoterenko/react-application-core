import { bindInSingleton, DI_TYPES } from '../../../di';
import { StateSerializer } from './state-serializer.service';

/**
 * @stable [24.09.2019]
 */
bindInSingleton(DI_TYPES.StateSerializer, StateSerializer);
