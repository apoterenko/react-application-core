import { Prop, Component } from 'vue-property-decorator';

import { toClassName } from '../../../util';
import { VueNodeT, VueCreateElementFactoryT } from '../../../vue-definitions.interface';
import { ComponentName } from '../../connector/vue-index';
import { VueField, IVueFieldInputListenersEntity } from '../field/vue-index';
import { VUE_CHECKBOX_NAME } from './vue-checkbox.interface';

@ComponentName(VUE_CHECKBOX_NAME)
@Component
class VueCheckbox extends VueField {
  @Prop({default: (): boolean => false}) protected floatLabel: boolean;
  @Prop({default: (): string => 'checkbox'}) protected type: string;

  /**
   * @stable [17.11.2018]
   */
  constructor() {
    super();
    this.onInputClick = this.onInputClick.bind(this);
  }

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
   * @returns {string}
   */
  public getFieldClassName(): string {
    return `${super.getFieldClassName()} vue-checkbox`;
  }

  /**
   * @stable [30.01.2019]
   * @returns {string}
   */
  public getInputWrapperClassName(): string {
    return toClassName(
      super.getInputWrapperClassName(),
      'rac-flex-justify-content-center'
    );
  }

  /**
   * @stable [17.11.2018]
   * @returns {boolean}
   */
  public isInputWrapperFull(): boolean {
    return false;
  }

  /**
   * @stable [13.11.2018]
   * @returns {Partial<HTMLInputElement>}
   */
  public getInputBindings(): Partial<HTMLInputElement> {
    return {
      ...super.getInputBindings(),
      checked: !!this.getValue(),
    };
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
   * @stable [17.11.2018]
   */
  private onInputClick(): void {
    this.onChange(!this.getValue());
  }
}
