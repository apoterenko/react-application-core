import {
  getDialogFormChangesConfirmStoreProxyFactory,
  getDictionaryStoreProxyFactory,
  getFormStoreProxyFactory,
  getRouterStoreProxyFactory,
} from '../../di';
import {
  IContainerProps,
  IDialogFormChangesConfirmStoreProxy,
  IDictionaryStoreProxy,
  IFormStoreProxy,
  IRouterStoreProxy,
  IGenericBasicContainer,
} from '../../definition';
import { BaseContainer } from './base.container';

export class BasicContainer<TProps extends IContainerProps = IContainerProps,
  TState = {}>
  extends BaseContainer<TProps, TState>
  implements IGenericBasicContainer {

  private $dfccStoreProxy: IDialogFormChangesConfirmStoreProxy;
  private $dictionaryStoreProxy: IDictionaryStoreProxy;
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
    return this.$routerStoreProxy = this.$routerStoreProxy || getRouterStoreProxyFactory()(this);
  }

  /**
   * @stable [29.02.2020]
   * @returns {IDictionaryStoreProxy}
   */
  public get dictionaryStoreProxy(): IDictionaryStoreProxy {
    return this.$dictionaryStoreProxy = this.$dictionaryStoreProxy || getDictionaryStoreProxyFactory()(this);
  }
}
