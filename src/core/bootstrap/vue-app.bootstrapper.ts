import Vue from 'vue';
import { Store } from 'redux';

import { addRootElement } from '../util';
import { IVueContainerCtorEntity } from '../vue-entities-definitions.interface';

/**
 * @stable [10.10.2018]
 * @param {IVueContainerCtorEntity} applicationContainerCtor
 * @param {Store<TApplicationStoreEntity>} store
 */
export const bootstrapVueApp = <TApplicationStoreEntity>(applicationContainerCtor: IVueContainerCtorEntity<any>,  // TODO any
                                                         store: Store<TApplicationStoreEntity>) => {
  addRootElement('appId');

  const app = new Vue({
    el: '#appId',
    render: (factory) => factory(applicationContainerCtor, {
      props: {
        appState: store.getState(),
      },
    }),
  });

  store.subscribe(() => app.$forceUpdate());
};
