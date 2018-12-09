import { VueViewer } from '../vue-viewer.component';
import { IVueBasePictureViewerTemplateMethodsEntity } from './vue-picture-viewer.interface';

export class VueBasePictureViewer extends VueViewer {

  /**
   * @stable [29.11.2018]
   */
  constructor() {
    super();
    this.getBackgroundImage = this.getBackgroundImage.bind(this);
  }

  /**
   * @stable [29.11.2018]
   * @returns {string}
   */
  protected getPopupBodyTemplate(): string {
    return `
        <vue-flex-layout :alignItemsCenter="true"
                         :justifyContentCenter="true">
            <img ref="self"
                 :src="getSrc()"
                 class="vue-picture-viewer-image"/>
        </vue-flex-layout>
    `;
  }

  /**
   * @stable [29.11.2018]
   * @returns {string}
   */
  protected getPreviewTemplate(): string {
    return `
      <vue-flex-layout :styles="{'background-image': getBackgroundImage()}"
                       class="vue-picture-viewer-preview"
                       v-on:click.native="onOpenPopup"/>
    `;
  }

  /**
   * @stable [29.11.2018]
   * @returns {IVueBasePictureViewerTemplateMethodsEntity}
   */
  protected getTemplateMethods(): IVueBasePictureViewerTemplateMethodsEntity {
    return {
      ...super.getTemplateMethods(),
      getBackgroundImage: this.getBackgroundImage,
    };
  }

  /**
   * @stable [29.11.2018]
   * @returns {TElement}
   */
  protected getSelf<TElement extends Element>(): TElement {
    return this.getChildrenRefs().self as TElement;
  }

  /**
   * @stable [29.11.2018]
   * @returns {string}
   */
  private getBackgroundImage(): string {
    return `url(${this.src})`;
  }
}
