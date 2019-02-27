import Cropper from 'cropperjs';
import { Component, Prop } from 'vue-property-decorator';

import { DelayedTask, isDef, toClassName } from '../../../util';
import { ComponentName } from '../../connector/vue-index';
import { VUE_VIEWER_CHANGE_EVENT } from '../vue-viewer.interface';
import { VueCreateElementFactoryT, VueNodeT } from '../../../vue-definitions.interface';
import { vueDefaultComponentConfigFactory } from '../../../vue-entities-definitions.interface';
import { VueBasePictureViewer } from '../picture/vue-index';
import {
  VUE_CROPPER_VIEWER_CROP_EVENT,
  VUE_CROPPER_VIEWER_NAME,
  IVueCropperViewerProps,
  IVueCropperPictureViewerTemplateMethodsEntity,
  IVueCropperViewerCroppedCanvasOptionsEntity,
  IVueCropperViewerOptionsEntity,
} from './vue-cropper-viewer.interface';

@ComponentName(VUE_CROPPER_VIEWER_NAME)
@Component(vueDefaultComponentConfigFactory())
class VueCropperViewer extends VueBasePictureViewer implements IVueCropperViewerProps {
  @Prop({
    default: (): IVueCropperViewerOptionsEntity => ({
      cropBoxResizable: false,
      aspectRatio: 568 / 426,
      minCropBoxWidth: 568,
    }),
  }) public readonly options: IVueCropperViewerOptionsEntity;
  @Prop({
    default: (): IVueCropperViewerCroppedCanvasOptionsEntity => ({
      maxWidth: 1024,
    }),
  }) public readonly croppedCanvasOptions: IVueCropperViewerCroppedCanvasOptionsEntity;
  private readonly cropEmitterTask = new DelayedTask(this.onCrop, 100);
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
  public onRemove(): void {
    this.onClosePopup();
    this.$nextTick(() => super.onRemove());
  }

  /**
   * @stable [29.11.2018]
   */
  public onOpenPopup(): void {
    super.onOpenPopup();
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
  protected onClosePopup(): void {
    super.onClosePopup();
  }

  /**
   * @stable [21.01.2019]
   * @returns {string}
   */
  protected getPopupHeaderTemplate(): string {
    return `
        <vue-flex-layout :row="true">
            <vue-button @click="onApply"
                        icon="check"/>
            <vue-button @click="onRemove"
                        icon="trash"/>
        </vue-flex-layout>
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
    };
  }

  /**
   * @stable [21.01.2019]
   * @returns {string}
   */
  protected getPopupClassName(): string {
    return toClassName(super.getPopupClassName(), 'vue-cropper-viewer-popup');
  }

  /**
   * @stable [29.11.2018]
   */
  protected onAfterOpenPopup(): void {
    super.onAfterOpenPopup();

    this.cropper = new Cropper(this.getSelf(), {
      crop: () => this.cropEmitterTask.start(),
      ...this.options,
    });
  }

  /**
   * @stable [06.01.2019]
   * @returns {string}
   */
  protected getClassName(): string {
    return toClassName('vue-picture-viewer vue-cropper-viewer', super.getClassName());
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
  private onCrop(): void {
    this.getCroppedCanvasBlob((blob) => this.$emit(VUE_CROPPER_VIEWER_CROP_EVENT, blob));
  }

  /**
   * @stable [29.11.2018]
   * @param {(blob: Blob) => void} callback
   */
  private getCroppedCanvasBlob(callback: (blob: Blob) => void): void {
    this.cropper.getCroppedCanvas(this.croppedCanvasOptions).toBlob(callback);
  }
}
