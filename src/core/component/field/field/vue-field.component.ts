import * as R from 'ramda';
import { Prop } from 'vue-property-decorator';

import { orEmpty, isDef } from '../../../util';
import { AnyT, IKeyValue } from '../../../definitions.interface';
import {
  VueCreateElementFactoryT,
  VueNodeT,
  VUE_VALUE$_FIELD,
  VUE_PLACEHOLDER$_FIELD,
  VueComponentOptionsT,
  VueAccessorsT,
} from '../../../vue-definitions.interface';
import { IVueContainer } from '../../../vue-entities-definitions.interface';
import { IVueFieldInputPropsEntity } from './vue-field.interface';
import { VueBaseComponent } from '../../base/vue-index';

export class VueField extends VueBaseComponent {
  @Prop() protected value: AnyT;
  @Prop() protected type: string;
  @Prop() protected name: string;
  @Prop() protected label: string;
  @Prop() protected icon: string;
  @Prop() protected placeholder: string;
  @Prop() protected autoFocus: boolean;
  @Prop() protected bindContainer: IVueContainer;
  @Prop() protected bindStore: IKeyValue;

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
      methods: this.getMethods(),
      template: `
        <vue-flex-layout row="true"
                         alignItemsCenter="true"
                         class='${this.getFieldClassName()}'>
          <input ref="self"
                 :placeholder="${VUE_PLACEHOLDER$_FIELD}"
                 v-bind="getBindings()"
                 v-on="getListeners()"
                 v-model:value="${VUE_VALUE$_FIELD}"
                 class="${this.getInputClassName()}">
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

    if (isDef(this.bindContainer)) {
      this.bindContainer.dispatchFormChanges({[this.name]: newValue});
    }
  }

  /**
   * @stable [21.10.2018]
   * @returns {string}
   */
  protected getFieldClassName(): string {
    return 'vue-field rac-flex rac-flex-full rac-flex-row';
  }

  protected getInputClassName(): string {
    return 'vue-field-input';
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
    return orEmpty(
      !R.isNil(this.label),
      () => `<label class="vue-field-label">${this.t(this.label)}</label>`
    );
  }

  /**
   * @stable [13.11.2018]
   * @returns {Partial<HTMLInputElement>}
   */
  protected getInputBindings(): Partial<HTMLInputElement> {
    return {
      type: this.type || 'text',
      checked: !!this.getValue(),
    };
  }

  protected getInputListeners(): any {  // TODO
    return {};
  }

  protected getValue(): AnyT {
    return isDef(this.bindStore) ? this.bindStore[this.name] : this.value;
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
        get: () => this.getValue(),
        set: (newValue) => this.onChange(newValue),
      },
      autoFocus$: {
        get: () => 'true',
      },
      placeholder$: {
        get: () => orEmpty(!R.isNil(this.placeholder), () => this.t(this.placeholder)),
      },
    };
  }

  /**
   * @stable [13.11.2018]
   * @returns {{[p: string]: () => AnyT}}
   */
  protected getMethods(): { [methodName: string]: () => AnyT } {
    return {
      getBindings: () => this.getInputBindings(),
      getListeners: () => this.getInputListeners(),
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
