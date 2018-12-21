import { Component, Prop } from 'vue-property-decorator';
import * as R from 'ramda';

import { StringNumberT } from '../../../definitions.interface';
import { getWidth, isString, isArrayNotEmpty } from '../../../util';
import { VueNodeT, VueCreateElementFactoryT } from '../../../vue-definitions.interface';
import { vueDefaultComponentConfigFactory } from '../../../vue-entities-definitions.interface';
import { ISelectOptionEntity } from '../../../entities-definitions.interface';
import { ComponentName } from '../../connector/vue-index';
import { IVueFieldInputListenersEntity } from '../field/vue-index';
import { VueBaseTextField } from '../textfield/vue-index';
import { IVueMenu, IVueMenuProps } from '../../menu/vue-index';
import {
  IVueSelectTemplateMethodsEntity,
  VueSelectFilterT,
  IVueSelectProps,
} from './vue-select.interface';

@ComponentName('vue-select')
@Component(vueDefaultComponentConfigFactory())
class VueSelect extends VueBaseTextField implements IVueSelectProps {

  @Prop() public bindDictionary: string;
  @Prop({default: (): string => 'vue-icon-expand'}) protected icon: string;
  @Prop({
    default: (): VueSelectFilterT => (option: ISelectOptionEntity, query: string) =>
      String((option.label || option.value)).toLowerCase().includes(query.toLowerCase()),
  }) protected filter: VueSelectFilterT;
  @Prop() private options: ISelectOptionEntity[];
  @Prop() private menuProps: IVueMenuProps;

  /**
   * @stable [21.10.2018]
   * @param {VueCreateElementFactoryT} createElement
   * @returns {VueNodeT}
   */
  public render(createElement: VueCreateElementFactoryT): VueNodeT {
    return super.render(createElement);
  }

  /**
   * @stable [17.11.2018]
   * @returns {IVueFieldInputListenersEntity}
   */
  public getInputListeners(): IVueFieldInputListenersEntity {
    return {
      ...super.getInputListeners(),
      click: this.onInputClick,
    };
  }

  /**
   * @stable [21.10.2018]
   * @returns {string}
   */
  public getFieldClassName(): string {
    return `${super.getFieldClassName()} vue-select`;
  }

  /**
   * @stable [18.11.2018]
   * @returns {IVueSelectTemplateMethodsEntity}
   */
  protected getTemplateMethods(): IVueSelectTemplateMethodsEntity {
    return {
      ...super.getTemplateMethods(),
      onSelect: this.onSelect,
      getMenuBindings: this.getMenuBindings,
    };
  }

  /**
   * @stable [21.12.2018]
   * @returns {IVueMenuProps}
   */
  protected getMenuBindings(): IVueMenuProps {
    return {
      ...this.menuProps,
      options: this.getOptions(),
    };
  }

  /**
   * @stable [21.12.2018]
   */
  protected onIconClick(): void {
    this.onInputClick();
  }

  /**
   * @stable [20.12.2018]
   * @param {StringNumberT} newValue
   * @returns {boolean}
   */
  protected canSetDataDisplayValueOnManualInputChange(newValue: StringNumberT): boolean {
    return this.isFieldChangedManually(newValue);
  }

  /**
   * @stable [18.11.2018]
   * @returns {string}
   */
  protected getInputAttachmentTemplate(): string {
    return `<vue-menu ref="menu"
                      @select="onSelect($event)"
                      v-bind="getMenuBindings()"/>`;
  }

  /**
   * @stable [20.12.2018]
   * @returns {ISelectOptionEntity[]}
   */
  protected getOptions(): ISelectOptionEntity[] {
    const currentValue = this.getValue();
    const areChangesPresent = !R.isEmpty(currentValue) && this.isFieldChangedManually(currentValue);

    return isArrayNotEmpty(this.options) && areChangesPresent
      ? R.filter<ISelectOptionEntity>((option) => this.filter(option, currentValue), this.options)
      : this.options;
  }

  /**
   * @stable [20.12.2018]
   * @param {StringNumberT} newValue
   * @returns {boolean}
   */
  protected isFieldChangedManually(newValue: StringNumberT): boolean {
    return isString(newValue);
  }

  /**
   * @stable [18.11.2018]
   */
  private onInputClick(): void {
    this.getMenu().show({width: getWidth(this.inputWrapperEl)});

    if (this.isContainerBound() && isString(this.bindDictionary)) {
      this.bindContainer.dispatchLoadDictionary(this.bindDictionary);
    }
    this.$emit('show');
  }

  /**
   * @stable [17.11.2018]
   * @param {IMenuItemEntity} option
   */
  private onSelect(option: ISelectOptionEntity): void {
    this.getData().displayValue = option.label;
    this.onChange(option.value);
    this.$emit('select', option);
  }

  /**
   * @stable [17.11.2018]
   * @returns {IVueMenu}
   */
  private getMenu(): IVueMenu {
    return this.getChildrenRefs().menu as IVueMenu;
  }
}
