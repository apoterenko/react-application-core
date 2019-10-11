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
   * @stable [11.10.2019]
   * @param {string | IOperationEntity} operation
   * @returns {boolean}
   */
  public isTransportOperationInProgress(operation: string | IOperationEntity): boolean {
    return this.props.transport.queue.includes(
      isString(operation)
        ? operation as string
        : (operation as IOperationEntity).id
    );
  }
}
