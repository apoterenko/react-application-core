import * as R from 'ramda';
import { Prop } from 'vue-property-decorator';

import {
  orEmpty,
  isDef,
  defValuesFilter,
  orUndef,
  orDefault,
  toClassName,
  ifNilReturnDefault,
  ifNotNilReturnValue,
} from '../../../util';
import { AnyT, IKeyValue } from '../../../definitions.interface';
import { VueBaseComponent } from '../../base/vue-index';
import {
  VueCreateElementFactoryT,
  VueNodeT,
  VueComponentOptionsT,
  VueAccessorsT,
  VueDefaultMethodsT,
} from '../../../vue-definitions.interface';
import {
  IVueFieldTemplateComputedEntity,
  IVueFieldTemplateMethodsEntity,
  IVueFieldInputListenersEntity,
  IVueFieldStateEntity,
  IVueField,
  VUE_FIELD_CHANGE_EVENT,
} from './vue-field.interface';

export class VueField<TStore = IKeyValue, TState extends IVueFieldStateEntity = IVueFieldStateEntity>
  extends VueBaseComponent<TStore, TState> implements IVueField {

  @Prop() public value: AnyT;
  @Prop() protected type: string;
  @Prop() protected full: boolean;
  @Prop() protected name: string;
  @Prop() protected displayName: string;
  @Prop() protected label: string;
  @Prop() protected floatLabel: boolean;
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
    this.getFieldClassName = this.getFieldClassName.bind(this);
    this.isInputWrapperFull = this.isInputWrapperFull.bind(this);
    this.getInputWrapperClassName = this.getInputWrapperClassName.bind(this);
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
                           :class="getInputWrapperClassName()"
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
      type: this.type,
      placeholder: ifNilReturnDefault<string, string>(
        this.placeholder,
        () => this.t(this.placeholder),
        orUndef<string>(this.hasFloatLabel(), () => this.t(this.label))
      ),
      ...{class: this.getInputClassName()} as IKeyValue,
    });
  }

  /**
   * @stable [17.11.2018]
   * @returns {string}
   */
  public getFieldClassName(): string {
    return toClassName(
      'vue-field',
      this.hasValue() ? 'vue-field-filled' : 'vue-field-not-filled',
      this.hasFloatLabel() ? 'vue-field-float-labeled' : 'vue-field-not-float-labeled'
    );
  }

  /**
   * @stable [17.11.2018]
   * @returns {IVueFieldInputListenersEntity}
   */
  public getInputListeners(): IVueFieldInputListenersEntity {
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
   * @stable [27.11.2018]
   * @returns {string}
   */
  public getInputWrapperClassName(): string {
    return toClassName(
      'vue-field-input-wrapper',
      this.type === 'hidden' && 'rac-display-none',
    );
  }

  /**
   * @stable [17.11.2018]
   * @returns {AnyT}
   */
  public getValue(): AnyT {
    return isDef(this.bindStore) ? this.bindStore[this.name] : this.value;
  }

  /**
   * @stable [21.10.2018]
   * @param {AnyT} newValue
   */
  public onChange(newValue: AnyT): void {
    const data = this.getData();
    if (!R.isNil(data) && this.canSetDataDisplayValueOnManualInputChange(newValue)) {
      data.displayValue = newValue;
    }
    if (this.isContainerBound()) {
      this.bindContainer.dispatchFormChange(this.name, newValue);
    }
    this.$emit(VUE_FIELD_CHANGE_EVENT, newValue);
  }

  /**
   * @stable [28.11.2018]
   * @param newValue
   * @param {AnyT} context
   */
  public onChangeManually(newValue, context?: AnyT): void {
    this.onChange(newValue);
  }

  /**
   * @stable [20.12.2018]
   * @returns {TState}
   */
  public getInitialData$(): TState {
    return {
      displayValue: null,
    } as  TState;
  }

  /**
   * @stable [20.12.2018]
   * @param {AnyT} newValue
   * @returns {boolean}
   */
  protected canSetDataDisplayValueOnManualInputChange(newValue: AnyT): boolean {
    return false;
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
      () => `<label class="${toClassName(
                              'vue-field-label',
                              this.floatLabel && 'vue-field-float-label',
                            )} ">
                ${this.t(this.label)}
             </label>`
    );
  }

  /**
   * @stable [24.11.2018]
   * @returns {boolean}
   */
  protected hasValue(): boolean {
    const value = this.getValue();
    return !R.isNil(value) && !R.equals(value, this.getEmptyValue());
  }

  /**
   * @stable [10.12.2018]
   * @returns {AnyT}
   */
  protected getEmptyValue(): AnyT {
    return '';
  }

  /**
   * @stable [10.12.2018]
   * @returns {boolean}
   */
  protected hasFloatLabel(): boolean {
    return !R.isNil(this.label) && this.floatLabel;
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
    const data = this.getData();
    const value = this.getValue();
    const displayValue = ifNotNilReturnValue(data, () => data.displayValue);
    let displayNameValue;

    return orDefault(
      R.isNil(displayValue),
      () => orDefault(displayNameValue = this.fromStore(this.displayName), displayNameValue, value),
      displayValue
    );
  }

  /**
   * @stable [26.10.2018]
   * @returns {HTMLInputElement}
   */
  protected get inputEl(): HTMLInputElement {
    return this.getChildrenRefs().self as HTMLInputElement;
  }

  /**
   * @stable [17.11.2018]
   * @returns {HTMLInputElement}
   */
  protected get inputWrapperEl(): HTMLInputElement {
    return (this.getChildrenRefs().inputWrapper as VueBaseComponent).$el as HTMLInputElement;
  }

  /**
   * @stable [26.10.2018]
   */
  protected setFocus(): void {
    this.inputEl.focus();
  }

  /**
   * @stable [27.11.2018]
   * @returns {IVueFieldTemplateMethodsEntity}
   */
  protected getTemplateMethods(): IVueFieldTemplateMethodsEntity {
    return {
      getInputWrapperClassName: this.getInputWrapperClassName,
      getFieldClassName: this.getFieldClassName,
      getInputBindings: this.getInputBindings,
      getInputListeners: this.getInputListeners,
      isInputWrapperFull: this.isInputWrapperFull,
      isFieldFull: this.isFieldFull,
    };
  }

  /**
   * @stable [20.12.2018]
   * @param {string} fieldName
   * @returns {AnyT}
   */
  protected fromStore(fieldName: string): AnyT {
    return ifNotNilReturnValue(this.bindStore, () => this.bindStore[fieldName]);
  }
}
