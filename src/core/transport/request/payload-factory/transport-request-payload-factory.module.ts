import {
  bindInSingleton,
  DI_TYPES,
} from '../../../di';
import { TransportRequestPayloadFactory } from './transport-request-payload-factory.service';

/**
 * @stable [16.09.2019]
 */
bindInSingleton(DI_TYPES.TransportRequestPayloadFactory, TransportRequestPayloadFactory);
