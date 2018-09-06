import * as React from 'react';
import * as R from 'ramda';
import * as pdfjsLib from 'pdfjs-dist';
import * as Promise from 'bluebird';
import { LoggerFactory } from 'ts-smart-logger';

import { APP_VERSION } from '../../../env';
import { IPdfViewerProps, IPdfViewerState, IPdfViewerDocument, IPdfViewerPage } from './pdf-viewer.interface';
import { AnyT } from '../../../definitions.interface';
import { Viewer } from '../viewer.component';

export class PdfViewer extends Viewer<PdfViewer, IPdfViewerProps, IPdfViewerState> {

  public static defaultProps: IPdfViewerProps = {
    previewScale: 1.5,
    scale: .3,
    page: 1,
    usePreview: true,
  };

  private static PREVIEW_WIDTH = 600;
  private static logger = LoggerFactory.makeLogger('PdfViewer');

  private loadTask: Promise<IPdfViewerDocument>;
  private loadPageTask: Promise<IPdfViewerPage>;
  private loadedDocument: IPdfViewerDocument;

  /**
   * @stable [08.07.2018]
   * @param {IPdfViewerProps} props
   */
  constructor(props: IPdfViewerProps) {
    super(props);
    this.onLoad = this.onLoad.bind(this);
    this.onLoadError = this.onLoadError.bind(this);
    this.onLoadPage = this.onLoadPage.bind(this);

    pdfjsLib.GlobalWorkerOptions.workerSrc = `${this.settings.pdfWorkerDirectoryUrl}pdf.worker.min.js?${APP_VERSION}`;
  }

  /**
   * @stable [08.07.2018]
   * @param {IPdfViewerProps} props
   * @param {IPdfViewerState} state
   */
  public componentDidUpdate(props: IPdfViewerProps, state: IPdfViewerState) {
    super.componentDidUpdate(props, state);

    const currentProps = this.props;
    if (!R.equals(currentProps.page, props.page)) {
      this.refreshPage();
    }
  }

  /**
   * @stable [08.07.2018]
   */
  public componentWillUnmount(): void {
    super.componentWillUnmount();

    this.cancelTask();
    this.cancelPageTask();
  }

  /**
   * @stable [08.07.2018]
   * @returns {JSX.Element}
   */
  protected getRenderAreaElement(): JSX.Element {
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
    return R.isNil(this.loadedDocument);
  }

  /**
   * @stable [08.07.2018]
   */
  protected refresh(): void {
    const props = this.props;
    const src = props.src;

    if (!src) {
      return;
    }
    this.cancelTask();
    this.cancelPageTask();

    this.loadedDocument = null;

    const loadingTask = pdfjsLib.getDocument(src);
    this.loadTask = Promise.resolve<IPdfViewerDocument>(loadingTask.promise)
      .then<IPdfViewerDocument>(this.onLoad, this.onLoadError);
  }

  /**
   * @stable [08.07.2018]
   */
  private refreshPage(): void {
    const props = this.props;
    const page = props.page;

    this.loadPageTask = Promise.resolve<IPdfViewerPage>(this.loadedDocument.getPage(page))
      .then<IPdfViewerPage>(this.onLoadPage);
  }

  /**
   * @stable [08.07.2018]
   * @param {IPdfViewerPage} page
   * @returns {IPdfViewerPage}
   */
  private onLoadPage(page: IPdfViewerPage): IPdfViewerPage {
    const props = this.props;
    const viewport = page.getViewport(props.scale);

    const canvasContext = this.renderArea.getContext('2d');
    this.renderArea.height = viewport.height;
    this.renderArea.width = viewport.width;

    page.render({canvasContext, viewport});
    return page;
  }

  /**
   * @stable [08.07.2018]
   * @param {IPdfViewerDocument} pdf
   * @returns {IPdfViewerDocument}
   */
  private onLoad(pdf: IPdfViewerDocument): IPdfViewerDocument {
    this.loadedDocument = pdf;
    this.setState({error: null});
    this.refreshPage();
    return pdf;
  }

  /**
   * @stable [08.07.2018]
   * @param {AnyT} error
   * @returns {AnyT}
   */
  private onLoadError(error: AnyT): AnyT {
    PdfViewer.logger.error(`[$PdfViewer][onLoadError] Error:`, error);

    this.setState({error});
    return error;
  }

  /**
   * @stable [08.07.2018]
   * @returns {HTMLCanvasElement}
   */
  private get renderArea(): HTMLCanvasElement {
    return this.refs.canvas as HTMLCanvasElement;
  }

  /**
   * @stable [08.07.2018]
   */
  private cancelTask(): void {
    if (this.loadTask && this.loadTask.isPending()) {
      this.loadTask.cancel();

      PdfViewer.logger.warn(`[$PdfViewer][cancelTask] The pdf task has been cancelled.`);
    }
  }

  /**
   * @stable [08.07.2018]
   */
  private cancelPageTask(): void {
    if (this.loadPageTask && this.loadPageTask.isPending()) {
      this.loadPageTask.cancel();

      PdfViewer.logger.warn(`[$PdfViewer][cancelPageTask] The pdf page task has been cancelled.`);
    }
  }
}
