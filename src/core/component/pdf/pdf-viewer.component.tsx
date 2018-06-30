import * as React from 'react';
import * as R from 'ramda';
import * as pdfjsLib from 'pdfjs-dist';
import * as Promise from 'bluebird';
import { LoggerFactory } from 'ts-smart-logger';

import { APP_VERSION } from '../../env';
import { toClassName , orDefault, orNull } from '../../util';
import { BaseComponent } from '../base';
import { IPdfViewerProps, IPdfViewerState, IPdfViewerDocument, IPdfViewerPage } from './pdf-viewer.interface';
import { FlexLayout, CenterLayout } from '../layout';
import { AnyT } from '../../definitions.interface';
import { IUniversalDialog, Dialog } from '../dialog';

export class PdfViewer extends BaseComponent<PdfViewer, IPdfViewerProps, IPdfViewerState> {

  public static defaultProps: IPdfViewerProps = {
    previewScale: 1.5,
    scale: .3,
    page: 1,
    usePreview: true,
  };

  private static PREVIEW_WIDTH = 600;

  private static logger = LoggerFactory.makeLogger(PdfViewer);

  private loadTask: Promise<IPdfViewerDocument>;
  private loadPageTask: Promise<IPdfViewerPage>;
  private loadedDocument: IPdfViewerDocument;

  /**
   * @stable [27.06.2018]
   * @param {IPdfViewerProps} props
   */
  constructor(props: IPdfViewerProps) {
    super(props);
    this.onLoad = this.onLoad.bind(this);
    this.onLoadError = this.onLoadError.bind(this);
    this.onLoadPage = this.onLoadPage.bind(this);
    this.onPreview = this.onPreview.bind(this);
    this.onDialogClose = this.onDialogClose.bind(this);
    this.state = {};

    pdfjsLib.GlobalWorkerOptions.workerSrc = `${this.settings.pdfWorkerDirectoryUrl}pdf.worker.js?${APP_VERSION}`;
  }

  /**
   * @stable [27.06.2018]
   * @param {IPdfViewerProps} props
   * @param {{}} state
   */
  public componentDidUpdate(props: IPdfViewerProps, state: {}) {
    super.componentDidUpdate(props, state);

    const currentProps = this.props;
    if (!R.equals(currentProps.src, props.src)) {
      this.refresh();
    } else if (!R.equals(currentProps.page, props.page)) {
      this.refreshPage();
    }
  }

  /**
   * @stable [27.06.2018]
   */
  public componentDidMount(): void {
    super.componentDidMount();

    this.refresh();
  }

  /**
   * @stable [27.06.2018]
   */
  public componentWillUnmount(): void {
    super.componentWillUnmount();

    this.cancelTask();
    this.cancelPageTask();
  }

  /**
   * @stable [30.06.2018]
   * @returns {JSX.Element}
   */
  public render(): JSX.Element {
    const state = this.state;
    const props = this.props;
    const isErrorExist = !R.isNil(state.error);
    const isSrcNotPresent = R.isNil(props.src);
    const isShowMessage = isErrorExist || isSrcNotPresent;
    const previewScale = props.previewScale;
    const previewWidth = PdfViewer.PREVIEW_WIDTH * previewScale;

    return (
      <FlexLayout style={props.style}
                  className={toClassName('rac-pdf-viewer', this.props.className)}>
        {orDefault<JSX.Element, JSX.Element>(
          isShowMessage,
          () => (
            <CenterLayout>{
              this.t(isErrorExist
                ? this.settings.messages.pdfErrorMessage
                : this.settings.messages.noPdfToShow)
            }</CenterLayout>
          ),
          () => <canvas ref='canvas'/>,
        )}
        {
          orNull<JSX.Element>(
            !isShowMessage && props.usePreview,
            () => (
              this.uiFactory.makeIcon({
                type: 'search_plus',
                className: 'rac-pdf-preview-action-icon rac-absolute-center-position',
                onClick: this.onPreview,
              })
            )
          )
        }
        {
          orNull<JSX.Element>(
            !isShowMessage,
            () => (
              <Dialog ref='dialog'
                      className='rac-pdf-preview-dialog'
                      title='Preview'
                      closeMessage='Close'
                      acceptable={false}
                      onClose={this.onDialogClose}>
                {
                  orNull<JSX.Element>(
                    state.opened,
                    () => (
                      <PdfViewer src={props.src}
                                 style={{width: previewWidth}}
                                 usePreview={false}
                                 scale={previewScale}/>
                    )
                  )
                }
              </Dialog>
            )
          )
        }
      </FlexLayout>
    );
  }

  /**
   * @stable [27.06.2018]
   */
  private refresh(): void {
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
   * @stable [27.06.2018]
   */
  private refreshPage(): void {
    const props = this.props;
    const page = props.page;

    this.loadPageTask = Promise.resolve<IPdfViewerPage>(this.loadedDocument.getPage(page))
      .then<IPdfViewerPage>(this.onLoadPage);
  }

  /**
   * @stable [27.06.2018]
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
   * @stable [27.06.2018]
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
   * @stable [27.06.2018]
   * @param {AnyT} error
   * @returns {AnyT}
   */
  private onLoadError(error: AnyT): AnyT {
    PdfViewer.logger.error(`[$PdfViewer][onLoadError] Error:`, error);

    this.setState({error});
    return error;
  }

  /**
   * @stable [27.06.2018]
   * @returns {HTMLCanvasElement}
   */
  private get renderArea(): HTMLCanvasElement {
    return this.refs.canvas as HTMLCanvasElement;
  }

  /**
   * @stable [27.06.2018]
   */
  private cancelTask(): void {
    if (this.loadTask && this.loadTask.isPending()) {
      this.loadTask.cancel();

      PdfViewer.logger.warn(`[$PdfViewer][cancelTask] The pdf task has been cancelled.`);
    }
  }

  /**
   * @stable [27.06.2018]
   */
  private cancelPageTask(): void {
    if (this.loadPageTask && this.loadPageTask.isPending()) {
      this.loadPageTask.cancel();

      PdfViewer.logger.warn(`[$PdfViewer][cancelPageTask] The pdf page task has been cancelled.`);
    }
  }

  /**
   * @stable [30.06.2018]
   */
  private onDialogClose(): void {
    this.setState({opened: false});
  }

  /**
   * @stable [30.06.2018]
   */
  private onPreview(): void {
    this.setState({opened: true});

    const dialog = this.refs.dialog as IUniversalDialog;
    dialog.activate();
  }
}
