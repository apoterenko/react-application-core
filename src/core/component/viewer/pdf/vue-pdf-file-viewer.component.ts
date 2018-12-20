import { Component } from 'vue-property-decorator';

import { ComponentName } from '../../connector/vue-index';
import { VueCreateElementFactoryT, VueNodeT } from '../../../vue-definitions.interface';
import { vueViewerComponentConfigFactory } from '../vue-viewer.interface';
import { VueBaseFileViewer } from '../file/vue-index';

@ComponentName('vue-pdf-file-viewer')
@Component(vueViewerComponentConfigFactory())
class VuePdfFileViewer extends VueBaseFileViewer {

  /**
   * @stable [08.12.2018]
   * @param {VueCreateElementFactoryT} createElement
   * @returns {VueNodeT}
   */
  public render(createElement: VueCreateElementFactoryT): VueNodeT {
    return super.render(createElement);
  }

  /**
   * @stable [20.12.2018]
   * @returns {string}
   */
  protected getPopupBodyTemplate(): string {
    return `
        <vue-pdf-preview :src="getSrc()"/>
    `;
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
   * @stable [20.12.2018]
   */
  protected onRemove(): void {
    super.onRemove();
  }
}
