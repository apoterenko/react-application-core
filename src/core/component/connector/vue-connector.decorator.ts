import Vue from 'vue';

import { VueConstructorT } from '../../vue-definitions.interface';

/**
 * @stable [22.10.2018]
 * @param {string} name
 * @returns {(target: VueConstructorT) => VueConstructorT}
 * @constructor
 */
export const ComponentName = (name: string): (target: VueConstructorT) => VueConstructorT => {
  return (target: VueConstructorT): VueConstructorT => Vue.component(name, target);
};
