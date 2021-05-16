import * as React from 'react';

import {
  ClsUtils,
  ConditionUtils,
  PropsUtils,
} from '../../../util';
import {
  IGenericPdfPlugin,
  IPdfViewerProps,
  IViewerProps,
  IViewerState,
  ViewerClassesEnum,
} from '../../../definition';
import { GenericPdfPlugin } from './generic-pdf.plugin';
import { Viewer } from '../viewer.component';

/**
 * @component-impl
 * @stable [16.05.2021]
 */
export class PdfViewer extends Viewer {

  public static readonly defaultProps = PropsUtils.mergeWithParentDefaultProps<IViewerProps>({}, Viewer);

  private pdfRendererPlugin: IGenericPdfPlugin;
  private readonly canvasRef = React.createRef<HTMLCanvasElement>();

  /**
   * @stable [16.05.2021]
   * @param originalProps
   */
  constructor(originalProps: IPdfViewerProps) {
    super(originalProps);

    this.pdfRendererPlugin = new GenericPdfPlugin(
      `${this.settings.urls.pdfWorker}?_dc=${this.environment.appVersion}`,
      () => this.canvasRef.current,
      this.onLoadSucceed
    )
      .setAutoScale(true)
      .setOnStart(this.onLoadStart)
      .setOnError(this.onLoadError);
  }

  /**
   * @stable [16.05.2021]
   * @param prevProps
   * @param prevState
   */
  public componentDidUpdate(prevProps: IViewerProps, prevState: IViewerState): void {
    super.componentDidUpdate(prevProps, prevState);

    if (!this.isOpened && prevState.progress) {
      // Do invoke after PDF file loading
      this.doShowPreviewDialogIfApplicable();
    }
  }

  /**
   * @stable [16.05.2021]
   */
  public componentWillUnmount(): void {
    this.pdfRendererPlugin.cancel();
    this.pdfRendererPlugin = null;
  }

  /**
   * @stable [16.05.2021]
   */
  protected getClassName(): string {
    return ClsUtils.joinClassName(
      super.getClassName(),
      ViewerClassesEnum.PDF_VIEWER
    );
  }

  /**
   * @stable [16.05.2021]
   */
  protected refreshOnSrcChanges(): void {
    ConditionUtils.ifNotEmptyThanValue(
      this.actualSrc,
      (src) => {
        // This plugin can't process the null value

        this.pdfRendererPlugin
          .setSrc(src)
          .setPage(this.actualOrDefaultPage)
          .setScale(this.actualOrDefaultScale)
          .setDegree(this.actualOrDefaultDegree)
          .loadDocument();
      }
    );
  }

  /**
   * @stable [16.05.2021]
   */
  protected refreshOnInternalChanges(): void {
    this.pdfRendererPlugin
      .setPage(this.actualOrDefaultPage)
      .setScale(this.actualOrDefaultScale)
      .setDegree(this.actualOrDefaultDegree)
      .refreshPage();
  }

  /**
   * @stable [16.05.2021]
   */
  protected get contentElement(): JSX.Element {
    return (
      <canvas
        ref={this.canvasRef}
        className={ViewerClassesEnum.VIEWER_CONTENT}
        onClick={this.showPreviewDialogHandler}/>
    );
  }

  /**
   * @stable [16.05.2021]
   */
  protected get previewElement(): JSX.Element {
    return (
      <PdfViewer
        usePreview={false}
        src={this.actualSrc}
        page={this.actualOrDefaultPreviewPage}
        scale={this.actualOrDefaultPreviewScale}
        degree={this.actualOrDefaultPreviewDegree}/>
    );
  }

  /**
   * @stable [16.05.2021]
   */
  protected get isPreviewForwardActionDisabled(): boolean {
    return this.actualOrDefaultPreviewPage === this.pdfRendererPlugin.pagesCount;
  }

  /**
   * @stable [16.05.2021]
   */
  protected get defaultScale(): number {
    return 0; // Because of "auto scale = true" by default
  }
}
