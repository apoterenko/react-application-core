import { Prop } from 'vue-property-decorator';

import { IKeyValue } from '../../definitions.interface';
import { VueBaseComponent } from '../base/vue-index';
import { VUE_POPUP_CLOSE_EVENT } from '../popup/vue-index';
import {
  VueComponentOptionsT,
  VueCreateElementFactoryT,
  VueDefaultMethodsT,
  VueNodeT,
} from '../../vue-definitions.interface';
import {
  IVueViewerStateEntity,
  IVueViewerTemplateMethodsEntity,
} from './vue-viewer.interface';

export class VueViewer<TVueViewerStateEntity extends IVueViewerStateEntity = IVueViewerStateEntity>
  extends VueBaseComponent<IKeyValue, TVueViewerStateEntity> {

  @Prop() protected src: string;

  /**
   * @stable [28.11.2018]
   */
  constructor() {
    super();
    this.onOpenPopup = this.onOpenPopup.bind(this);
    this.onClosePopup = this.onClosePopup.bind(this);
  }

  /**
   * @stable [29.11.2018]
   * @param {VueCreateElementFactoryT} createElement
   * @returns {VueNodeT}
   */
  public render(createElement: VueCreateElementFactoryT): VueNodeT {
    const options: VueComponentOptionsT = {
      methods: this.getTemplateMethods() as VueDefaultMethodsT,
      template: `
        <vue-flex-layout :fullSize="true">
            ${this.getPreviewTemplate()}
            <vue-popup :open="isPopupOpened()"
                       @${VUE_POPUP_CLOSE_EVENT}="onClosePopup">
                ${this.getPopupHeaderTemplate()}
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
  public getInitialData$(): TVueViewerStateEntity {
    return {
      popup$: false,
    } as  TVueViewerStateEntity;
  }

  /**
   * @stable [29.11.2018]
   * @returns {IVueViewerTemplateMethodsEntity}
   */
  protected getTemplateMethods(): IVueViewerTemplateMethodsEntity {
    return {
      getSrc: () => this.src,
      isPopupOpened: () => this.getData().popup$,
      onOpenPopup: this.onOpenPopup,
      onClosePopup: this.onClosePopup,
    };
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
    // Nothing to do
  }

  /**
   * @stable [28.11.2018]
   */
  protected onAfterClosePopup(): void {
    // Nothing to do
  }

  /**
   * @stable [28.11.2018]
   */
  protected onOpenPopup(): void {
    this.getData().popup$ = true;
    this.$nextTick(() => this.onAfterOpenPopup());
  }

  /**
   * @stable [28.11.2018]
   */
  protected onClosePopup(): void {
    this.getData().popup$ = false;
    this.$nextTick(() => this.onAfterClosePopup());
  }
}
