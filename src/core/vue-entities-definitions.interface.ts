import { Store } from 'redux';
import Vue from 'vue';

import {
  IEntity,
  AnyT,
  IDispatchFormChangesWrapper,
} from './definitions.interface';
import { IUniversalApplicationStoreEntity } from './entities-definitions.interface';
import {
  IVueIsContainer$Wrapper,
  IVueSection$Wrapper,
  IVueState$Wrapper,
  IVueStore$Wrapper,
  IVueComponent$Wrapper,
  IVueEvents$Wrapper,
  IVueBindings$Wrapper,
  IVueRenderer$Wrapper,
  IVueName$Wrapper,
  IVueStyle$Wrapper,
} from './vue-definitions.interface';

/**
 * @stable [11.11.2018]
 */
export interface IVueGridColumnConfiguration
  extends IVueName$Wrapper,
          IVueStyle$Wrapper,
          IVueRenderer$Wrapper<(entity: IEntity,
                                column: IVueGridColumnConfiguration,
                                entityValue?: AnyT) => string | boolean | number> {
}

/**
 * @stable [11.11.2018]
 */
export interface IVueGridColumnDynamicEntity extends IVueComponent$Wrapper,
                                                     IVueEvents$Wrapper,
                                                     IVueBindings$Wrapper {
}

/**
 * @stable [21.10.2018]
 */
export interface IVueContainer<TApplicationStoreEntity extends IVueApplicationStoreEntity = IVueApplicationStoreEntity>
  extends Vue,
          IVueSection$Wrapper,
          IVueStore$Wrapper<Store<TApplicationStoreEntity>>,
          IVueState$Wrapper<TApplicationStoreEntity>,
          IVueIsContainer$Wrapper,
          IDispatchFormChangesWrapper {
}

/**
 * @stable [22.10.2018]
 */
export interface IVueContainerCtor {
  new (): IVueContainer;
}

/**
 * @stable [21.10.2018]
 */
export interface IVueApplicationStoreEntity<TDictionaries = {}> extends IUniversalApplicationStoreEntity<TDictionaries> {
}
