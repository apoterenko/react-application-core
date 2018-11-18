import { Component, Prop } from 'vue-property-decorator';
import * as dragscroll from 'dragscroll';

import { ENV } from '../../../env';
import { ComponentName } from '../../connector/vue-index';
import { VueBaseComponent } from '../../base/vue-index';
import { UniversalPdfPlugin } from './universal-pdf.plugin';
import { IUniversalPdfPlugin } from './pdf-viewer.interface';

@ComponentName('vue-pdf-viewer')
@Component({
  data: () => ({
    scale: 1,
  }),
  template: `
    <vue-flex-layout class="vue-pdf-viewer">
       <vue-flex-layout class="vue-viewer-canvas dragscroll">
         <canvas ref="canvas"
                 class="rac-absolute"/>
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
})
class VuePdfViewer extends VueBaseComponent {
  @Prop() private text: string;
  @Prop() private src: string;
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
    dragscroll.reset();

    this.pdfPlugin
      .setScale(this.$data.scale)
      .setSrc(this.src)
      .loadDocument();
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
    this.$data.scale += scale;

    this.pdfPlugin
      .setScale(this.$data.scale)
      .refreshPage();
  }
}
