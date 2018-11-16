import { Store } from 'redux';

import { DI_TYPES } from './di.interface';
import { staticInjector } from './di.support';
import { IUniversalApplicationStoreEntity } from '../entities-definitions.interface';
import { INumberConverter } from '../converter';
import { IUIFactory } from '../component/factory/factory.interface';
import { ApplicationTranslatorT } from '../translation';

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
 * @returns {ApplicationTranslatorT}
 */
export const getTranslator = (): ApplicationTranslatorT => staticInjector<ApplicationTranslatorT>(DI_TYPES.Translate);
