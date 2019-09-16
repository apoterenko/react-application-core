import { bindInSingleton, DI_TYPES } from '../../di';
import { TransportTokenAccessor } from './transport-token-accessor.service';

/**
 * @stable [16.09.2019]
 */
bindInSingleton(DI_TYPES.TransportTokenAccessor, TransportTokenAccessor);
