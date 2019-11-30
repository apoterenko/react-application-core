import { Store } from 'redux';

import { DI_TYPES } from './di.interface';
import {
  INumberConverter,
  IDateConverter,
} from '../converter';
import { ISettingsEntity } from '../settings';
import {
  DynamicRoutesMapT,
  DynamicSectionsMapT,
  IAuth,
  IConnectorEntity,
  IContainer,
  IDialogFormChangesConfirmStoreProxy,
  IEnvironment,
  IEventManager,
  ILogManager,
  IModifyEntityPayloadFactory,
  IPermissionsManager,
  IStateSerializer,
  IStorage,
  IStoreEntity,
  ITransport,
  IUniversalComponentCtor,
  IUniversalComponentProps,
  IUniversalContainerCtor,
  IUniversalContainerProps,
  UniversalPluginFactoryT,
} from '../definition';
import { IUIFactory } from '../component/factory/factory.interface';
import { staticInjector } from './di.support';
import { TranslatorT } from '../translation';

/**
 * @stable [31.10.2018]
 * @returns {INumberConverter}
 */
export const getNumberConverter = (): INumberConverter => staticInjector(DI_TYPES.NumberConverter);

/**
 * @stable [16.11.2019]
 * @returns {IPermissionsManager<TAccessConfig>}
 */
export const getPermissionsManager = <TAccessConfig = {}>(): IPermissionsManager<TAccessConfig> =>
  staticInjector(DI_TYPES.PermissionsManager);

/**
 * @stable [16.11.2019]
 * @returns {DynamicRoutesMapT}
 */
export const getDynamicRoutes = (): DynamicRoutesMapT => staticInjector(DI_TYPES.DynamicRoutes);

/**
 * @stable [17.11.2019]
 * @returns {DynamicSectionsMapT}
 */
export const getDynamicSections = (): DynamicSectionsMapT => staticInjector(DI_TYPES.DynamicSections);

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
 * @stable [09.11.2018]
 * @returns {IUIFactory}
 */
export const getUiFactory = (): IUIFactory => staticInjector(DI_TYPES.UIFactory);

/**
 * @stable [23.10.2019]
 * @returns {Map<IUniversalComponentCtor, UniversalPluginFactoryT>}
 */
export const getUiPlugins = (): Map<IUniversalComponentCtor, UniversalPluginFactoryT> => staticInjector(DI_TYPES.UIPlugins);

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
 * @stable [24.09.2019]
 * @returns {IEventManager}
 */
export const getStateSerializer = (): IStateSerializer => staticInjector(DI_TYPES.StateSerializer);

/**
 * @stable [09.10.2019]
 * @returns {IModifyEntityPayloadFactory}
 */
export const getModifyEntityPayloadFactory = (): IModifyEntityPayloadFactory => staticInjector(DI_TYPES.ModifyEntityPayloadFactory);

/**
 * @stable [27.11.2019]
 * @returns {(parent: IContainer) => }
 */
export const getDialogFormChangesConfirmStoreProxyFactory = (): (parent: IContainer) => IDialogFormChangesConfirmStoreProxy =>
  staticInjector(DI_TYPES.DialogFormChangesConfirmStoreProxyFactory);
