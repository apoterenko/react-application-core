import Vue from 'vue';

import { IUniversalApplicationStoreEntity } from './entities-definitions.interface';
import {
  IVueIsContainer$Wrapper,
  IVueSection$Wrapper,
  IVueState$Wrapper,
} from './vue-definitions.interface';

/**
 * @stable [21.10.2018]
 */
export interface IVueComponent extends Vue {
}

/**
 * @stable [21.10.2018]
 */
export interface IVueContainer extends Vue,
                                       IVueSection$Wrapper,
                                       IVueState$Wrapper<IVueApplicationStoreEntity>,
                                       IVueIsContainer$Wrapper {
}

/**
 * @stable [21.10.2018]
 */
export interface IVueApplicationStoreEntity<TDictionaries = {}> extends IUniversalApplicationStoreEntity<TDictionaries> {
}
