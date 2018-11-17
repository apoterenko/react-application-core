import { Component } from 'vue-property-decorator';

import { VueNodeT, VueCreateElementFactoryT } from '../../../vue-definitions.interface';
import { ComponentName } from '../../connector/vue-index';
import { VueField, IVueFieldInputEventsEntity } from '../field/vue-index';

@ComponentName('vue-checkbox')
@Component
class VueCheckbox extends VueField {

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
      type: 'checkbox',
      checked: !!this.getValue(),
    };
  }

  /**
   * @stable [17.11.2018]
   * @returns {IVueFieldInputEventsEntity}
   */
  public getInputListeners(): IVueFieldInputEventsEntity {
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
