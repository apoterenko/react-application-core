import Vue from 'vue';
import * as R from 'ramda';
import { Prop } from 'vue-property-decorator';

import { DI_TYPES, lazyInject } from '../../di';
import { ApplicationTranslatorT } from '../../translation';
import { IKeyValue } from '../../definitions.interface';
import { IVueContainer } from '../../vue-entities-definitions.interface';
import { IApplicationSettings } from '../../settings';

export class VueBaseComponent extends Vue {
  @lazyInject(DI_TYPES.Translate) protected t: ApplicationTranslatorT;
  @lazyInject(DI_TYPES.Settings) protected settings: IApplicationSettings;
  @Prop() protected styles: IKeyValue;

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
