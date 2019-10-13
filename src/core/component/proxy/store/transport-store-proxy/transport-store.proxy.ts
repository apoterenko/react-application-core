import * as R from 'ramda';

import { namedConstructor, isString } from '../../../../util';
import {
  IOperationEntity,
  IUniversalContainer,
  IUniversalContainerProps,
  IUniversalStoreEntity,
} from '../../../../definition';
import { BaseStoreProxy } from '../base-store.proxy';
import { ITransportStoreProxy } from './transport-store-proxy.interface';

@namedConstructor('$$transportStoreProxy')
export class TransportStoreProxy<TStore extends IUniversalStoreEntity = IUniversalStoreEntity,
                                 TProps extends IUniversalContainerProps = IUniversalContainerProps>
  extends BaseStoreProxy<TStore, TProps>
  implements ITransportStoreProxy {

  /**
   * @stable [11.10.2019]
   * @param {IUniversalContainer<TProps extends IUniversalContainerProps>} container
   */
  constructor(readonly container: IUniversalContainer<TProps>) {
    super(container);
    this.isTransportOperationInProgress = this.isTransportOperationInProgress.bind(this);
  }

  /**
   * @stable [13.10.2019]
   * @param {string | IOperationEntity} operation
   * @returns {boolean}
   */
  public isTransportOperationInProgress(operation: string | IOperationEntity): boolean {
    return this.isTransportOperationsInProgress(operation);
  }

  /**
   * @stable [13.10.2019]
   * @param {string | IOperationEntity} operations
   * @returns {boolean}
   */
  public isTransportOperationsInProgress(...operations: Array<string | IOperationEntity>): boolean {
    return R.intersection(
      this.props.transport.queue,
      operations.map((operation) => (
        isString(operation)
          ? operation as string
          : (operation as IOperationEntity).id
      ))
    ).length > 0;
  }
}
