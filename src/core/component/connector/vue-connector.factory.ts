import { ComponentOptions, DefaultData, DefaultMethods, DefaultComputed, PropsDefinition } from 'vue/types/options';
import { Unsubscribe } from 'redux';
import * as R from 'ramda';
import { LoggerFactory } from 'ts-smart-logger';

import { isFn } from '../../util';
import { UniversalConnectorActionBuilder } from './universal-connector-action.builder';
import { IKeyValue, AnyT } from '../../definitions.interface';
import { VueComponentOptionsT } from '../../vue-definitions.interface';
import { IVueContainer, IVueApplicationStoreEntity } from '../../vue-entities-definitions.interface';
import { IVueConnectorOptionsConfigEntity } from './vue-connector.interface';

const logger = LoggerFactory.makeLogger('vue-connector.factory');

/**
 * @stable [23.10.2018]
 * @param {IVueConnectorOptionsConfigEntity<TApplicationStoreEntity extends IVueApplicationStoreEntity>} config
 * @returns {VueComponentOptionsT<IVueContainer<TApplicationStoreEntity extends IVueApplicationStoreEntity>>}
 */
export const vueConnectorOptionsFactory = <TApplicationStoreEntity extends IVueApplicationStoreEntity = IVueApplicationStoreEntity>(
  config: IVueConnectorOptionsConfigEntity<TApplicationStoreEntity>
): VueComponentOptionsT<IVueContainer<TApplicationStoreEntity>> => {

  let storeUnsubscriber: Unsubscribe;
  const reduxStoreListeners: Array<(state: TApplicationStoreEntity) => AnyT> = [];
  const customComputed = config.customComputed$;

  if (Array.isArray(customComputed)) {
    customComputed.forEach((mapper) => reduxStoreListeners.push(mapper));
  }

  return {
    /**
     * @stable [21.10.2018]
     */
    components: config.components,
    computed: config.computed,
    template: config.template,
    watch: config.watch,
    beforeUpdate: config.beforeUpdate,
    updated: config.updated,
    methods: config.methods,

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
      this.section$ = config.section$;
    },

    /**
     * @stable [21.10.2018]
     */
    mounted() {
      logger.debug(`[$vueConnectorOptionsFactory][mounted] Section: ${config.section$}`);

      const self: IVueContainer = this;
      const store = self.store$;

      if (isFn(config.mounted)) {
        config.mounted();
      }
      if (isFn(self.onMount$)) {
        self.onMount$();
      }

      // Send an init action
      store.dispatch({type: UniversalConnectorActionBuilder.buildInitActionType(self.section$)});

      const cachedReduxLinks = new Map<((...AnyT) => void), AnyT>();

      // Subscribe
      storeUnsubscriber = store.subscribe(() => {
        const state = self.state$ as TApplicationStoreEntity;

        /**
         * A "Redux <-> Container" bridge implemented here.
         * Vue is updated when the data is updated via assign new links
         */
        reduxStoreListeners.forEach((shallowMapper) => {
          const reduxData = shallowMapper(state);
          const needToUpdateReactiveLinks = [];

          R.forEachObjIndexed((primitiveValueOrLinkToComplexObject, mappedKey) => {
            let cachedReduxLinksByMapper = cachedReduxLinks.get(shallowMapper);
            if (!R.isNil(cachedReduxLinksByMapper)) {
              if ((mappedKey in cachedReduxLinksByMapper)) {
                /**
                 * Here we compare links to complex objects or primitives (without deep copy!).
                 * Reducers change the links to objects, therefore, we should compare only links.
                 */
                if (cachedReduxLinksByMapper[mappedKey] !== primitiveValueOrLinkToComplexObject) {
                  needToUpdateReactiveLinks.push(mappedKey);
                }
              } else {
                needToUpdateReactiveLinks.push(mappedKey);
              }
            } else {
              cachedReduxLinks.set(shallowMapper, cachedReduxLinksByMapper = Object.create(null));
              needToUpdateReactiveLinks.push(mappedKey);
            }
            cachedReduxLinksByMapper[mappedKey] = primitiveValueOrLinkToComplexObject;
          }, reduxData);

          if (needToUpdateReactiveLinks.length > 0) {

            // Need to set and clone reactive data only when the bind snapshot was changed because of:
            // 1. performance
            // 2. vue does replace recursively all links to reactive

            needToUpdateReactiveLinks.forEach((linkToUpdate) => {
              this[linkToUpdate] = R.clone(reduxData[linkToUpdate]);

              logger.debug(
                `[$vueConnectorOptionsFactory][mounted] The reactive link for container ${
                  this.$vnode.tag} has been updated! Updated link:`, linkToUpdate
              );
            });
          }

          if (isFn(config.forceUpdateOnChangeData$)) {
            const previousValue = cachedReduxLinks.get(config.forceUpdateOnChangeData$);
            const currentValue = config.forceUpdateOnChangeData$(state);

            if (!R.isNil(currentValue) && previousValue !== currentValue) {
              self.$forceUpdate();
              cachedReduxLinks.set(config.forceUpdateOnChangeData$, currentValue);

              logger.debug(
                `[$vueConnectorOptionsFactory][mounted] The "forceUpdate" value has been changed => need to call $forceUpdate. ${
                    this.$vnode.tag
                  }`,
              );
            }
          }
        });
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

    /**
     * @stable [21.01.2019]
     */
    destroyed() {
      const self: IVueContainer = this;
      const store = self.store$;

      // Send an destroy action
      store.dispatch({type: UniversalConnectorActionBuilder.buildDestroyActionType(self.section$)});
    },
  };
};
