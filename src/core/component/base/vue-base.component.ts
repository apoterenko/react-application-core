import Vue from 'vue';
import { Prop } from 'vue-property-decorator';

import { isDef } from '../../util';
import { DI_TYPES, lazyInject } from '../../di';
import { ApplicationTranslatorT } from '../../translation';
import { IKeyValue } from '../../definitions.interface';
import { IApplicationSettings } from '../../settings';
import { IVueContainer } from '../../vue-entities-definitions.interface';

export class VueBaseComponent<TState = IKeyValue> extends Vue {
  @lazyInject(DI_TYPES.Translate) protected t: ApplicationTranslatorT;
  @lazyInject(DI_TYPES.Settings) protected settings: IApplicationSettings;
  @Prop() protected styles: IKeyValue;
  @Prop() protected bindContainer: IVueContainer;
  @Prop() protected bindStore: IKeyValue;

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
}
