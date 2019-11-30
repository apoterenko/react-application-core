import {
  getDialogFormChangesConfirmStoreProxyFactory,
  getFormStoreProxyFactory,
} from '../../di';
import {
  IContainerProps,
  IDialogFormChangesConfirmStoreProxy,
  IFormStoreProxy,
} from '../../definition';
import { BaseContainer } from './base.container';

export class BasicContainer<TProps extends IContainerProps = IContainerProps,
  TState = {}>
  extends BaseContainer<TProps, TState> {

  private $dfccStoreProxy: IDialogFormChangesConfirmStoreProxy;
  private $formStoreProxy: IFormStoreProxy;

  /**
   * @stable [27.11.2019]
   * @returns {IDialogFormChangesConfirmStoreProxy}
   */
  protected get dfccStoreProxy(): IDialogFormChangesConfirmStoreProxy {
    return this.$dfccStoreProxy = this.$dfccStoreProxy || getDialogFormChangesConfirmStoreProxyFactory()(this);
  }

  /**
   * @stable [30.11.2019]
   * @returns {IFormStoreProxy}
   */
  protected get formStoreProxy(): IFormStoreProxy {
    return this.$formStoreProxy = this.$formStoreProxy || getFormStoreProxyFactory()(this);
  }
}
