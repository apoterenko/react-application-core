import { Component, Prop } from 'vue-property-decorator';

import { VueCreateElementFactoryT, VueNodeT } from '../../../vue-definitions.interface';
import { vueDefaultComponentConfigFactory } from '../../../vue-entities-definitions.interface';
import { ComponentName } from '../../connector/vue-index';
import { VueBasePreview, IVueBasePreviewState } from '../preview/vue-index';
import { VUE_PICTURE_PREVIEW_NAME } from './vue-picture-preview.interface';
import { toClassName } from '../../../util';

@ComponentName(VUE_PICTURE_PREVIEW_NAME)
@Component(vueDefaultComponentConfigFactory())
class VuePicturePreview extends VueBasePreview {
  @Prop({default: (): number => 10}) public scaleFactor: number;

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
   * @stable [24.02.2019]
   */
  public onScaleIncrease(): void {
    super.onScaleIncrease();
  }

  /**
   * @stable [24.02.2019]
   */
  public onScaleDecrease(): void {
    super.onScaleDecrease();
  }

  /**
   * @stable [24.02.2019]
   * @returns {IVueBasePreviewState}
   */
  public getInitialData$(): IVueBasePreviewState {
    return { scale: 0 };
  }

  /**
   * @stable [24.02.2019]
   * @returns {string}
   */
  protected getClassName(): string {
    return toClassName(super.getClassName(), 'vue-picture-preview');
  }

  /**
   * @stable [30.01.2019]
   * @returns {string}
   */
  protected getPreviewTemplate(): string {
    const currentScale = this.getData().scale;
    const style = currentScale !== this.getInitialData$().scale
      ? `style="width: ${100 + currentScale}%"`
      : '';
    return `<img src="${this.src}"
                 ${style}
                 class="vue-preview-content rac-absolute"/>`;
  }
}
