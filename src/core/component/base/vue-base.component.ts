import Vue from 'vue';
import * as R from 'ramda';

import { DI_TYPES, lazyInject } from '../../di';
import { ApplicationTranslatorT } from '../../translation';
import { IVueContainer } from '../../vue-entities-definitions.interface';

export class VueBaseComponent extends Vue {
  @lazyInject(DI_TYPES.Translate) protected t: ApplicationTranslatorT;

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
