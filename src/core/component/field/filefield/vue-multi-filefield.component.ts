import { Component } from 'vue-property-decorator';

import { IEntity, AnyT } from '../../../definitions.interface';
import { VueCreateElementFactoryT, VueNodeT } from '../../../vue-definitions.interface';
import { ComponentName } from '../../connector/vue-index';
import { asViewedMultiItemEntities } from '../multifield/vue-index';
import { VueBaseFileField } from './vue-base-filefield.component';
import { IVueMultiFileFieldProps } from './vue-single-file-field.interface';

@ComponentName('vue-multi-file-field')
@Component
class VueMultiFileField extends VueBaseFileField implements IVueMultiFileFieldProps {

  /**
   * @stable [25.11.2018]
   * @param {VueCreateElementFactoryT} createElement
   * @returns {VueNodeT}
   */
  public render(createElement: VueCreateElementFactoryT): VueNodeT {
    return super.render(createElement);
  }

  /**
   * @stable [28.11.2018]
   * @param newValue
   * @param {AnyT} context
   */
  public onChangeManually(newValue, context?: AnyT): void {
    super.onChangeManually(newValue, context);
  }

  /**
   * @stable [21.12.2018]
   * @returns {string}
   */
  public getFieldClassName(): string {
    return `${super.getFieldClassName()} vue-multi-file-field`;
  }

  /**
   * @stable [27.02.2019]
   * @returns {IEntity[]}
   */
  public getEntities(): IEntity[] {
    return asViewedMultiItemEntities(this.getValue(), this.maxFiles);
  }
}
