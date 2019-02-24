import { Store } from 'redux';

import { DI_TYPES } from './di.interface';
import { staticInjector } from './di.support';
import { IUniversalApplicationStoreEntity } from '../entities-definitions.interface';
import { INumberConverter } from '../converter';
import { IUIFactory } from '../component/factory/factory.interface';
import { TranslatorT } from '../translation';
import { ITransport } from '../transport';
import { IEventManager } from '../event';

/**
 * @stable [20.10.2018]
 * @returns {Store<TStoreEntity extends IUniversalApplicationStoreEntity>}
 */
export const getStore = <TStoreEntity extends IUniversalApplicationStoreEntity>(): Store<TStoreEntity> =>
  staticInjector<Store<TStoreEntity>>(DI_TYPES.Store);

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
 * @stable [23.02.2019]
 * @returns {ITransport}
 */
export const getTransport = (): ITransport => staticInjector<ITransport>(DI_TYPES.Transport);

/**
 * @stable [23.02.2019]
 * @returns {TApi}
 */
export const getApi = <TApi>(): TApi => staticInjector<TApi>(DI_TYPES.Api);

/**
 * @stable [24.02.2019]
 * @returns {IEventManager}
 */
export const getEventManager = (): IEventManager => staticInjector<IEventManager>(DI_TYPES.EventManager);
