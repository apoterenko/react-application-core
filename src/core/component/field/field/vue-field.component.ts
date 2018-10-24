import { Prop } from 'vue-property-decorator';

import { AnyT } from '../../../definitions.interface';
import {
  VueCreateElementFactoryT,
  VueNodeT,
  VUE_VALUE$_FIELD,
  VUE_TYPE$_FIELD,
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

  /**
   * @stable [21.10.2018]
   * @param {VueCreateElementFactoryT} createElement
   * @returns {VueNodeT}
   */
  public render(createElement: VueCreateElementFactoryT): VueNodeT {
    const inputPropsEntity: IVueFieldInputPropsEntity = {
      value$: {
        get: () => this.value,
        set: (newValue) => this.onChange(newValue),
      },
    };
    const options: VueComponentOptionsT = {
      computed: inputPropsEntity as VueAccessorsT,
      data: () => this.$data,
      template: `
        <div class='${this.getFieldClassName()}'>
            <input :type="${VUE_TYPE$_FIELD}"
                   :placeholder="'${this.placeholder}'"
                   v-model:value="${VUE_VALUE$_FIELD}">
            ${this.getLabelElement()}
            ${this.getFieldAttachmentElement()}
        </div>
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
   * @returns {IVueFieldInputPropsEntity}
   */
  protected data(): IVueFieldInputPropsEntity {
    return {
      type$: this.type,
    };
  }

  /**
   * @stable [21.10.2018]
   * @returns {string}
   */
  protected getFieldClassName(): string {
    return 'vue-field';
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
}
