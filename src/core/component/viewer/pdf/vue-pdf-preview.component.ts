import { Component, Prop } from 'vue-property-decorator';
import * as dragscroll from 'dragscroll';

import { ENV } from '../../../env';
import { ComponentName } from '../../connector/vue-index';
import { VueBaseComponent } from '../../base/vue-index';
import { UniversalPdfPlugin } from './universal-pdf.plugin';
import { IUniversalPdfPlugin } from './pdf-viewer.interface';
import { IVuePdfPreviewState, IVuePdfPreviewProps } from './vue-pdf-preview.interface';

const INITIAL_SCALE = 1;

@ComponentName('vue-pdf-preview')
@Component({
  data: (): IVuePdfPreviewState => ({
    scale: INITIAL_SCALE,
  }),
  /**
   * Attention!! We can't use the @Watch('src') because of the very very strange error occurred:
   *    @Watch('src') public onChangeSrc(): void { !EMPTY! }
   *   'Error in callback for watcher "src": "TypeError: Cannot read property 'call' of undefined"'
   *    => :src="src"
   */
  template: `
    <vue-flex-layout class="vue-pdf-viewer">
       <vue-flex-layout class="vue-viewer-canvas dragscroll">
         <canvas ref="canvas"
                 :src="src"
                 class="rac-absolute"/>
       </vue-flex-layout>
       <div class="vue-viewer-scale-action
                   vue-icon-zoom-plus
                   vue-icon
                   rac-no-user-select"
            @click="onScaleIncrease">
          &nbsp;
       </div>
       <div class="vue-viewer-scale-action
                   vue-icon-zoom-minus
                   vue-icon
                   rac-no-user-select"
            @click="onScaleDecrease">
          &nbsp;
       </div>
    </vue-flex-layout>
  `,
})
class VuePdfPreview extends VueBaseComponent<{}, IVuePdfPreviewState>
  implements IVuePdfPreviewProps {

  @Prop() public src: string;
  @Prop({default: (): number => .5}) private scaleFactor: number;
  @Prop({default: (): string => 'pdf.worker.min.js'}) private pdfWorkerJs: string;

  private pdfPlugin: IUniversalPdfPlugin;

  /**
   * @stable [14.11.2018]
   */
  constructor() {
    super();

    this.pdfPlugin = new UniversalPdfPlugin(
      `${this.settings.pdfWorkerDirectoryUrl}${this.pdfWorkerJs}?_dc=${ENV.appVersion}`,
      () => this.$refs.canvas as HTMLCanvasElement
    );
  }

  /**
   * @stable [14.11.2018]
   */
  public mounted(): void {
    this.doRefresh();
  }

  /**
   * @stable [23.02.2019]
   */
  public updated(): void {
    this.doRefresh();
  }

  /**
   * @stable [18.11.2018]
   */
  public beforeDestroy(): void {
    this.pdfPlugin.cancel();
  }

  /**
   * @stable [11.11.2018]
   * @param {MouseEvent} event
   */
  private onClick(event: MouseEvent): void {
    this.$emit('click', event);
  }

  /**
   * @stable [14.11.2018]
   */
  private onScaleIncrease(): void {
    this.onChangeScale(this.scaleFactor);
  }

  /**
   * @stable [14.11.2018]
   */
  private onScaleDecrease(): void {
    this.onChangeScale(-this.scaleFactor);
  }

  /**
   * @stable [14.11.2018]
   * @param {number} scale
   */
  private onChangeScale(scale: number): void {
    this.getData().scale += scale;

    this.pdfPlugin
      .setScale(this.getData().scale)
      .refreshPage();
  }

  /**
   * @stable [19.02.2019]
   */
  private doRefresh(): void {
    dragscroll.reset();

    this.getData().scale = INITIAL_SCALE;
    this.pdfPlugin
      .setScale(this.getData().scale)
      .setSrc(this.src)
      .loadDocument();
  }
}
