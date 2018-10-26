import * as R from 'ramda';
import { Prop } from 'vue-property-decorator';

import { orEmpty } from '../../../util';
import { AnyT } from '../../../definitions.interface';
import {
  VueCreateElementFactoryT,
  VueNodeT,
  VUE_VALUE$_FIELD,
  VUE_TYPE$_FIELD,
  VUE_PLACEHOLDER$_FIELD,
  VueComponentOptionsT,
  VueAccessorsT,
} from '../../../vue-definitions.interface';
import { IVueFieldInputPropsEntity } from './vue-field.interface';
import { VueBaseComponent } from '../../base/vue-index';

export class VueField extends VueBaseComponent {
  @Prop() protected value: AnyT;
  @Prop() protected type: string;
  @Prop() protected label: string;
  @Prop() protected icon: string;
  @Prop() protected placeholder: string;
  @Prop() protected autoFocus: boolean;

  /**
   * @stable [26.10.2018]
   */
  public mounted() {
    if (this.autoFocus) {
      this.setFocus();
    }
  }

  /**
   * @stable [21.10.2018]
   * @param {VueCreateElementFactoryT} createElement
   * @returns {VueNodeT}
   */
  public render(createElement: VueCreateElementFactoryT): VueNodeT {
    const options: VueComponentOptionsT = {
      computed: this.getInputPropsEntity() as VueAccessorsT,
      template: `
        <vue-flex-layout row="true"
                         alignItemsCenter="true"
                         class='${this.getFieldClassName()}'>
          <input ref="self"
                 :type="${VUE_TYPE$_FIELD}"
                 :placeholder="${VUE_PLACEHOLDER$_FIELD}"
                 v-model:value="${VUE_VALUE$_FIELD}"
                 class="vue-field-input rac-flex-full">
          ${this.getLabelElement()}
          ${this.getFieldAttachmentElement()}
        </vue-flex-layout>
      `,
    };
    return createElement(options);
  }

  /**
   * @stable [21.10.2018]
   * @param {AnyT} newValue
   */
  protected onChange(newValue: AnyT): void {
    this.$emit('change', newValue);
  }

  /**
   * @stable [21.10.2018]
   * @returns {string}
   */
  protected getFieldClassName(): string {
    return 'vue-field rac-flex rac-flex-full rac-flex-row';
  }

  /**
   * @stable [21.10.2018]
   * @returns {string}
   */
  protected getFieldAttachmentElement(): string {
    return '';
  }

  /**
   * @stable [22.10.2018]
   * @returns {string}
   */
  protected getLabelElement(): string {
    return '';
  }

  /**
   * @stable [26.10.2018]
   * @returns {IVueFieldInputPropsEntity}
   */
  protected getInputPropsEntity(): any /*IVueFieldInputPropsEntity*/ {
    /**
     * We need to have an ability to set a default values via inheritance.
     */
    return {
      value$: {
        get: () => this.value,
        set: (newValue) => this.onChange(newValue),
      },
      autoFocus$: {
        get: () => 'true',
      },
      type$: {
        get: () => this.type || 'text',
      },
      placeholder$: {
        get: () => orEmpty(!R.isNil(this.placeholder), () => this.t(this.placeholder)),
      },
    };
  }

  /**
   * @stable [26.10.2018]
   * @returns {HTMLInputElement}
   */
  protected get inputEl(): HTMLInputElement {
    return this.$children[0].$refs.self as HTMLInputElement;
  }

  /**
   * @stable [26.10.2018]
   */
  protected setFocus(): void {
    this.inputEl.focus();
  }
}
