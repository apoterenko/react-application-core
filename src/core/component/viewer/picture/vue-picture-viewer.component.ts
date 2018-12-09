import { Component } from 'vue-property-decorator';

import { ComponentName } from '../../connector/vue-index';
import { VueCreateElementFactoryT, VueNodeT } from '../../../vue-definitions.interface';
import { VueBasePictureViewer } from './vue-base-picture-viewer.component';
import { vueViewerComponentConfigFactory } from '../vue-viewer.interface';

@ComponentName('vue-picture-viewer')
@Component(vueViewerComponentConfigFactory())
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
}
