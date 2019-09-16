import {
  bindInSingleton,
  DI_TYPES,
} from '../../../di';
import { TransportResponseFactory } from './transport-response-factory.service';

/**
 * @stable [16.09.2019]
 */
bindInSingleton(DI_TYPES.TransportResponseFactory, TransportResponseFactory);
