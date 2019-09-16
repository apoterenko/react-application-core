import {
  bindInSingleton,
  DI_TYPES,
} from '../../../../di';
import { TransportJsonRpcRequestDataFactory } from './transport-json-rpc-request-data-factory.service';

/**
 * @stable [16.09.2019]
 */
bindInSingleton(DI_TYPES.TransportRequestDataFactory, TransportJsonRpcRequestDataFactory);
