import * as React from 'react';
import * as R from 'ramda';

import { ENV } from '../../../env';
import { IPdfViewerProps, IPdfViewerState, IUniversalPdfPlugin } from './pdf-viewer.interface';
import { Viewer } from '../viewer.component';
import { UniversalPdfPlugin } from './universal-pdf.plugin';
import { FlexLayout } from '../../layout/flex';
import { Button } from '../../button';

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

    this.state = {previewPage: 1};
    this.onPreviousPage = this.onPreviousPage.bind(this);
    this.onNextPage = this.onNextPage.bind(this);

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

    const currentPage = this.props.page;
    if (!R.equals(currentPage, props.page)) {
      this.pdfRendererPlugin
        .setPage(currentPage)
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
    const src = props.src;

    if (R.isNil(src)) {
      // This plugin can't process the null value
      return;
    }

    this.pdfRendererPlugin
      .setSrc(src)
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
      <React.Fragment>
        <PdfViewer
          usePreview={false}
          src={props.src}
          page={this.state.previewPage}
          style={{width: '100%'}}
          scale={previewScale}/>
        <FlexLayout
          full={false}
          row={true}
          className='pos-neighbor-left-half-offset-wrapper'
        >
          <Button
            icon='back2'
            text={'Previous page'}
            disabled={this.state.previewPage === 1}
            onClick={this.onPreviousPage}/>
          <Button
            icon='forward'
            text={'Next page'}
            disabled={this.state.previewPage === this.pdfRendererPlugin.numPages}
            onClick={this.onNextPage}/>
        </FlexLayout>
      </React.Fragment>
    );
  }

  /**
   * @stable [08.07.2018]
   * @returns {boolean}
   */
  protected get isProgressMessageShown(): boolean {
    return !this.pdfRendererPlugin.hasLoadedDocument;
  }

  protected onDialogClose(): void {
    this.setState({opened: false, previewPage: 1});
  }

  private onPreviousPage(): void {
    this.setState({previewPage: this.state.previewPage - 1});
  }

  private onNextPage(): void {
    this.setState({previewPage: this.state.previewPage + 1});
  }
}
