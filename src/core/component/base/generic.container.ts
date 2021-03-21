import { IEffectsAction } from 'redux-effects-promise';

import { AnyT } from '../../definitions.interface';
import { GenericComponent } from './generic.component';
import {
  DynamicRoutesT,
  IAuth,
  IDialogFormChangesConfirmStoreProxy,
  IDictionaryStoreProxy,
  IFormStoreProxy,
  IGenericContainer,
  IGenericContainerProps,
  IGenericContainerState,
  IListStoreProxy,
  INotificationStoreProxy,
  IOperationEntity,
  IPermissionsManager,
  IReduxUserEntity,
  IRouterStoreProxy,
  IStoreProxy,
  ITabPanelStoreProxy,
  IUserActivityManager,
} from '../../definition';
import {
  DiServices,
  getDialogFormChangesConfirmStoreProxyFactory,
  getDictionaryStoreProxyFactory,
  getFormStoreProxyFactory,
  getListStoreProxyFactory,
  getNotificationStoreProxyFactory,
  getPermissionsManager,
  getRouterStoreProxyFactory,
  getStoreProxyFactory,
  getTabPanelStoreProxyFactory,
  getUserActivityManager,
} from '../../di';
import { hasTransportWrapperQueueOperations } from '../../util';

export class GenericContainer<TProps extends IGenericContainerProps = IGenericContainerProps,
  TState extends IGenericContainerState = IGenericContainerState,
  TSelfRef = AnyT,
  TPermission = {}>
  extends GenericComponent<TProps, TState, TSelfRef>
  implements IGenericContainer<TProps> {

  private $auth: IAuth;
  private $dfccStoreProxy: IDialogFormChangesConfirmStoreProxy;
  private $dictionaryStoreProxy: IDictionaryStoreProxy;
  private $dynamicRoutes: DynamicRoutesT;
  private $formStoreProxy: IFormStoreProxy;
  private $listStoreProxy: IListStoreProxy;
  private $notificationStoreProxy: INotificationStoreProxy;
  private $permissionsManager: IPermissionsManager<TPermission>;
  private $routerStoreProxy: IRouterStoreProxy;
  private $storeProxy: IStoreProxy;
  private $tabPanelStoreProxy: ITabPanelStoreProxy;
  private $userActivityManager: IUserActivityManager;

  /**
   * @stable [21.03.2021]
   * @param originalProps
   */
  constructor(originalProps: TProps) {
    super(originalProps);

    this.onChangeFullscreen = this.onChangeFullscreen.bind(this);
  }

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
   * @stable [12.04.2020]
   * @returns {IFormStoreProxy}
   */
  public get tabPanelStoreProxy(): ITabPanelStoreProxy {
    return this.$tabPanelStoreProxy = this.$tabPanelStoreProxy || getTabPanelStoreProxyFactory()(this);
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
   * @stable [21.03.2021]
   */
  protected onChangeFullscreen(): void {
    const fullscreenEnabled = this.isFullScreenEnabled;

    this.setState(
      () => ({fullscreenEnabled: !fullscreenEnabled}),
      fullscreenEnabled
        ? this.domAccessor.disableFullScreen
        : this.domAccessor.enableFullScreen
    );
  }

  /**
   * @stable [21.03.2021]
   */
  protected get isFullScreenEnabled(): boolean {
    return this.state.fullscreenEnabled;
  }

  /**
   * @stable [23.04.2020]
   * @returns {string}
   */
  protected get sectionName(): string {
    return this.props.sectionName;
  }

  /**
   * @stable [16.04.2020]
   * @returns {TUser}
   */
  protected getUser<TUser extends IReduxUserEntity>(): TUser {
    return this.originalProps.user as TUser;
  }

  /**
   * @stable [30.03.2020]
   * @param {string | IOperationEntity} operations
   * @returns {boolean}
   */
  protected hasTransportWorkingOperations(...operations: (string | IOperationEntity)[]): boolean {
    return hasTransportWrapperQueueOperations(this.props, ...operations);
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
   * @returns {IStoreProxy}
   */
  protected get storeProxy(): IStoreProxy {
    return this.$storeProxy = this.$storeProxy || getStoreProxyFactory()(this);
  }

  /**
   * @stable [30.03.2020]
   * @returns {IPermissionsManager<TPermission>}
   */
  protected get permissionsManager(): IPermissionsManager<TPermission> {
    return this.$permissionsManager = this.$permissionsManager || getPermissionsManager<TPermission>();
  }

  /**
   * @stable [30.03.2020]
   * @returns {IUserActivityManager}
   */
  protected get userActivityManager(): IUserActivityManager {
    return this.$userActivityManager = this.$userActivityManager || getUserActivityManager();
  }

  /**
   * @stable [12.06.2020]
   * @returns {IAuth}
   */
  protected get auth(): IAuth {
    return this.$auth = this.$auth || DiServices.auth();
  }

  /**
   * @stable [12.06.2020]
   * @returns {DynamicRoutesT}
   */
  protected get dynamicRoutes(): DynamicRoutesT {
    return this.$dynamicRoutes = this.$dynamicRoutes || DiServices.dynamicRoutes();
  }
}
