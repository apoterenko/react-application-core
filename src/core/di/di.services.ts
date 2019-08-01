import { DI_TYPES } from './di.interface';
import { staticInjector } from './di.support';
import { INumberConverter } from '../converter';
import { IUIFactory } from '../component/factory/factory.interface';
import { TranslatorT } from '../translation';
import { ISettings } from '../settings';
import { IStorage } from '../storage';

let settings: ISettings;
let databaseStorage: IStorage;

/**
 * @stable [31.10.2018]
 * @returns {INumberConverter}
 */
export const getNumberConverter = (): INumberConverter => staticInjector<INumberConverter>(DI_TYPES.NumberConverter);

/**
 * @stable [09.11.2018]
 * @returns {IUIFactory}
 */
export const getUiFactory = (): IUIFactory => staticInjector<IUIFactory>(DI_TYPES.UIFactory);

/**
 * @stable [15.11.2018]
 * @returns {TranslatorT}
 */
export const getTranslator = (): TranslatorT => staticInjector<TranslatorT>(DI_TYPES.Translate);

/**
 * @stable [29.07.2019]
 * @returns {ISettings}
 */
export const getSettings = (): ISettings =>
  settings = settings || staticInjector<ISettings>(DI_TYPES.Settings);

/**
 * @stable [29.07.2019]
 * @returns {IStorage}
 */
export const getDatabaseStorage = (): IStorage =>
  databaseStorage = databaseStorage || staticInjector<IStorage>(DI_TYPES.DatabaseStorage);

/**
 * @stable [23.02.2019]
 * @returns {TApi}
 */
export const getApi = <TApi>(): TApi => staticInjector<TApi>(DI_TYPES.Api);
