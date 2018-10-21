import Vue from 'vue';

import { addRootElement, fromMapToObject } from '../util';
import { appContainer, DI_TYPES } from '../di';
import { VueNodeT, VueCreateElementFactoryT } from '../vue-definitions.interface';
import { VUE_DYNAMIC_ROUTES } from '../router/vue-index';
import { VueApplicationContainer } from '../component/application/vue-index';

/**
 * @stable [21.10.2018]
 * @param {typeof VueApplicationContainer} applicationContainerCtor
 */
export const bootstrapVueApp = <TApplicationStoreEntity>(applicationContainerCtor: typeof VueApplicationContainer) => {
  addRootElement('appId');

  // The Vue app needs in lazy route initializing.
  appContainer.bind(DI_TYPES.Routes).toConstantValue(fromMapToObject(VUE_DYNAMIC_ROUTES));

  new Vue({
    el: '#appId',
    render: (createElement: VueCreateElementFactoryT): VueNodeT => createElement(applicationContainerCtor),
  });
};
