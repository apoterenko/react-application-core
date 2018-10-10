import Vue, { ComponentOptions } from 'vue';
import { Vue as VueTypes, VueConstructor } from 'vue/types/vue';

import { IAppStateWrapper } from './definitions.interface';

/**
 * @stable [10.10.2018]
 */
export interface IVueContainerCtorEntity<TContainer extends Vue> extends VueConstructor<TContainer> {
  new(...args: any[]): IVueContainerEntity<any>; // TODO
}

/**
 * @stable [01.10.2018]
 */
export interface IVueContainerEntity<TApplicationStoreEntity> extends ComponentOptions<VueTypes>,
                                                                      IAppStateWrapper<TApplicationStoreEntity> {
  $route?: any;
  sectionName?: string;
}
