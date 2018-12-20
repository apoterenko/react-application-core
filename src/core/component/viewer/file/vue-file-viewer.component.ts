import { Component } from 'vue-property-decorator';

import { ComponentName } from '../../connector/vue-index';
import { VueCreateElementFactoryT, VueNodeT } from '../../../vue-definitions.interface';
import { vueDefaultComponentConfigFactory } from '../../../vue-entities-definitions.interface';
import { VueBaseFileViewer } from './vue-base-file-viewer.component';

@ComponentName('vue-file-viewer')
@Component(vueDefaultComponentConfigFactory())
export class VueFileViewer extends VueBaseFileViewer {

  /**
   * @stable [08.12.2018]
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
   * @stable [20.12.2018]
   */
  protected onRemove(): void {
    super.onRemove();
  }
}
