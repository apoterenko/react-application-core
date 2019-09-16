import {
  bindInSingleton,
  DI_TYPES,
} from '../../di';
import { TransportFactory } from './transport-factory.service';

/**
 * @stable [16.09.2019]
 */
bindInSingleton(DI_TYPES.TransportFactory, TransportFactory);
