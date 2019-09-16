import {
  bindInSingleton,
  DI_TYPES,
} from '../../../di';
import { TransportResponseAccessor } from './transport-response-accessor.service';

/**
 * @stable [16.09.2019]
 */
bindInSingleton(DI_TYPES.TransportResponseAccessor, TransportResponseAccessor);
