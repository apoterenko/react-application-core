import * as R from 'ramda';
import * as Promise from 'bluebird';
import * as pdfjsLib from 'pdfjs-dist';
import { LoggerFactory } from 'ts-smart-logger';

import { AnyT } from '../../../definitions.interface';
import { isFn } from '../../../util';
import { IPdfViewerDocument, IPdfViewerPage, IUniversalPdfPlugin } from './pdf-viewer.interface';

export class UniversalPdfPlugin implements IUniversalPdfPlugin {
  private static logger = LoggerFactory.makeLogger('UniversalPdfPlugin');

  private page = 1;
  private scale = 1;
  private src: string;
  private loadTask: Promise<IPdfViewerDocument>;
  private loadPageTask: Promise<IPdfViewerPage>;
  private loadedDocument: IPdfViewerDocument;

  /**
   * @stable [14.11.2018]
   * @param {string} workerSrc
   * @param {() => HTMLCanvasElement} canvasResolver
   * @param {() => void} onSuccess
   * @param {(error: AnyT) => void} onError
   */
  constructor(private workerSrc: string,
              private canvasResolver: () => HTMLCanvasElement,
              private onSuccess?: () => void,
              private onError?: (error: AnyT) => void) {
    this.onLoadError = this.onLoadError.bind(this);
    this.onLoadPage = this.onLoadPage.bind(this);
    this.onLoad = this.onLoad.bind(this);

    pdfjsLib.GlobalWorkerOptions.workerSrc = workerSrc;
  }

  /**
   * @stable [14.11.2018]
   * @param {number} page
   * @returns {IUniversalPdfPlugin}
   */
  public setPage(page: number): IUniversalPdfPlugin {
    this.page = page;
    return this;
  }

  /**
   * @stable [14.11.2018]
   * @param {string} src
   * @returns {IUniversalPdfPlugin}
   */
  public setSrc(src: string): IUniversalPdfPlugin {
    this.src = src;
    return this;
  }

  /**
   * @stable [14.11.2018]
   * @param {number} scale
   * @returns {IUniversalPdfPlugin}
   */
  public setScale(scale: number): IUniversalPdfPlugin {
    this.scale = scale;
    return this;
  }

  /**
   * @stable [14.11.2018]
   */
  public loadDocument(): void {
    this.cancel();

    if (!this.src) {
      UniversalPdfPlugin.logger.warn('[$UniversalPdfPlugin][loadDocument] The src is not defined!');
      return;
    }

    const loadTask = pdfjsLib.getDocument(this.src);
    this.loadTask = Promise.resolve<IPdfViewerDocument>(loadTask.promise)
      .then<IPdfViewerDocument>(this.onLoad, this.onLoadError);
  }

  /**
   * @stable [14.11.2018]
   */
  public refreshPage(): void {
    if (!this.hasLoadedDocument) {
      UniversalPdfPlugin.logger.warn('[$UniversalPdfPlugin][refreshPage] The document is not defined!');
      return;
    }
    this.loadPageTask = Promise.resolve<IPdfViewerPage>(this.loadedDocument.getPage(this.page))
      .then<IPdfViewerPage>(this.onLoadPage);
  }

  /**
   * @stable [14.11.2018]
   * @returns {boolean}
   */
  public get hasLoadedDocument(): boolean {
    return !R.isNil(this.loadedDocument);
  }

  /**
   * @stable [14.11.2018]
   */
  public cancel(): void {
    this.cancelTask();
    this.cancelPageTask();

    this.loadTask = null;
    this.loadPageTask = null;
    this.loadedDocument = null;
  }

  /**
   * @stable [14.11.2018]
   * @param {IPdfViewerDocument} pdf
   * @returns {IPdfViewerDocument}
   */
  private onLoad(pdf: IPdfViewerDocument): IPdfViewerDocument {
    this.loadedDocument = pdf;
    if (isFn(this.onSuccess)) {
      this.onSuccess();
    }
    this.refreshPage();
    return pdf;
  }

  /**
   * @stable [14.11.2018]
   * @param {IPdfViewerPage} page
   * @returns {IPdfViewerPage}
   */
  private onLoadPage(page: IPdfViewerPage): IPdfViewerPage {
    const viewport = page.getViewport(this.scale);

    const canvasContext = this.renderArea.getContext('2d');
    this.renderArea.height = viewport.height;
    this.renderArea.width = viewport.width;

    page.render({canvasContext, viewport});
    return page;
  }

  /**
   * @stable [14.11.2018]
   * @param {AnyT} error
   * @returns {AnyT}
   */
  private onLoadError(error: AnyT): AnyT {
    UniversalPdfPlugin.logger.error(`[$UniversalPdfPlugin][onLoadError] Error:`, error);

    if (isFn(this.onError)) {
      this.onError(error);
    }
    return error;
  }

  /**
   * @stable [14.11.2018]
   */
  private cancelTask(): void {
    if (this.loadTask && this.loadTask.isPending()) {
      this.loadTask.cancel();

      UniversalPdfPlugin.logger.warn(`[$UniversalPdfPlugin][cancelTask] The pdf task has been cancelled.`);
    }
  }

  /**
   * @stable [14.11.2018]
   */
  private cancelPageTask(): void {
    if (this.loadPageTask && this.loadPageTask.isPending()) {
      this.loadPageTask.cancel();

      UniversalPdfPlugin.logger.warn(`[$UniversalPdfPlugin][cancelPageTask] The pdf page task has been cancelled.`);
    }
  }

  /**
   * @stable [14.11.2018]
   * @returns {HTMLCanvasElement}
   */
  private get renderArea(): HTMLCanvasElement {
    return this.canvasResolver() as HTMLCanvasElement;
  }
}
