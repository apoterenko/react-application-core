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
  private readonly scaleData = [1, -1];
  private horizontalScaleCursor = 0;
  private verticalScaleCursor = 0;
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
                        icon="trash"
                        className="vue-cropper-viewer-remove-action"/>
        </vue-flex-layout>
    `;
  }

  /**
   * @stable [21.03.2019]
   * @returns {string}
   */
  protected getPopupFooterTemplate(): string {
    return `
        <vue-flex-layout :row="true">
            <vue-button @click="onZoomIn"
                        icon="zoom-in"/>
            <vue-button @click="onZoomOut"
                        icon="zoom-out"/>
            <vue-button @click="onRotateLeft"
                        icon="rotate-left"/>
            <vue-button @click="onRotateRight"
                        icon="rotate-right"/>
            <vue-button @click="onFlipHorizontal"
                        icon="flip-horizontal"/>
            <vue-button @click="onFlipVertical"
                        icon="flip-vertical"/>
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
      onZoomIn: this.onZoomIn,
      onZoomOut: this.onZoomOut,
      onFlipHorizontal: this.onFlipHorizontal,
      onFlipVertical: this.onFlipVertical,
      onRotateLeft: this.onRotateLeft,
      onRotateRight: this.onRotateRight,
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

  /**
   * @stable [21.03.2019]
   */
  private onZoomIn(): void {
    this.cropper.zoom(0.1);
  }

  /**
   * @stable [21.03.2019]
   */
  private onZoomOut(): void {
    this.cropper.zoom(-0.1);
  }

  /**
   * @stable [21.03.2019]
   */
  private onRotateLeft(): void {
    this.cropper.rotate(-90);
  }

  /**
   * @stable [21.03.2019]
   */
  private onRotateRight(): void {
    this.cropper.rotate(90);
  }

  /**
   * @stable [21.03.2019]
   */
  private onFlipHorizontal(): void {
    this.changeScale(true);
  }

  /**
   * @stable [21.03.2019]
   */
  private onFlipVertical(): void {
    this.changeScale(false);
  }

  /**
   * @stable [21.03.2019]
   * @param {boolean} horizontal
   */
  private changeScale(horizontal: boolean): void {
    if (horizontal) {
      this.horizontalScaleCursor = this.horizontalScaleCursor === this.scaleData.length - 1 ? 0 : this.horizontalScaleCursor + 1;
    } else {
      this.verticalScaleCursor = this.verticalScaleCursor === this.scaleData.length - 1 ? 0 : this.verticalScaleCursor + 1;
    }
    const currentHorizontalScaleData = this.scaleData[this.horizontalScaleCursor];
    const currentVerticalScaleData = this.scaleData[this.verticalScaleCursor];
    this.cropper.scale(currentHorizontalScaleData, currentVerticalScaleData);
  }
}
