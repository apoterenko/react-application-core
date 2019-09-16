import {
  bindInSingleton,
  DI_TYPES,
} from '../../../di';
import { TransportRequestProvider } from './transport-request-provider.service';

/**
 * @stable [16.09.2019]
 */
bindInSingleton(DI_TYPES.TransportRequestProvider, TransportRequestProvider);
