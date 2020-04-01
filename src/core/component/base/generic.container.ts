import { IEffectsAction } from 'redux-effects-promise';

import { AnyT } from '../../definitions.interface';
import { GenericBaseComponent } from './generic-base.component';
import {
  IDialogFormChangesConfirmStoreProxy,
  IDictionaryStoreProxy,
  IFormStoreProxy,
  IGenericContainer,
  IGenericContainerProps,
  IListStoreProxy,
  INotificationStoreProxy,
  IOperationEntity,
  IPermissionsManager,
  IRouterStoreProxy,
  IStoreProxy,
  IUserActivityManager,
} from '../../definition';
import {
  getDialogFormChangesConfirmStoreProxyFactory,
  getDictionaryStoreProxyFactory,
  getFormStoreProxyFactory,
  getListStoreProxyFactory,
  getNotificationStoreProxyFactory,
  getPermissionsManager,
  getRouterStoreProxyFactory,
  getStoreProxyFactory,
  getUserActivityManager,
} from '../../di';
import { hasTransportWrapperQueueOperations } from '../../util';

export class GenericContainer<TProps extends IGenericContainerProps = IGenericContainerProps,
  TState = {},
  TSelfRef = AnyT,
  TPermission = {}>
  extends GenericBaseComponent<TProps, TState, TSelfRef>
  implements IGenericContainer<TProps> {

  private $dfccStoreProxy: IDialogFormChangesConfirmStoreProxy;
  private $dictionaryStoreProxy: IDictionaryStoreProxy;
  private $formStoreProxy: IFormStoreProxy;
  private $listStoreProxy: IListStoreProxy;
  private $notificationStoreProxy: INotificationStoreProxy;
  private $routerStoreProxy: IRouterStoreProxy;
  private $storeProxy: IStoreProxy;

  /**
   * @stable [27.11.2019]
   * @returns {IDialogFormChangesConfirmStoreProxy}
   */
  public get dfccStoreProxy(): IDialogFormChangesConfirmStoreProxy {
    return this.$dfccStoreProxy = this.$dfccStoreProxy || getDialogFormChangesConfirmStoreProxyFactory()(this);
  }

  /**
   * @stable [30.11.2019]
   * @returns {IFormStoreProxy}
   */
  public get formStoreProxy(): IFormStoreProxy {
    return this.$formStoreProxy = this.$formStoreProxy || getFormStoreProxyFactory()(this);
  }

  /**
   * @stable [30.03.2020]
   * @returns {IListStoreProxy}
   */
  public get listStoreProxy(): IListStoreProxy {
    return this.$listStoreProxy = this.$listStoreProxy || getListStoreProxyFactory()(this);
  }

  /**
   * @stable [18.12.2019]
   * @returns {IRouterStoreProxy}
   */
  public get routerStoreProxy(): IRouterStoreProxy {
    return this.$routerStoreProxy = this.$routerStoreProxy || getRouterStoreProxyFactory()(this);
  }

  /**
   * @stable [30.03.2020]
   * @returns {INotificationStoreProxy}
   */
  public get notificationStoreProxy(): INotificationStoreProxy {
    return this.$notificationStoreProxy = this.$notificationStoreProxy || getNotificationStoreProxyFactory()(this);
  }

  /**
   * @stable [29.02.2020]
   * @returns {IDictionaryStoreProxy}
   */
  public get dictionaryStoreProxy(): IDictionaryStoreProxy {
    return this.$dictionaryStoreProxy = this.$dictionaryStoreProxy || getDictionaryStoreProxyFactory()(this);
  }

  /**
   * @stable [30.03.2020]
   * @param {string} type
   * @param {TChanges} data
   */
  public dispatch<TChanges = {}>(type: string, data?: TChanges): void {
    this.storeProxy.dispatch(type, data);
  }

  /**
   * @stable [30.03.2020]
   * @param {IEffectsAction} action
   */
  public dispatchPlainAction(action: IEffectsAction): void {
    this.storeProxy.dispatchPlainAction(action);
  }

  /**
   * @stable [30.03.2020]
   * @param {string} type
   * @param {TData} data
   */
  public dispatchActionByType<TData = {}>(type: string, data?: TData): void {
    this.storeProxy.dispatchActionByType(type, data);
  }

  /**
   * @stable [30.03.2020]
   * @param {string | IOperationEntity} operations
   * @returns {boolean}
   */
  protected hasTransportWorkingOperations(...operations: Array<string | IOperationEntity>): boolean {
    return hasTransportWrapperQueueOperations(this.props);
  }

  /**
   * @stable [30.03.2020]
   * @returns {IStoreProxy}
   */
  protected get storeProxy(): IStoreProxy {
    return this.$storeProxy = this.$storeProxy || getStoreProxyFactory()(this);
  }

  /**
   * @stable [30.03.2020]
   * @param {TPermission} permission
   * @returns {boolean}
   */
  protected hasPermission(permission: TPermission): boolean {
    return this.permissionsManager.isAccessible(permission);
  }

  /**
   * @stable [30.03.2020]
   * @returns {IPermissionsManager<TPermission>}
   */
  protected get permissionsManager(): IPermissionsManager<TPermission> {
    return getPermissionsManager<TPermission>();
  }

  /**
   * @stable [30.03.2020]
   * @returns {IUserActivityManager}
   */
  protected get userActivityManager(): IUserActivityManager {
    return getUserActivityManager();
  }
}
