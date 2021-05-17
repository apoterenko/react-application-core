import * as R from 'ramda';
import * as BPromise from 'bluebird';
import * as pdfjsLib from 'pdfjs-dist';
import { LoggerFactory } from 'ts-smart-logger';

import {
  PromiseUtils,
  TypeUtils,
} from '../../../util';
import {
  IDomAccessor,
  IGenericPdfPlugin,
  IPdfViewerDocumentEntity,
  IPdfViewerPageEntity,
} from '../../../definition';
import {
  DI_TYPES,
  lazyInject,
} from '../../../di';

/**
 * @generic-plugin-impl
 * @stable [17.05.2021]
 */
export class GenericPdfPlugin implements IGenericPdfPlugin {
  private static readonly logger = LoggerFactory.makeLogger('GenericPdfPlugin');
  private static readonly DEFAULT_SCALE = 1;

  @lazyInject(DI_TYPES.DomAccessor) private readonly domAccessor: IDomAccessor;

  // @stable [17.05.2021]
  private autoScale = true;
  private degree: number;
  private page = 1;
  private scale: number;
  private src: string;

  // @stable [17.05.2021]
  private $$initialScale: number;
  private $$loadedDocument: IPdfViewerDocumentEntity;

  // @stable [17.05.2021]
  private $$loadPageTask: BPromise<IPdfViewerPageEntity | Error>;
  private $$loadTask: BPromise<IPdfViewerDocumentEntity | Error>;

  // @stable [17.05.2021]
  private onError?: (error: Error) => void;
  private onStart: () => void;

  /**
   * @stable [17.05.2021]
   * @param workerSrc
   * @param canvasResolver
   * @param onFinish
   */
  constructor(private readonly workerSrc: string,
              private readonly canvasResolver: () => HTMLCanvasElement,
              private readonly onFinish?: (callback: (page: IPdfViewerPageEntity) => void) => void) {

    this.onLoad = this.onLoad.bind(this);
    this.onLoadError = this.onLoadError.bind(this);
    this.onLoadPage = this.onLoadPage.bind(this);

    pdfjsLib.GlobalWorkerOptions.workerSrc = workerSrc;
  }

  /**
   * @stable [17.05.2021]
   * @param onStart
   */
  public setOnStart(onStart: () => void): IGenericPdfPlugin {
    this.onStart = onStart;
    return this;
  }

  /**
   * @stable [17.05.2021]
   * @param onError
   */
  public setOnError(onError: (error: Error) => void): IGenericPdfPlugin {
    this.onError = onError;
    return this;
  }

  /**
   * @stable [17.05.2021]
   * @param page
   */
  public setPage(page: number): IGenericPdfPlugin {
    this.page = page;
    return this;
  }

  /**
   * @stable [17.05.2021]
   * @param degree
   */
  public setDegree(degree: number): IGenericPdfPlugin {
    this.degree = degree;
    return this;
  }

  /**
   * @stable [17.05.2021]
   * @param src
   */
  public setSrc(src: string): IGenericPdfPlugin {
    this.src = src;
    return this;
  }

  /**
   * @stable [17.05.2021]
   * @param scale
   */
  public setScale(scale: number): IGenericPdfPlugin {
    this.scale = scale;
    return this;
  }

  /**
   * @stable [17.05.2021]
   * @param autoScale
   */
  public setAutoScale(autoScale: boolean): IGenericPdfPlugin {
    this.autoScale = autoScale;
    return this;
  }

  /**
   * @stable [17.05.2021]
   */
  public loadDocument(): void {
    this.cancel();

    if (!this.src) {
      GenericPdfPlugin.logger.warn('[$GenericPdfPlugin][loadDocument] Src is not defined');
      return;
    }
    if (TypeUtils.isFn(this.onStart)) {
      this.onStart();
    }
    this.$$loadTask = BPromise
      .resolve(pdfjsLib.getDocument(this.src).promise)
      .then(this.onLoad, this.onLoadError);
  }

  /**
   * @stable [17.05.2021]
   */
  public refreshPage(): void {
    if (!this.hasLoadedDocument) {
      GenericPdfPlugin.logger.warn('[$GenericPdfPlugin][refreshPage] Document is not defined');
      return;
    }
    this.$$loadPageTask = BPromise
      .resolve(this.$$loadedDocument.getPage(this.page))
      .then(
        (page) => {
          if (TypeUtils.isFn(this.onFinish)) {
            this.onFinish(() => this.onLoadPage(page));
          } else {
            this.onLoadPage(page);
          }
          return page;
        },
        this.onLoadError
      );
  }

  /**
   * @stable [17.05.2021]
   */
  public get hasLoadedDocument(): boolean {
    return !R.isNil(this.$$loadedDocument);
  }

  /**
   * @stable [17.05.2021]
   */
  public get pagesCount(): number {
    return this.$$loadedDocument.numPages;
  }

  /**
   * @stable [17.05.2021]
   */
  public cancel(): void {
    this.cancelTask();
    this.cancelPageTask();

    // @stable [17.05.2021]
    this.$$initialScale = null;
    this.$$loadedDocument = null;
  }

  /**
   * @stable [17.05.2021]
   * @param pdf
   */
  private onLoad(pdf: IPdfViewerDocumentEntity): IPdfViewerDocumentEntity {
    this.$$loadedDocument = pdf;
    this.refreshPage();
    return pdf;
  }

  /**
   * @stable [17.05.2021]
   * @param page
   */
  private onLoadPage(page: IPdfViewerPageEntity): IPdfViewerPageEntity {
    const renderArea = this.renderArea;
    const w = this.domAccessor.getWidth(renderArea.parentElement);
    const h = this.domAccessor.getHeight(renderArea.parentElement);

    if (this.autoScale) {
      const unscaledViewport = page.getViewport(GenericPdfPlugin.DEFAULT_SCALE);
      this.$$initialScale = R.isNil(this.$$initialScale)
        ? Math.min(h / unscaledViewport.height, w / unscaledViewport.width)
        : this.$$initialScale;
    } else {
      this.$$initialScale = 0;
    }

    const hasOuterScale = TypeUtils.isNumber(this.scale);
    const viewport = page.getViewport(this.$$initialScale + (hasOuterScale ? this.scale : 0), this.degree);

    renderArea.height = hasOuterScale ? viewport.height : h;
    renderArea.width = hasOuterScale ? viewport.width : w;

    page.render({
      canvasContext: renderArea.getContext('2d'),
      viewport,
    });
    return page;
  }

  /**
   * @stable [17.05.2021]
   * @param error
   */
  private onLoadError(error: Error): Error {
    GenericPdfPlugin.logger.error(`[$GenericPdfPlugin][onLoadError] Error:`, error);

    if (TypeUtils.isFn(this.onError)) {
      this.onError(error);
    }
    return error;
  }

  /**
   * @stable [17.05.2021]
   */
  private cancelTask(): void {
    if (PromiseUtils.cancel(this.$$loadTask)) {
      GenericPdfPlugin.logger.debug('[$GenericPdfPlugin][cancelTask] Pdf task has been cancelled');
    }
    this.$$loadTask = null;
  }

  /**
   * @stable [17.05.2021]
   */
  private cancelPageTask(): void {
    if (PromiseUtils.cancel(this.$$loadPageTask)) {
      GenericPdfPlugin.logger.debug('[$GenericPdfPlugin][cancelPageTask] Pdf page task has been cancelled');
    }
    this.$$loadPageTask = null;
  }

  /**
   * @stable [17.05.2021]
   */
  private get renderArea(): HTMLCanvasElement {
    return this.canvasResolver();
  }
}
