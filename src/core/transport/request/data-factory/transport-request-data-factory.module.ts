import {
  bindInSingleton,
  DI_TYPES,
} from '../../../di';
import { TransportRequestDataFactory } from './transport-request-data-factory.service';

/**
 * @stable [16.09.2019]
 */
bindInSingleton(DI_TYPES.TransportRequestDataFactory, TransportRequestDataFactory);
