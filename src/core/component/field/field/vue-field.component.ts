import * as R from 'ramda';
import { Prop } from 'vue-property-decorator';

import {
  calc,
  defValuesFilter,
  ifNotNilThanValue,
  isDef,
  nvl,
  orEmpty,
  orUndef,
  toClassName,
} from '../../../util';
import { AnyT, IKeyValue } from '../../../definitions.interface';
import { VueBaseComponent } from '../../base/vue-index';
import {
  VueAccessorsT,
  VueComponentOptionsT,
  VueCreateElementFactoryT,
  VueDefaultMethodsT,
  VueNodeT,
} from '../../../vue-definitions.interface';
import {
  IVueField,
  IVueFieldInputListenersEntity,
  IVueFieldProps,
  IVueFieldState,
  IVueFieldTemplateComputedEntity,
  IVueFieldTemplateMethods,
  VUE_FIELD_CHANGE_EVENT,
} from './vue-field.interface';

export class VueField<TStore = IKeyValue, TState extends IVueFieldState = IVueFieldState>
  extends VueBaseComponent<TStore, TState>
  implements IVueField, IVueFieldProps {

  @Prop() public readonly value: AnyT;
  @Prop() public readonly useLocalization: boolean;
  @Prop() public readonly label: string;
  @Prop() public readonly displayName: string;
  @Prop() public readonly name: string;
  @Prop() public readonly placeholder: string;
  @Prop() public readonly autoFocus: boolean;
  @Prop() public readonly icon: string;
  @Prop() public readonly type: string;
  @Prop() public readonly floatLabel: boolean;

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
      placeholder: ifNotNilThanValue(
        this.placeholder,
        () => this.t(this.placeholder),
        orUndef(this.hasFloatLabel(), () => this.t(this.label))
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
      calc(this.className, this.getDisplayValue()),
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
    const emittedValue = this.toEmittedValue(newValue);
    if (this.isContainerBound()) {
      this.bindContainer.dispatchFormChange(this.name, emittedValue);
    }
    this.$emit(VUE_FIELD_CHANGE_EVENT, emittedValue);
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
   * @stable [19.01.2019]
   * @param {AnyT} newValue
   * @returns {AnyT}
   */
  protected toEmittedValue(newValue: AnyT): AnyT {
    return newValue;
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
        get: () => this.getInputDisplayValue(),
        set: (newValue) => this.onChange(newValue),
      },
    };
  }

  /**
   * @stable [27.05.2019]
   * @returns {AnyT}
   */
  protected getDisplayValue(): AnyT {
    return nvl(
      ifNotNilThanValue(this.getData(), (data) => data.displayValue),
      ifNotNilThanValue(this.fromStore(this.displayName), (displayValueFromStore) => displayValueFromStore, this.getValue())
    );
  }

  /**
   * @stable [21.12.2018]
   * @returns {AnyT}
   */
  protected getInputDisplayValue(): AnyT {
    const value = this.getValue();
    const displayValue = this.getDisplayValue();

    return this.isFieldChangedManually(value)
      ? displayValue
      : (this.useLocalization ? this.t(displayValue) : displayValue);
  }

  /**
   * @stable [21.12.2018]
   * @param {AnyT} newValue
   * @returns {boolean}
   */
  protected isFieldChangedManually(newValue: AnyT): boolean {
    return true;
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
   * @stable [22.12.2018]
   * @returns {TMethods}
   */
  protected getTemplateMethods<TMethods extends IVueFieldTemplateMethods>(): TMethods {
    return {
      getInputWrapperClassName: this.getInputWrapperClassName,
      getFieldClassName: this.getFieldClassName,
      getInputBindings: this.getInputBindings,
      getInputListeners: this.getInputListeners,
      isInputWrapperFull: this.isInputWrapperFull,
      isFieldFull: this.isFieldFull,
    } as TMethods;
  }

  /**
   * @stable [20.12.2018]
   * @param {string} fieldName
   * @returns {AnyT}
   */
  protected fromStore(fieldName: string): AnyT {
    return ifNotNilThanValue(this.bindStore, () => this.bindStore[fieldName]);
  }
}
