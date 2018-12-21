import { Component } from 'vue-property-decorator';

import { generateArray } from '../../../util';
import { IEntity, AnyT } from '../../../definitions.interface';
import { VueCreateElementFactoryT, VueNodeT } from '../../../vue-definitions.interface';
import { ComponentName } from '../../connector/vue-index';
import { toActualMultiItemEntities } from '../multifield/vue-index';
import { VueBaseFileField } from './vue-base-filefield.component';

@ComponentName('vue-multi-file-field')
@Component
class VueMultiFileField extends VueBaseFileField {

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

  // TODO
  public getFiles(): IEntity[] {
    const totalFilesCount = this.maxFiles;
    const relations = generateArray(totalFilesCount);
    const actualRelations = toActualMultiItemEntities(this.getValue());
    if (Array.isArray(actualRelations)) {
      const isFullFilled = actualRelations.length === totalFilesCount;
      const startIndex = isFullFilled ? 0 : 1;
      actualRelations.forEach((actualRelation, index) => {
        relations[index + startIndex] = actualRelation;
      });
    }
    return relations;
  }
}
