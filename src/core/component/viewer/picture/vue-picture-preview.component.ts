import { Component } from 'vue-property-decorator';

import { VueCreateElementFactoryT, VueNodeT } from '../../../vue-definitions.interface';
import { vueDefaultComponentConfigFactory } from '../../../vue-entities-definitions.interface';
import { ComponentName } from '../../connector/vue-index';
import { VueBasePreview } from '../preview/vue-index';
import { VUE_PICTURE_PREVIEW_NAME } from './vue-picture-preview.interface';

@ComponentName(VUE_PICTURE_PREVIEW_NAME)
@Component(vueDefaultComponentConfigFactory())
class VuePicturePreview extends VueBasePreview {

  /**
   * @stable [30.01.2019]
   * @param {VueCreateElementFactoryT} createElement
   * @returns {VueNodeT}
   */
  public render(createElement: VueCreateElementFactoryT): VueNodeT {
    return super.render(createElement);
  }

  /**
   * @stable [30.01.2019]
   */
  public mounted(): void {
    super.mounted();
  }

  /**
   * @stable [30.01.2019]
   */
  public updated(): void {
    super.updated();
  }

  /**
   * @stable [30.01.2019]
   * @returns {string}
   */
  protected getPreviewTemplate(): string {
    return `<img src="${this.src}"
                 class="rac-absolute"/>`;
  }
}
