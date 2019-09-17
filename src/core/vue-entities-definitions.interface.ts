import { Store } from 'redux';
import Vue from 'vue';

import { toType } from './util';
import {
  IEntity,
  AnyT,
  ISectionNameWrapper,
} from './definitions.interface';
import {
  IUniversalStoreEntity,
  IDispatchEntity,
} from './entities-definitions.interface';
import {
  IVueState$Wrapper,
  IVueStore$Wrapper,
  IVueComponent$Wrapper,
  IVueEvents$Wrapper,
  IVueBindings$Wrapper,
  IVueRenderer$Wrapper,
  IVueName$Wrapper,
  IVueStyle$Wrapper,
  IVueOnMount$Wrapper,
  IVueGetInitialData$Wrapper,
  VueComponentOptionsT,
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
 * @stable [17.11.2018]
 */
export interface IVueComponent extends Vue,
                                       IVueGetInitialData$Wrapper {
}

/**
 * @stable [21.10.2018]
 */
export interface IVueContainer<TApplicationStoreEntity extends IVueApplicationStoreEntity = IVueApplicationStoreEntity>
  extends Vue,
          ISectionNameWrapper,
          IVueStore$Wrapper<Store<TApplicationStoreEntity>>,
          IVueState$Wrapper<TApplicationStoreEntity>,
          IVueOnMount$Wrapper,
          IDispatchEntity {
}

/**
 * @stable [22.10.2018]
 */
export type IVueContainerCtor = new () => IVueContainer;

/**
 * @stable [21.10.2018]
 */
export interface IVueApplicationStoreEntity<TDictionaries = {}> extends IUniversalStoreEntity<TDictionaries> {
}

/**
 * @stable [20.12.2018]
 * @returns {{data(): void}}
 */
export const vueDefaultComponentConfigFactory: () => VueComponentOptionsT = () => ({
  data() {
    return toType<IVueComponent>(this).getInitialData$();
  },
});
