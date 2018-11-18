import * as R from 'ramda';
import { Prop } from 'vue-property-decorator';

import { orEmpty, isDef, defValuesFilter, orUndef, orDefault } from '../../../util';
import { AnyT, IKeyValue } from '../../../definitions.interface';
import { VueBaseComponent } from '../../base/vue-index';
import {
  VueCreateElementFactoryT,
  VueNodeT,
  VueComponentOptionsT,
  VueAccessorsT,
  VueDefaultMethodsT,
  IVueRefs,
} from '../../../vue-definitions.interface';
import {
  IVueFieldTemplateComputedEntity,
  IVueFieldTemplateMethodsEntity,
  IVueFieldInputEventsEntity,
  IVueFieldStateEntity,
} from './vue-field.interface';

export class VueField extends VueBaseComponent<IVueFieldStateEntity>
  implements IVueFieldTemplateMethodsEntity {
  @Prop() protected value: AnyT;
  @Prop() protected type: string;
  @Prop() protected full: boolean;
  @Prop() protected name: string;
  @Prop() protected displayName: string;
  @Prop() protected label: string;
  @Prop() protected icon: string;
  @Prop() protected placeholder: string;
  @Prop() protected autoFocus: boolean;

  /**
   * @stable [17.11.2018]
   */
  constructor() {
    super();
    this.getInputBindings = this.getInputBindings.bind(this);
    this.getInputListeners = this.getInputListeners.bind(this);
    this.isInputWrapperFull = this.isInputWrapperFull.bind(this);
    this.isFieldFull = this.isFieldFull.bind(this);
  }

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
      computed: this.getTemplateComputed() as VueAccessorsT,
      methods: this.getTemplateMethods() as VueDefaultMethodsT,
      template: `
        <vue-flex-layout :row="true"
                         :alignItemsCenter="true"
                         :full="isFieldFull()"
                         :class="getFieldClassName()">
          <vue-flex-layout ref="inputWrapper"
                           class="vue-field-input-wrapper"
                           :full="isInputWrapperFull()">
            <input ref="self"
                   v-bind="getInputBindings()"
                   v-on="getInputListeners()"
                   v-model:value="value$"/>
            ${this.getInputAttachmentTemplate()}
          </vue-flex-layout>
          ${this.getLabelTemplate()}
          ${this.getFieldAttachmentTemplate()}
        </vue-flex-layout>
      `,
    };
    return createElement(options);
  }

  /**
   * @stable [17.11.2018]
   * @returns {Partial<HTMLInputElement>}
   */
  public getInputBindings(): Partial<HTMLInputElement> {
    return defValuesFilter<Partial<HTMLInputElement>, Partial<HTMLInputElement>>({
      type: this.type || 'text',
      placeholder: orUndef<string>(!R.isNil(this.placeholder), () => this.t(this.placeholder)),
      ...{class: this.getInputClassName()} as IKeyValue,
    });
  }

  /**
   * @stable [17.11.2018]
   * @returns {string}
   */
  public getFieldClassName(): string {
    return 'vue-field';
  }

  /**
   * @stable [17.11.2018]
   * @returns {IVueFieldInputEventsEntity}
   */
  public getInputListeners(): IVueFieldInputEventsEntity {
    return {};
  }

  /**
   * @stable [17.11.2018]
   * @returns {boolean}
   */
  public isInputWrapperFull(): boolean {
    return true;
  }

  /**
   * @stable [17.11.2018]
   * @returns {boolean}
   */
  public isFieldFull(): boolean {
    return this.full;
  }

  /**
   * @stable [21.10.2018]
   * @param {AnyT} newValue
   */
  protected onChange(newValue: AnyT): void {
    if (isDef(this.bindContainer)) {
      this.bindContainer.dispatchFormChange(this.name, newValue);
    }
    this.$emit('change', newValue);
  }

  /**
   * @stable [17.11.2018]
   * @returns {string}
   */
  protected getInputClassName(): string {
    return 'vue-field-input';
  }

  /**
   * @stable [21.10.2018]
   * @returns {string}
   */
  protected getFieldAttachmentTemplate(): string {
    return '';
  }

  /**
   * @stable [18.11.2018]
   * @returns {string}
   */
  protected getInputAttachmentTemplate(): string {
    return '';
  }

  /**
   * @stable [22.10.2018]
   * @returns {string}
   */
  protected getLabelTemplate(): string {
    return orEmpty(
      !R.isNil(this.label),
      () => `<label class="vue-field-label">${this.t(this.label)}</label>`
    );
  }

  /**
   * @stable [17.11.2018]
   * @returns {AnyT}
   */
  protected getValue(): AnyT {
    return isDef(this.bindStore) ? this.bindStore[this.name] : this.value;
  }

  /**
   * @stable [26.10.2018]
   * @returns {IVueFieldTemplateComputedEntity}
   */
  protected getTemplateComputed(): IVueFieldTemplateComputedEntity {
    return {
      value$: {
        get: () => this.getDisplayValue(),
        set: (newValue) => this.onChange(newValue),
      },
    };
  }

  /**
   * @stable [17.11.2018]
   * @returns {AnyT}
   */
  protected getDisplayValue(): AnyT {
    const displayValue = this.getData().displayValue;
    let displayNameValue;

    return orDefault(
      R.isNil(displayValue),
      () => orDefault(
        isDef(this.bindStore) && !R.isNil(displayNameValue = this.bindStore[this.displayName]),
        displayNameValue,
        () => this.getValue()
      ),
      displayValue
    );
  }

  /**
   * @stable [26.10.2018]
   * @returns {HTMLInputElement}
   */
  protected get inputEl(): HTMLInputElement {
    return this.childrenRefs.self as HTMLInputElement;
  }

  /**
   * @stable [17.11.2018]
   * @returns {HTMLInputElement}
   */
  protected get inputWrapperEl(): HTMLInputElement {
    return (this.childrenRefs.inputWrapper as VueBaseComponent).$el as HTMLInputElement;
  }

  /**
   * @stable [17.11.2018]
   * @returns {IVueRefs}
   */
  protected get childrenRefs(): IVueRefs {
    return this.$children[0].$refs;
  }

  /**
   * @stable [26.10.2018]
   */
  protected setFocus(): void {
    this.inputEl.focus();
  }

  /**
   * @stable [17.11.2018]
   * @returns {IVueFieldTemplateMethodsEntity}
   */
  protected getTemplateMethods(): IVueFieldTemplateMethodsEntity {
    return {
      getFieldClassName: this.getFieldClassName,
      getInputBindings: this.getInputBindings,
      getInputListeners: this.getInputListeners,
      isInputWrapperFull: this.isInputWrapperFull,
      isFieldFull: this.isFieldFull,
    };
  }
}
