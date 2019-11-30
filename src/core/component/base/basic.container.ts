import {
  getDialogFormChangesConfirmStoreProxyFactory,
} from '../../di';
import {
  IContainerProps,
  IDialogFormChangesConfirmStoreProxy,
} from '../../definition';
import { BaseContainer } from './base.container';

export class BasicContainer<TProps extends IContainerProps = IContainerProps,
  TState = {}>
  extends BaseContainer<TProps, TState> {

  private $dfccStoreProxy: IDialogFormChangesConfirmStoreProxy;

  /**
   * @stable [27.11.2019]
   * @returns {IDialogFormChangesConfirmStoreProxy}
   */
  protected get dfccStoreProxy(): IDialogFormChangesConfirmStoreProxy {
    return this.$dfccStoreProxy = this.$dfccStoreProxy || getDialogFormChangesConfirmStoreProxyFactory()(this);
  }
}
