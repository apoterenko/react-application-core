import * as R from 'ramda';
import { Component } from 'vue-property-decorator';

import { generateArray, isPrimitive, isArrayNotEmpty } from '../../../util';
import { IEntity, AnyT } from '../../../definitions.interface';
import { VueCreateElementFactoryT, VueNodeT } from '../../../vue-definitions.interface';
import { ComponentName } from '../../connector/vue-index';
import { toActualMultiItemEntities } from '../multifield/vue-index';
import { VueBaseFileField } from './vue-base-filefield.component';
import { IVueFileFieldProps, VUE_FILE_FIELD_NAME } from './vue-filefield.interface';

@ComponentName(VUE_FILE_FIELD_NAME)
@Component
class VueFileField extends VueBaseFileField implements IVueFileFieldProps {

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
      return generateArray(1);
    }
    const value = this.getValue();
    if (isPrimitive(value)) {
      return [value];
    }
    const actualEntities = toActualMultiItemEntities(value);
    return R.isNil(actualEntities) || actualEntities.length === 0 ? generateArray(1) : actualEntities;
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
}
