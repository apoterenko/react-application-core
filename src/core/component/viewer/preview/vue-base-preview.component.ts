import { Prop } from 'vue-property-decorator';
import * as dragscroll from 'dragscroll';

import {
  VueCreateElementFactoryT,
  VueNodeT,
  VueComponentOptionsT,
  VueDefaultMethodsT,
} from '../../../vue-definitions.interface';
import { VueBaseComponent } from '../../base/vue-index';
import {
  IVueBasePreviewProps,
  IVueBasePreviewState,
  IVueBasePreviewTemplateMethods,
} from './vue-base-preview.interface';

export abstract class VueBasePreview<TVuePreviewState extends IVueBasePreviewState = TVuePreviewState>
  extends VueBaseComponent
  implements IVueBasePreviewProps,
             IVueBasePreviewTemplateMethods {

  @Prop() public src: string;
  @Prop({default: (): number => 1}) public scaleFactor: number;

  /**
   * @stable [30.01.2019]
   * @param {VueCreateElementFactoryT} createElement
   * @returns {VueNodeT}
   */
  public render(createElement: VueCreateElementFactoryT): VueNodeT {
    const options: VueComponentOptionsT = {
      methods: this.getTemplateMethods() as VueDefaultMethodsT,
      template: `
          <vue-flex-layout class="vue-preview">
              <vue-flex-layout class="vue-preview-content dragscroll">
                    ${this.getPreviewTemplate()}
              </vue-flex-layout>
              <div class="vue-viewer-scale-action
                          vue-icon-search-zoom-plus
                          vue-icon
                          rac-no-user-select"
                          @click="onScaleIncrease">
                    &nbsp;
              </div>
              <div class="vue-viewer-scale-action
                          vue-icon-search-zoom-minus
                          vue-icon
                          rac-no-user-select"
                          @click="onScaleDecrease">
                    &nbsp;
              </div>
          </vue-flex-layout>
      `,
    };
    return createElement(options);
  }

  /**
   * @stable [14.11.2018]
   */
  public mounted(): void {
    dragscroll.reset();
  }

  /**
   * @stable [14.11.2018]
   */
  public onScaleIncrease(): void {
    this.onChangeScale(this.scaleFactor);
  }

  /**
   * @stable [14.11.2018]
   */
  public onScaleDecrease(): void {
    this.onChangeScale(-this.scaleFactor);
  }

  /**
   * @stable [30.01.2019]
   * @returns {TVuePreviewState}
   */
  public getInitialData$(): TVuePreviewState {
    return {
      scale: 1,
    } as  TVuePreviewState;
  }

  /**
   * @stable [30.01.2019]
   * @returns {TMethods}
   */
  protected getTemplateMethods<TMethods extends IVueBasePreviewTemplateMethods>(): TMethods {
    return {
      onScaleIncrease: this.onScaleIncrease,
      onScaleDecrease: this.onScaleDecrease,
    } as TMethods;
  }

  /**
   * @stable [30.01.2019]
   * @returns {string}
   */
  protected abstract getPreviewTemplate(): string;

  /**
   * @stable [11.11.2018]
   * @param {MouseEvent} event
   */
  private onClick(event: MouseEvent): void {
    this.$emit('click', event);
  }

  /**
   * @stable [14.11.2018]
   * @param {number} scale
   */
  private onChangeScale(scale: number): void {
    this.$data.scale += scale;
  }
}
