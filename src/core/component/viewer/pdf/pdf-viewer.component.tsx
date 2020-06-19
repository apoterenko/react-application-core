import * as React from 'react';

import { ConditionUtils } from '../../../util';
import {
  IGenericPdfPlugin,
  IPdfViewerProps,
} from '../../../definition';
import { GenericPdfPlugin } from './generic-pdf.plugin';
import { Viewer } from '../viewer.component';

export class PdfViewer extends Viewer {

  private pdfRendererPlugin: IGenericPdfPlugin;
  private readonly canvasRef = React.createRef<HTMLCanvasElement>();

  /**
   * @stable [16.03.2020]
   * @param {IPdfViewerProps} props
   */
  constructor(props: IPdfViewerProps) {
    super(props);

    this.pdfRendererPlugin =
      new GenericPdfPlugin(
        `${this.settings.urls.pdfWorker}?_dc=${this.environment.appVersion}`,
        () => this.canvasRef.current,
        this.onLoadSucceed
      )
        .setAutoScale(true)
        .setOnStart(this.onLoadStart)
        .setOnError(this.onLoadError);
  }

  /**
   * @stable [16.03.2020]
   */
  public componentWillUnmount(): void {
    this.pdfRendererPlugin.cancel();
    this.pdfRendererPlugin = null;
  }

  /**
   * @stable [16.03.2020]
   */
  protected refreshOnSrcChanges(): void {
    ConditionUtils.ifNotNilThanValue(
      this.actualSrc,
      (src) => {
        // This plugin can't process the null value

        this.pdfRendererPlugin
          .setSrc(src)
          .setPage(this.actualOrDefaultPage)
          .setScale(this.actualOrDefaultScale)
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
      .setScale(this.actualOrDefaultScale)
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
        scale={this.actualOrDefaultPreviewScale}/>
    );
  }

  /**
   * @stable [16.03.2020]
   * @returns {boolean}
   */
  protected isPreviewForwardActionDisabled(): boolean {
    return this.actualOrDefaultPreviewPage === this.pdfRendererPlugin.pagesCount;
  }

  /**
   * @stable [23.03.2020]
   * @returns {number}
   */
  protected get defaultScale(): number {
    return 0; // Because of "autoscale = true" by default
  }
}
