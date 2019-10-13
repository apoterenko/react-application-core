import {
  I$$transportStoreProxyWrapper,
} from '../../../../definitions.interface';
import {
  IDispatcher,
  IOperationEntity,
} from '../../../../definition';

/**
 * @stable [11.10.2019]
 */
export interface ITransportStoreProxy
  extends IDispatcher {
  isTransportOperationInProgress(operation: string | IOperationEntity): boolean;
  isTransportOperationsInProgress(...operations: Array<string | IOperationEntity>): boolean;
}

/**
 * @stable [11.09.2019]
 */
export interface ITransportStoreProxyWrapperEntity
  extends I$$transportStoreProxyWrapper<ITransportStoreProxy> {
}
