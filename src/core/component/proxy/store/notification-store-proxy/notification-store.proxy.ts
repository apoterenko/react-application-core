import {
  IGenericContainer,
  IGenericContainerProps,
  INotificationStoreProxy,
  IReduxStoreEntity,
} from '../../../../definition';
import { StoreProxy } from '../store.proxy';
import { NotificationActionBuilder } from '../../../../action';

export class NotificationStoreProxy<TStore extends IReduxStoreEntity = IReduxStoreEntity,
                                    TProps extends IGenericContainerProps = IGenericContainerProps>
  extends StoreProxy<TStore, TProps>
  implements INotificationStoreProxy {

  /**
   * @stable [08.04.2021]
   * @param container
   */
  constructor(readonly container: IGenericContainer<TProps>) {
    super(container);
    this.dispatchInfo = this.dispatchInfo.bind(this);
  }

  /**
   * @stable [08.04.2021]
   * @param info
   */
  public dispatchInfo(info: string): void {
    this.dispatchPlainAction(NotificationActionBuilder.buildPlainInfoAction(info));
  }

  /**
   * @stable [08.04.2021]
   * @param error
   */
  public dispatchError(error: string): void {
    this.dispatchPlainAction(NotificationActionBuilder.buildPlainErrorAction(error));
  }
}
