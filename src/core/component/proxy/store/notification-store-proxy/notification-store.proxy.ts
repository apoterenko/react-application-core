import {
  IGenericContainer,
  IGenericContainerProps,
  IReduxStoreEntity,
  INotificationStoreProxy,
} from '../../../../definition';
import { StoreProxy } from '../store.proxy';
import { NotificationActionBuilder } from '../../../../action';

export class NotificationStoreProxy<TStore extends IReduxStoreEntity = IReduxStoreEntity,
                                    TProps extends IGenericContainerProps = IGenericContainerProps>
  extends StoreProxy<TStore, TProps>
  implements INotificationStoreProxy {

  /**
   * @stable [30.03.2020]
   * @param {IGenericContainer<TProps extends IGenericContainerProps>} container
   */
  constructor(readonly container: IGenericContainer<TProps>) {
    super(container);
    this.dispatchNotification = this.dispatchNotification.bind(this);
  }

  /**
   * @stable [30.03.2020]
   * @param {string} info
   */
  public dispatchNotification(info: string): void {
    this.dispatchPlainAction(NotificationActionBuilder.buildPlainInfoAction(info));
  }
}
