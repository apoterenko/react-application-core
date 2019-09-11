import { Store } from 'redux';

import { DI_TYPES } from './di.interface';
import { staticInjector } from './di.support';
import { INumberConverter } from '../converter';
import { IUIFactory } from '../component/factory/factory.interface';
import { TranslatorT } from '../translation';
import { ISettings } from '../settings';
import { IStorage } from '../storage';
import { IUniversalComponentClassEntity, UniversalComponentPluginFactoryT } from '../entities-definitions.interface';

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
 * @returns {Map<IUniversalComponentClassEntity, UniversalComponentPluginFactoryT>}
 */
export const getUiPlugins = (): Map<IUniversalComponentClassEntity, UniversalComponentPluginFactoryT> =>
  staticInjector(DI_TYPES.UIPlugins);

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
