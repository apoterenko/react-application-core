import * as React from 'react';

import { IUniversalPdfPlugin } from './pdf-viewer.interface';
import { Viewer } from '../viewer.component';
import { UniversalPdfPlugin } from './universal-pdf.plugin';
import {
  IPdfViewerProps,
} from '../../../definition';
import {
  ifNotNilThanValue,
} from '../../../util';

export class PdfViewer extends Viewer {

  private pdfRendererPlugin: IUniversalPdfPlugin;
  private readonly canvasRef = React.createRef<HTMLCanvasElement>();

  /**
   * @stable [16.03.2020]
   * @param {IPdfViewerProps} props
   */
  constructor(props: IPdfViewerProps) {
    super(props);

    this.pdfRendererPlugin = new UniversalPdfPlugin(
      `${this.settings.urls.pdfWorker}?_dc=${this.environment.appVersion}`,
      () => this.canvasRef.current,
      this.onLoadSucceed,
      this.onLoadStart,
      this.onLoadError
    );
  }

  /**
   * @stable [16.03.2020]
   */
  public componentWillUnmount(): void {
    this.pdfRendererPlugin.cancel();
    this.pdfRendererPlugin = null;

    super.componentWillUnmount();
  }

  /**
   * @stable [16.03.2020]
   */
  protected refreshOnSrcChanges(): void {
    ifNotNilThanValue(
      this.actualSrc,
      (src) => {
        // This plugin can't process the null value

        this.pdfRendererPlugin
          .setSrc(src)
          .setPage(this.actualOrDefaultPage)
          .setScale(this.actualScale)
          .loadDocument();
      }
    );
  }

  /**
   * @stable [16.03.2020]
   */
  protected refreshOnInternalChanges(): void {
    this.pdfRendererPlugin
      .setPage(this.actualOrDefaultPage)
      .setScale(this.actualScale)
      .refreshPage();
  }

  /**
   * @stable [16.03.2020]
   * @returns {JSX.Element}
   */
  protected getContentElement(): JSX.Element {
    return <canvas ref={this.canvasRef}/>;
  }

  /**
   * @stable [16.03.2020]
   * @returns {JSX.Element}
   */
  protected gePreviewElement(): JSX.Element {
    return (
      <PdfViewer
        usePreview={false}
        src={this.actualSrc}
        page={this.actualOrDefaultPreviewPage}
        scale={this.actualPreviewScale}/>
    );
  }

  /**
   * @stable [16.03.2020]
   * @returns {boolean}
   */
  protected isPreviewForwardActionDisabled(): boolean {
    return this.actualOrDefaultPreviewPage === this.pdfRendererPlugin.numPages;
  }
}
