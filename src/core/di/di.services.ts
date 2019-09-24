import { Store } from 'redux';

import { DI_TYPES } from './di.interface';
import { INumberConverter } from '../converter';
import { ISettings } from '../settings';
import {
  IEnvironment,
  IEventManager,
  ILogManager,
  IStorage,
  ITransport,
  IUniversalComponentEntity,
  UniversalPluginFactoryT,
} from '../definition';
import { IUIFactory } from '../component/factory/factory.interface';
import { IUniversalComponentCtor } from '../entities-definitions.interface';
import { staticInjector } from './di.support';
import { TranslatorT } from '../translation';

/**
 * @stable [31.10.2018]
 * @returns {INumberConverter}
 */
export const getNumberConverter = (): INumberConverter => staticInjector(DI_TYPES.NumberConverter);

/**
 * @stable [09.11.2018]
 * @returns {IUIFactory}
 */
export const getUiFactory = (): IUIFactory => staticInjector(DI_TYPES.UIFactory);

/**
 * @stable [21.08.2019]
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
 * @returns {ISettings}
 */
export const getSettings = (): ISettings => staticInjector(DI_TYPES.Settings);

/**
 * @stable [29.07.2019]
 * @returns {IStorage}
 */
export const getDatabaseStorage = (): IStorage => staticInjector(DI_TYPES.DatabaseStorage);

/**
 * @stable [23.02.2019]
 * @returns {TApi}
 */
export const getApi = <TApi>(): TApi => staticInjector(DI_TYPES.Api);

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
