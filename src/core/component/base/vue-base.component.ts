import Vue from 'vue';
import { Prop } from 'vue-property-decorator';

import { DI_TYPES, lazyInject } from '../../di';
import { ApplicationTranslatorT } from '../../translation';
import { IKeyValue } from '../../definitions.interface';
import { IApplicationSettings } from '../../settings';

export class VueBaseComponent<TState = IKeyValue> extends Vue {
  @lazyInject(DI_TYPES.Translate) protected t: ApplicationTranslatorT;
  @lazyInject(DI_TYPES.Settings) protected settings: IApplicationSettings;
  @Prop() protected styles: IKeyValue;

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
