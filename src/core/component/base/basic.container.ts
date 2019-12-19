import {
  getDialogFormChangesConfirmStoreProxyFactory,
  getFormStoreProxyFactory,
  getRouterStoreProxyFactoryFactory,
} from '../../di';
import {
  IContainerProps,
  IDialogFormChangesConfirmStoreProxy,
  IFormStoreProxy,
  IRouterStoreProxy,
} from '../../definition';
import { BaseContainer } from './base.container';

export class BasicContainer<TProps extends IContainerProps = IContainerProps,
  TState = {}>
  extends BaseContainer<TProps, TState> {

  private $dfccStoreProxy: IDialogFormChangesConfirmStoreProxy;
  private $formStoreProxy: IFormStoreProxy;
  private $routerStoreProxy: IRouterStoreProxy;

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

  /**
   * @stable [18.12.2019]
   * @returns {IRouterStoreProxy}
   */
  protected get routerStoreProxy(): IRouterStoreProxy {
    return this.$routerStoreProxy = this.$routerStoreProxy || getRouterStoreProxyFactoryFactory()(this);
  }
}
