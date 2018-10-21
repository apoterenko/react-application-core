import Vue from 'vue';
import * as R from 'ramda';

import { IVueContainer } from '../../vue-entities-definitions.interface';

export class VueBaseComponent extends Vue {

  /**
   * @stable [21.10.2018]
   * @param {IVueContainer} parent
   * @returns {IVueContainer}
   */
  protected findParentContainer(parent: IVueContainer): IVueContainer {
    if (R.isNil(parent) || parent.isContainer$ === true) {
      return parent;
    }
    return this.findParentContainer(parent.$parent);
  }
}
