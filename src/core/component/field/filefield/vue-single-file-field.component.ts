import * as R from 'ramda';
import { Component } from 'vue-property-decorator';

import { makeArray, isPrimitive, isArrayNotEmpty, asMultiFieldEntities } from '../../../util';
import { IEntity, AnyT } from '../../../definitions.interface';
import { VueCreateElementFactoryT, VueNodeT } from '../../../vue-definitions.interface';
import { ComponentName } from '../../connector/vue-index';
import { VueBaseFileField } from './vue-base-filefield.component';
import { IVueSingleFileFieldProps, VUE_SINGLE_FILE_FIELD_NAME } from './vue-single-file-field.interface';

@ComponentName(VUE_SINGLE_FILE_FIELD_NAME)
@Component
class VueSingleFileField extends VueBaseFileField implements IVueSingleFileFieldProps {

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
   * @stable [20.11.2018]
   * @returns {IEntity[]}
   */
  public getEntities(): IEntity[] {
    if (!this.hasValue()) {
      return makeArray(1);
    }
    const value = this.getValue();
    if (isPrimitive(value)) {
      return [value];
    }
    const actualEntities = asMultiFieldEntities(value);
    return R.isNil(actualEntities) || actualEntities.length === 0 ? makeArray(1) : actualEntities;
  }

  /**
   * @stable [19.01.2019]
   * @param {File} file
   * @param {number} index
   * @returns {string}
   */
  public getViewerComponent(file: File, index: number): string {
    const filesEntities = this.getEntities();
    return isArrayNotEmpty(filesEntities)
      ? this.toViewer(filesEntities[0].type || this.getFileFormat())
      : this.viewer;
  }

  /**
   * @stable [19.05.2019]
   * @returns {string}
   */
  public getFieldClassName(): string {
    return `${super.getFieldClassName()} vue-single-file-field`;
  }
}
