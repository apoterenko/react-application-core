import { Component } from 'vue-property-decorator';

import { VueNodeT, VueCreateElementFactoryT } from '../../../vue-definitions.interface';
import { ComponentName } from '../../connector/vue-index';
import { VueField, IVueFieldInputPropsEntity } from '../field/vue-index';
import { AnyT } from '../../../definitions.interface';

@ComponentName('vue-checkbox')
@Component
class VueCheckbox extends VueField {

  /**
   * @stable [21.10.2018]
   * @param {VueCreateElementFactoryT} createElement
   * @returns {VueNodeT}
   */
  public render(createElement: VueCreateElementFactoryT): VueNodeT {
    return super.render(createElement);
  }

  /**
   * @stable [21.10.2018]
   * @returns {string}
   */
  protected getFieldClassName(): string {
    return `${super.getFieldClassName()} vue-checkbox`;
  }

  /**
   * @stable [13.11.2018]
   * @returns {{[p: string]: () => AnyT}}
   */
  protected getMethods(): { [methodName: string]: () => AnyT } {
    return {
      ...super.getMethods(),
    };
  }

  /**
   * @stable [13.11.2018]
   * @returns {Partial<HTMLInputElement>}
   */
  protected getInputBindings(): Partial<HTMLInputElement> {
    return {
      ...super.getInputBindings(),
      type: 'checkbox',
    };
  }

  protected getInputListeners(): any {  // TODO
    return {
      ...super.getInputListeners(),
      click: () => this.onChange(!this.getValue()),
    };
  }
}
