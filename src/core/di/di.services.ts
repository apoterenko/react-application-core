import { Store } from 'redux';

import { DI_TYPES } from './di.interface';
import {
  INumberConverter,
  IDateConverter,
} from '../converter';
import { ISettingsEntity } from '../settings';
import {
  DialogFormChangesConfirmStoreProxyFactoryT,
  DictionaryStoreProxyFactoryT,
  DynamicRoutesT,
  DynamicSectionsMapT,
  FormStoreProxyFactoryT,
  GenericPluginFactoryT,
  GenericPluginsMapT,
  IAsyncLibManager,
  IAuth,
  IBootstrapper,
  IConnectorContainerFactory,
  IConnectorEntity,
  IDomAccessor,
  IEnvironment,
  IEventEmitter,
  IEventManager,
  IFieldConverter,
  IFormStoreProxy,
  IGenericComponentCtor,
  ILogManager,
  IModifyEntityPayloadFactory,
  IPermissionsManager,
  IPhoneConverter,
  IPlaceApi,
  IRoutesEntity,
  IStateSerializer,
  IStorage,
  IStoreEntity,
  ITransport,
  IUiFactory,
  IUniversalComponentProps,
  IUniversalContainerProps,
  IUserActivityManager,
  IViewerLocator,
  ListStoreProxyFactoryT,
  NotificationStoreProxyFactoryT,
  RouterStoreProxyFactoryT,
  StoreProxyFactoryT,
  TabPanelStoreProxyFactoryT,
  TranslatorT,
} from '../definition';
import { staticInjector } from './di.support';

/**
 * @stable [31.10.2018]
 * @returns {INumberConverter}
 */
export const getNumberConverter = (): INumberConverter => staticInjector(DI_TYPES.NumberConverter);

/**
 * @stable [19.02.2020]
 * @returns {IDomAccessor}
 */
export const getDomAccessor = (): IDomAccessor => staticInjector(DI_TYPES.DomAccessor);

/**
 * @stable [24.12.2019]
 * @returns {IPhoneConverter}
 */
export const getPhoneConverter = (): IPhoneConverter => staticInjector(DI_TYPES.PhoneConverter);

/**
 * @stable [16.11.2019]
 * @returns {IPermissionsManager<TAccessConfig>}
 */
export const getPermissionsManager = <TPermission = {}>(): IPermissionsManager<TPermission> =>
  staticInjector(DI_TYPES.PermissionsManager);

/**
 * @stable [16.11.2019]
 * @returns {DynamicRoutesT}
 */
export const getDynamicRoutes = (): DynamicRoutesT => staticInjector(DI_TYPES.DynamicRoutes);

/**
 * @stable [10.09.2020]
 */
const getDynamicSections = (): DynamicSectionsMapT => staticInjector(DI_TYPES.DynamicSections);

/**
 * @stable [16.11.2019]
 * @returns {IAuth}
 */
export const getAuth = (): IAuth => staticInjector(DI_TYPES.Auth);

/**
 * @stable [07.10.2019]
 * @returns {IDateConverter}
 */
export const getDateConverter = (): IDateConverter => staticInjector(DI_TYPES.DateConverter);

/**
 * @stable [03.04.2020]
 * @returns {IStorage}
 */
export const getMultiEntityDatabaseStorage = (): IStorage => staticInjector(DI_TYPES.MultiEntityDatabaseStorage);

/**
 * @stable [18.03.2020]
 * @returns {IUiFactory}
 */
const getUiFactory = (): IUiFactory => staticInjector(DI_TYPES.UiFactory);

/**
 * @stable [19.06.2020]
 * @returns {IViewerLocator}
 */
const getViewerLocator = (): IViewerLocator => staticInjector(DI_TYPES.ViewerLocator);

/**
 * @stable [21.04.2020]
 * @returns {GenericPluginsMapT}
 */
export const getUiPlugins = (): GenericPluginsMapT => staticInjector(DI_TYPES.UiPlugins);

/**
 * @stable [15.11.2018]
 * @returns {TranslatorT}
 */
export const getTranslator = (): TranslatorT => staticInjector(DI_TYPES.Translate);

/**
 * @stable [29.07.2019]
 * @returns {ISettingsEntity}
 */
export const getSettings = (): ISettingsEntity => staticInjector(DI_TYPES.Settings);

/**
 * @stable [06.02.2020]
 * @returns {IRoutesEntity}
 */
export const getRoutes = (): IRoutesEntity => staticInjector(DI_TYPES.Routes);

/**
 * @stable [29.07.2019]
 * @returns {IStorage}
 */
export const getDatabaseStorage = (): IStorage => staticInjector(DI_TYPES.DatabaseStorage);

/**
 * @stable [11.09.2019]
 * @returns {Store<TState>}
 */
export const getStore = <TState>(): Store<TState> => staticInjector(DI_TYPES.Store);

/**
 * @stable [15.09.2019]
 * @returns {ITransport}
 */
export const getTransport = (): ITransport => staticInjector(DI_TYPES.Transport);

/**
 * @stable [20.09.2019]
 * @returns {IEnvironment}
 */
export const getEnvironment = (): IEnvironment => staticInjector(DI_TYPES.Environment);

/**
 * @stable [17.01.2020]
 * @returns {IEventEmitter}
 */
export const getEventEmitter = (): IEventEmitter => staticInjector(DI_TYPES.EventEmitter);

/**
 * @stable [24.09.2019]
 * @returns {IStorage}
 */
export const getStorage = (): IStorage => staticInjector(DI_TYPES.Storage);

/**
 * @stable [24.09.2019]
 * @returns {ILogManager}
 */
export const getLogManager = (): ILogManager => staticInjector(DI_TYPES.LogManager);

/**
 * @stable [24.09.2019]
 * @returns {IEventManager}
 */
export const getEventManager = (): IEventManager => staticInjector(DI_TYPES.EventManager);

/**
 * @stable [09.01.2020]
 * @returns {IAsyncLibManager}
 */
export const getAsyncLibManager = (): IAsyncLibManager => staticInjector(DI_TYPES.AsyncLibManager);

/**
 * @stable [09.01.2020]
 * @returns {IPlaceApi}
 */
export const getPlaceApi = (): IPlaceApi => staticInjector(DI_TYPES.PlacesApi);

/**
 * @stable [09.01.2020]
 * @returns {IFieldConverter}
 */
export const getFieldConverter = (): IFieldConverter => staticInjector(DI_TYPES.FieldConverter);

/**
 * @stable [24.09.2019]
 * @returns {IEventManager}
 */
export const getStateSerializer = (): IStateSerializer => staticInjector(DI_TYPES.StateSerializer);

/**
 * @stable [10.09.2020]
 */
const getModifyEntityPayloadFactory = (): IModifyEntityPayloadFactory => staticInjector(DI_TYPES.ModifyEntityPayloadFactory);

/**
 * @stable [27.11.2019]
 * @returns {(parent: IContainer) => }
 */
export const getDialogFormChangesConfirmStoreProxyFactory = (): DialogFormChangesConfirmStoreProxyFactoryT =>
  staticInjector(DI_TYPES.DialogFormChangesConfirmStoreProxyFactory);

/**
 * @stable [30.03.2020]
 * @returns {StoreProxyFactoryT}
 */
export const getStoreProxyFactory = (): StoreProxyFactoryT => staticInjector(DI_TYPES.StoreProxyFactory);

/**
 * @stable [30.11.2019]
 * @returns {FormStoreProxyFactoryT}
 */
export const getFormStoreProxyFactory = (): FormStoreProxyFactoryT => staticInjector(DI_TYPES.FormStoreProxyFactory);

/**
 * @stable [12.04.2020]
 * @returns {TabPanelStoreProxyFactoryT}
 */
export const getTabPanelStoreProxyFactory = (): TabPanelStoreProxyFactoryT => staticInjector(DI_TYPES.TabPanelStoreProxyFactory);

/**
 * @stable [30.03.2020]
 * @returns {ListStoreProxyFactoryT}
 */
export const getListStoreProxyFactory = (): ListStoreProxyFactoryT => staticInjector(DI_TYPES.ListStoreProxyFactory);

/**
 * @stable [30.03.2020]
 * @returns {NotificationStoreProxyFactoryT}
 */
export const getNotificationStoreProxyFactory = (): NotificationStoreProxyFactoryT =>
  staticInjector(DI_TYPES.NotificationStoreProxyFactory);

/**
 * @stable [18.12.2019]
 * @returns {RouterStoreProxyFactoryT}
 */
export const getRouterStoreProxyFactory = (): RouterStoreProxyFactoryT =>
  staticInjector(DI_TYPES.RouterStoreProxyFactory);

/**
 * @stable [29.02.2020]
 * @returns {DictionaryStoreProxyFactoryT}
 */
export const getDictionaryStoreProxyFactory = (): DictionaryStoreProxyFactoryT =>
  staticInjector(DI_TYPES.DictionaryStoreProxyFactory);

/**
 * @stable [19.12.2019]
 * @returns {IConnectorContainerFactory}
 */
export const getConnectorContainerFactory = (): IConnectorContainerFactory =>
  staticInjector(DI_TYPES.ConnectorContainerFactory);

/**
 * @stable [19.01.2020]
 * @returns {IUserActivityManager}
 */
export const getUserActivityManager = (): IUserActivityManager =>
  staticInjector(DI_TYPES.UserActivityManager);

/**
 * @stable [17.06.2020]
 * @returns {IBootstrapper}
 */
const getWebBootstrapper = (): IBootstrapper =>
  staticInjector(DI_TYPES.WebBootstrapper);

/**
 * @stable [17.06.2020]
 * @returns {IBootstrapper}
 */
export const getReactBootstrapper = (): IBootstrapper =>
  staticInjector(DI_TYPES.ReactBootstrapper);

/**
 * @stable [11.06.2020]
 */
export class DiServices {
  public static readonly auth = getAuth;
  public static readonly dateConverter = getDateConverter;
  public static readonly dynamicRoutes = getDynamicRoutes;
  public static readonly dynamicSections = getDynamicSections;
  public static readonly environment = getEnvironment;
  public static readonly modifyEntityPayloadFactory = getModifyEntityPayloadFactory;
  public static readonly numberConverter = getNumberConverter;
  public static readonly reactBootstrapper = getReactBootstrapper;
  public static readonly settings = getSettings;
  public static readonly store = getStore;
  public static readonly translator = getTranslator;
  public static readonly uiFactory = getUiFactory;
  public static readonly viewerLocator = getViewerLocator;
  public static readonly webBootstrapper = getWebBootstrapper;
}
