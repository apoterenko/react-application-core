import * as React from 'react';

import {
  ConditionUtils,
  PropsUtils,
} from '../../../util';
import {
  IGenericPdfPlugin,
  IPdfViewerProps,
  IViewerCtor,
  IViewerProps,
} from '../../../definition';
import { GenericPdfPlugin } from './generic-pdf.plugin';
import { Viewer } from '../viewer.component';

export class PdfViewer extends Viewer {

  public static readonly defaultProps = PropsUtils.mergeWithParentDefaultProps<IViewerProps>({}, Viewer);

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
   * @stable [14.12.2020]
   * @protected
   */
  protected get ctor(): IViewerCtor {
    return PdfViewer;
  }

  /**
   * @stable [14.12.2020]
   * @protected
   */
  protected get contentElement(): JSX.Element {
    return (
      <canvas
        ref={this.canvasRef}/>
    );
  }

  /**
   * @stable [14.12.2020]
   * @protected
   */
  protected get previewElement(): JSX.Element {
    return (
      <PdfViewer
        usePreview={false}
        src={this.actualSrc}
        page={this.actualOrDefaultPreviewPage}
        scale={this.actualOrDefaultPreviewScale}/>
    );
  }

  /**
   * @stable [13.12.2020]
   * @protected
   */
  protected get isPreviewForwardActionDisabled(): boolean {
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
