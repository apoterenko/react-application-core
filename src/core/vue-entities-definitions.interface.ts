import { Store } from 'redux';
import Vue from 'vue';

import { IUniversalApplicationStoreEntity } from './entities-definitions.interface';
import {
  IVueIsContainer$Wrapper,
  IVueSection$Wrapper,
  IVueState$Wrapper,
  IVueStore$Wrapper,
} from './vue-definitions.interface';

/**
 * @stable [21.10.2018]
 */
export interface IVueComponent extends Vue {
}

/**
 * @stable [21.10.2018]
 */
export interface IVueContainer<TApplicationStoreEntity extends IVueApplicationStoreEntity = IVueApplicationStoreEntity>
  extends Vue,
          IVueSection$Wrapper,
          IVueStore$Wrapper<Store<TApplicationStoreEntity>>,
          IVueState$Wrapper<TApplicationStoreEntity>,
          IVueIsContainer$Wrapper {
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
