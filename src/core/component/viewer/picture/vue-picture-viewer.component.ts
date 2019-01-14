import { Component } from 'vue-property-decorator';

import { ComponentName } from '../../connector/vue-index';
import { VueCreateElementFactoryT, VueNodeT } from '../../../vue-definitions.interface';
import { vueDefaultComponentConfigFactory } from '../../../vue-entities-definitions.interface';
import { VueBasePictureViewer } from './vue-base-picture-viewer.component';
import { toClassName } from '../../../util';

@ComponentName('vue-picture-viewer')
@Component(vueDefaultComponentConfigFactory())
export class VuePictureViewer extends VueBasePictureViewer {

  /**
   * @stable [29.11.2018]
   * @param {VueCreateElementFactoryT} createElement
   * @returns {VueNodeT}
   */
  public render(createElement: VueCreateElementFactoryT): VueNodeT {
    return super.render(createElement);
  }

  /**
   * @stable [29.11.2018]
   */
  protected onOpenPopup(): void {
    super.onOpenPopup();
  }

  /**
   * @stable [29.11.2018]
   */
  protected onClosePopup(): void {
    super.onClosePopup();
  }

  /**
   * @stable [06.01.2019]
   * @returns {string}
   */
  protected getClassName(): string {
    return toClassName('vue-picture-viewer', super.getClassName());
  }
}
