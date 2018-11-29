import Cropper from 'cropperjs';
import { Component } from 'vue-property-decorator';

import { DelayedTask, isDef } from '../../../util';
import { ComponentName } from '../../connector/vue-index';
import { VUE_VIEWER_CHANGE_EVENT } from '../vue-viewer.interface';
import { VueCreateElementFactoryT, VueNodeT } from '../../../vue-definitions.interface';
import { IVueComponent } from '../../../vue-entities-definitions.interface';
import { VueBasePictureViewer } from '../picture/vue-index';
import {
  VUE_CROPPER_VIEWER_CROP_EVENT,
  VUE_CROPPER_VIEWER_REMOVE_EVENT,
  IVueCropperPictureViewerTemplateMethodsEntity,
} from './vue-cropper-viewer.interface';

@ComponentName('vue-cropper-viewer')
@Component({
  data() {
    const self: IVueComponent = this;
    return self.getInitialData$();
  },
})
class VueCropperViewer extends VueBasePictureViewer {
  private cropEmitterTask = new DelayedTask(this.onCrop, 100);
  private cropper: Cropper;

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
  protected beforeDestroy(): void {
    this.cropEmitterTask.stop();

    if (isDef(this.cropper)) {
      this.cropper.destroy();
      this.cropper = null;
    }
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

  // TODO
  protected getPopupHeaderTemplate(): string {
    return `
      <vue-button @click="onApply"
                  text="Apply"/>
      <vue-button @click="onRemove"
                  text="Remove"/>
    `;
  }

  /**
   * @stable [29.11.2018]
   * @returns {IVueCropperPictureViewerTemplateMethodsEntity}
   */
  protected getTemplateMethods(): IVueCropperPictureViewerTemplateMethodsEntity {
    return {
      ...super.getTemplateMethods(),
      onApply: this.onApply,
      onRemove: this.onRemove,
    };
  }

  /**
   * @stable [29.11.2018]
   */
  protected onAfterOpenPopup(): void {
    super.onAfterOpenPopup();

    this.cropper = new Cropper(this.getSelf(), {
      crop: () => this.cropEmitterTask.start(),
    });
  }

  /**
   * @stable [29.11.2018]
   */
  private onApply(): void {
    this.getCroppedCanvasBlob((blob) => {
      this.onClosePopup();
      this.$nextTick(() => this.$emit(VUE_VIEWER_CHANGE_EVENT, blob));
    });
  }

  /**
   * @stable [29.11.2018]
   */
  private onRemove(): void {
    this.onClosePopup();
    this.$nextTick(() => this.$emit(VUE_CROPPER_VIEWER_REMOVE_EVENT));
  }

  /**
   * @stable [29.11.2018]
   */
  private onCrop(): void {
    this.getCroppedCanvasBlob((blob) => this.$emit(VUE_CROPPER_VIEWER_CROP_EVENT, blob));
  }

  /**
   * @stable [29.11.2018]
   * @param {(blob: Blob) => void} callback
   */
  private getCroppedCanvasBlob(callback: (blob: Blob) => void): void {
    this.cropper.getCroppedCanvas().toBlob(callback);
  }
}
