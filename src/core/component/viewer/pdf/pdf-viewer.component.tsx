import * as React from 'react';
import * as R from 'ramda';

import { ENV } from '../../../env';
import { IPdfViewerProps, IPdfViewerState, IUniversalPdfPlugin } from './pdf-viewer.interface';
import { Viewer } from '../viewer.component';
import { UniversalPdfPlugin } from './universal-pdf.plugin';

export class PdfViewer extends Viewer<IPdfViewerProps, IPdfViewerState> {

  public static defaultProps: IPdfViewerProps = {
    previewScale: 1.5,
    scale: .3,
    page: 1,
    usePreview: true,
  };

  private static PREVIEW_WIDTH = 600;
  private pdfRendererPlugin: IUniversalPdfPlugin;

  /**
   * @stable [08.07.2018]
   * @param {IPdfViewerProps} props
   */
  constructor(props: IPdfViewerProps) {
    super(props);

    this.pdfRendererPlugin = new UniversalPdfPlugin(
      `${this.settings.pdfWorkerDirectoryUrl}pdf.worker.min.js?_dc=${ENV.appVersion}`,
      () => this.refs.canvas as HTMLCanvasElement,
      () => this.setState({error: null}),
      (error) => this.setState({error})
    );
  }

  /**
   * @stable [14.11.2018]
   * @param {IPdfViewerProps} props
   * @param {IPdfViewerState} state
   */
  public componentDidUpdate(props: IPdfViewerProps, state: IPdfViewerState): void {
    super.componentDidUpdate(props, state);

    if (!R.equals(this.props.page, props.page)) {
      this.pdfRendererPlugin
        .setPage(props.page)
        .refreshPage();
    }
  }

  /**
   * @stable [14.11.2018]
   */
  public componentWillUnmount(): void {
    this.pdfRendererPlugin.cancel();
    this.pdfRendererPlugin = null;

    super.componentWillUnmount();
  }

  /**
   * @stable [14.11.2018]
   */
  protected refresh(): void {
    const props = this.props;

    this.pdfRendererPlugin
      .setSrc(props.src)
      .setScale(props.scale)
      .loadDocument();
  }

  /**
   * @stable [08.07.2018]
   * @returns {JSX.Element}
   */
  protected getContentElement(): JSX.Element {
    return <canvas ref='canvas'/>;
  }

  /**
   * @stable [08.07.2018]
   * @returns {JSX.Element}
   */
  protected gePreviewElement(): JSX.Element {
    const props = this.props;
    const previewScale = props.previewScale;
    const previewWidth = PdfViewer.PREVIEW_WIDTH * previewScale;
    return (
      <PdfViewer src={props.src}
                 style={{width: previewWidth}}
                 usePreview={false}
                 scale={previewScale}/>
    );
  }

  /**
   * @stable [08.07.2018]
   * @returns {boolean}
   */
  protected get isProgressMessageShown(): boolean {
    return !this.pdfRendererPlugin.hasLoadedDocument;
  }
}
