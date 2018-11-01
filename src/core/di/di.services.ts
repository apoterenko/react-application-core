import { Store } from 'redux';

import { DI_TYPES } from './di.interface';
import { staticInjector } from './di.support';
import { IUniversalApplicationStoreEntity } from '../entities-definitions.interface';
import { INumberConverter } from '../converter';

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
