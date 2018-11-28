import Vue from 'vue';
import { Prop } from 'vue-property-decorator';
import * as R from 'ramda';

import { isDef } from '../../util';
import { DI_TYPES, lazyInject } from '../../di';
import { ApplicationTranslatorT } from '../../translation';
import { IKeyValue } from '../../definitions.interface';
import { IApplicationSettings } from '../../settings';
import { IVueContainer, IVueComponent } from '../../vue-entities-definitions.interface';
import { IVueRefs } from '../../vue-definitions.interface';

export class VueBaseComponent<TStore = IKeyValue,
                              TState = IKeyValue> extends Vue
  implements IVueComponent {

  @lazyInject(DI_TYPES.Translate) protected t: ApplicationTranslatorT;
  @lazyInject(DI_TYPES.Settings) protected settings: IApplicationSettings;
  @Prop() protected styles: IKeyValue;
  @Prop() protected bindContainer: IVueContainer;
  @Prop() protected bindStore: TStore;

  /**
   * @stable [19.11.2018]
   * @returns {boolean}
   */
  protected isContainerBound(): boolean {
    return isDef(this.bindContainer);
  }

  /**
   * @stable [17.11.2018]
   * @returns {Element}
   */
  protected getSelf(): Element {
    return this.$refs.self as Element;
  }

  /**
   * @stable [18.11.2018]
   * @returns {TState}
   */
  protected getData(): TState {
    return this.$data as TState;
  }

  /**
   * @stable [26.11.2018]
   * @param {string} slotName
   * @returns {boolean}
   */
  protected hasSlot(slotName: string): boolean {
    return !R.isNil(Reflect.get(this.$slots, slotName));
  }

  /**
   * @stable [28.11.2018]
   * @param {number} index
   * @returns {IVueRefs}
   */
  protected getChildrenRefs(index = 0): IVueRefs {
    return this.$children[index].$refs;
  }
}
