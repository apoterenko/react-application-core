import { Prop } from 'vue-property-decorator';
import * as R from 'ramda';

import { IKeyValue, IEntity } from '../../definitions.interface';
import { calc, toClassName, orEmpty } from '../../util';
import { VueBaseComponent } from '../base/vue-index';
import {
  VUE_POPUP_CLOSE_EVENT,
  VUE_POPUP_HEADER_SLOT,
} from '../popup/vue-index';
import {
  VueComponentOptionsT,
  VueCreateElementFactoryT,
  VueDefaultMethodsT,
  VueNodeT,
} from '../../vue-definitions.interface';
import {
  IVueViewerState,
  IVueViewerTemplateMethodsEntity,
  IVueViewerProps,
  VUE_VIEWER_REMOVE_EVENT,
} from './vue-viewer.interface';

export class VueViewer<TVueViewerState extends IVueViewerState = IVueViewerState>
  extends VueBaseComponent<IKeyValue, TVueViewerState> implements IVueViewerProps {

  @Prop() public src: string;
  @Prop() public entity: IEntity;
  @Prop() public previewAttachment: string | ((entity: IEntity) => string);
  @Prop() public popupClassName: string | ((entity: IEntity) => string);

  /**
   * @stable [29.11.2018]
   * @param {VueCreateElementFactoryT} createElement
   * @returns {VueNodeT}
   */
  public render(createElement: VueCreateElementFactoryT): VueNodeT {
    const options: VueComponentOptionsT = {
      methods: this.getTemplateMethods() as VueDefaultMethodsT,
      template: `
        <vue-flex-layout class="${this.getClassName()}">
            ${this.getPreviewTemplate()}
            ${this.getPreviewTemplateAttachment()}
            <vue-popup :open="isPopupOpened()"
                       className="${this.getPopupClassName()}"
                       @${VUE_POPUP_CLOSE_EVENT}="onClosePopup">
                <template slot="${VUE_POPUP_HEADER_SLOT}">
                    ${this.getPopupHeaderTemplate()}
                </template>
                <template>
                    ${this.getPopupBodyTemplate()}
                </template>
                ${this.getPopupFooterTemplate()}
            </vue-popup>
        </vue-flex-layout>
      `,
    };
    return createElement(options);
  }

  /**
   * @stable [29.11.2018]
   * @returns {TVueViewerStateEntity}
   */
  public getInitialData$(): TVueViewerState {
    return {
      popup: false,
    } as  TVueViewerState;
  }

  /**
   * @stable [29.11.2018]
   * @returns {IVueViewerTemplateMethodsEntity}
   */
  protected getTemplateMethods(): IVueViewerTemplateMethodsEntity {
    return {
      getSrc: () => this.src,
      isPopupOpened: () => this.getData().popup,
      onOpenPopup: this.onOpenPopup,
      onClosePopup: this.onClosePopup,
      onRemove: this.onRemove,
    };
  }

  /**
   * @stable [09.12.2018]
   */
  protected onRemove(): void {
    this.$emit(VUE_VIEWER_REMOVE_EVENT, this.src);
  }

  /**
   * @stable [29.11.2018]
   * @returns {string}
   */
  protected getPopupFooterTemplate(): string {
    return '';
  }

  /**
   * @stable [29.11.2018]
   * @returns {string}
   */
  protected getPopupHeaderTemplate(): string {
    return '';
  }

  /**
   * @stable [29.11.2018]
   * @returns {string}
   */
  protected getPreviewTemplate(): string {
    return '';
  }

  /**
   * @stable [20.01.2019]
   * @returns {string}
   */
  protected getPreviewTemplateAttachment(): string {
    return orEmpty(
      !R.isNil(this.previewAttachment),
      () => {
        const content = calc(this.previewAttachment, this.entity);
        return orEmpty(
          !R.isNil(content) && !R.isEmpty(content),
          () => (
            `<div class="vue-viewer-preview-attachment"
                  v-on:click="onOpenPopup">${content}</div>`
          )
        );
      }
    );
  }

  /**
   * @stable [22.12.2018]
   * @returns {string}
   */
  protected getPreviewClassName(): string {
    return 'vue-viewer-preview';
  }

  /**
   * @stable [06.01.2018]
   * @returns {string}
   */
  protected getClassName(): string {
    return toClassName('vue-viewer', calc(this.className, this.entity));
  }

  /**
   * @stable [20.01.2019]
   * @returns {string}
   */
  protected getPopupClassName(): string {
    return toClassName('vue-viewer-popup', calc(this.popupClassName, this.entity));
  }

  /**
   * @stable [28.11.2018]
   * @returns {string}
   */
  protected getPopupBodyTemplate(): string {
    return '';
  }

  /**
   * @stable [28.11.2018]
   */
  protected onAfterOpenPopup(): void {
    // Do nothing
  }

  /**
   * @stable [28.11.2018]
   */
  protected onAfterClosePopup(): void {
    // Do nothing
  }

  /**
   * @stable [28.11.2018]
   */
  protected onOpenPopup(): void {
    this.getData().popup = true;
    this.$nextTick(() => this.onAfterOpenPopup());
  }

  /**
   * @stable [28.11.2018]
   */
  protected onClosePopup(): void {
    this.getData().popup = false;
    this.$nextTick(() => this.onAfterClosePopup());
  }
}
