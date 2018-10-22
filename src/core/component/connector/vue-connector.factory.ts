import { Unsubscribe } from 'redux';

import { isFn } from '../../util';
import { UniversalConnectorActionBuilder } from './universal-connector-action.builder';
import { IKeyValue } from '../../definitions.interface';
import { VueComponentOptionsT } from '../../vue-definitions.interface';
import { IVueContainer, IVueApplicationStoreEntity } from '../../vue-entities-definitions.interface';
import { IVueConnectorOptionsConfigEntity } from './vue-connector.interface';

/**
 * @stable [22.10.2018]
 * @param {IVueConnectorOptionsConfigEntity<TApplicationStoreEntity extends IVueApplicationStoreEntity>} config
 * @returns {VueComponentOptionsT<IVueContainer>}
 */
export const vueConnectorOptionsFactory = <TApplicationStoreEntity extends IVueApplicationStoreEntity = IVueApplicationStoreEntity>(
  config: IVueConnectorOptionsConfigEntity<TApplicationStoreEntity>
): VueComponentOptionsT<IVueContainer> => {

  let storeUnsubscriber: Unsubscribe;
  const reduxStoreListeners = [];
  const customComputed = config.customComputed$;

  if (Array.isArray(customComputed)) {
    customComputed.forEach((mapper) => reduxStoreListeners.push(mapper));
  }

  return {
    /**
     * @stable [21.10.2018]
     */
    computed: config.computed,
    template: config.template,
    watch: config.watch,

    /**
     * @stable [21.10.2018]
     */
    data() {
      const initialData = {};
      reduxStoreListeners.forEach((mapper) => Object.assign(initialData, mapper(this.state$)));

      return {
        ...(isFn(config.data) ? (config.data as () => IKeyValue).call(this) : {}),
        ...initialData, // Vue does require initialization of custom computed properties
      };
    },

    /**
     * @stable [21.10.2018]
     */
    beforeCreate() {
      this.isContainer$ = config.isContainer$ !== false;
      this.section$ = config.section$;
    },

    /**
     * @stable [21.10.2018]
     */
    mounted() {
      if (isFn(config.mounted)) {
        config.mounted();
      }

      const self: IVueContainer = this;
      const store = self.store$;

      // Send an init action
      store.dispatch({type: UniversalConnectorActionBuilder.buildInitActionType(self.section$)});

      // Subscribe
      storeUnsubscriber = store.subscribe(() => {
        const state = self.state$;

        /**
         * A "Redux <-> Container" bridge implemented here.
         * Vue is updated when the data is updated via assign new links
         */
        reduxStoreListeners.forEach((mapper) => Object.assign(this, mapper(state)));
      });
    },

    /**
     * @stable [21.10.2018]
     */
    beforeDestroy() {
      if (isFn(storeUnsubscriber)) {
        storeUnsubscriber();
      }
      if (isFn(config.beforeDestroy)) {
        config.beforeDestroy();
      }
    },
  };
};
