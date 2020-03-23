import * as R from 'ramda';
import * as Promise from 'bluebird';
import * as pdfjsLib from 'pdfjs-dist';
import { LoggerFactory } from 'ts-smart-logger';

import { AnyT } from '../../../definitions.interface';
import {
  isFn,
  isNumber,
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

export class GenericPdfPlugin implements IGenericPdfPlugin {
  private static readonly logger = LoggerFactory.makeLogger('GenericPdfPlugin');
  private static readonly DEFAULT_VIEWPORT_SCALE = 1;

  @lazyInject(DI_TYPES.DomAccessor) private readonly domAccessor: IDomAccessor;

  private autoScale = true;
  private initialScale: number;
  private loadedDocument: IPdfViewerDocumentEntity;
  private loadPageTask: Promise<IPdfViewerPageEntity>;
  private loadTask: Promise<IPdfViewerDocumentEntity>;
  private onError?: (error: AnyT) => void;
  private onStart: () => void;
  private page = 1;
  private scale: number;
  private src: string;

  /**
   * @stable [23.03.2020]
   * @param {string} workerSrc
   * @param {() => HTMLCanvasElement} canvasResolver
   * @param {(callback: (page: IPdfViewerPageEntity) => void) => void} onFinish
   */
  constructor(private workerSrc: string,
              private canvasResolver: () => HTMLCanvasElement,
              private onFinish: (callback: (page: IPdfViewerPageEntity) => void) => void) {
    this.onLoadError = this.onLoadError.bind(this);
    this.onLoadPage = this.onLoadPage.bind(this);
    this.onLoad = this.onLoad.bind(this);

    pdfjsLib.GlobalWorkerOptions.workerSrc = workerSrc;
  }

  /**
   * @stable [23.03.2020]
   * @param {() => void} onStart
   * @returns {IGenericPdfPlugin}
   */
  public setOnStart(onStart: () => void): IGenericPdfPlugin {
    this.onStart = onStart;
    return this;
  }

  /**
   * @stable [23.03.2020]
   * @param {(error: AnyT) => void} onError
   * @returns {IGenericPdfPlugin}
   */
  public setOnError(onError: (error: AnyT) => void): IGenericPdfPlugin {
    this.onError = onError;
    return this;
  }

  /**
   * @stable [14.11.2018]
   * @param {number} page
   * @returns {IGenericPdfPlugin}
   */
  public setPage(page: number): IGenericPdfPlugin {
    this.page = page;
    return this;
  }

  /**
   * @stable [14.11.2018]
   * @param {string} src
   * @returns {IGenericPdfPlugin}
   */
  public setSrc(src: string): IGenericPdfPlugin {
    this.src = src;
    return this;
  }

  /**
   * @stable [14.11.2018]
   * @param {number} scale
   * @returns {IGenericPdfPlugin}
   */
  public setScale(scale: number): IGenericPdfPlugin {
    this.scale = scale;
    return this;
  }

  /**
   * @stable [23.03.2020]
   * @param {boolean} autoScale
   * @returns {IGenericPdfPlugin}
   */
  public setAutoScale(autoScale: boolean): IGenericPdfPlugin {
    this.autoScale = autoScale;
    return this;
  }

  /**
   * @stable [14.11.2018]
   */
  public loadDocument(): void {
    this.cancel();

    if (!this.src) {
      GenericPdfPlugin.logger.warn('[$GenericPdfPlugin][loadDocument] The src is not defined!');
      return;
    }
    if (isFn(this.onStart)) {
      this.onStart();
    }
    this.loadTask = Promise.resolve(pdfjsLib.getDocument(this.src).promise)
      .then(this.onLoad, this.onLoadError);
  }

  /**
   * @stable [18.03.2020]
   */
  public refreshPage(): void {
    if (!this.hasLoadedDocument) {
      GenericPdfPlugin.logger.warn('[$GenericPdfPlugin][refreshPage] The document is not defined!');
      return;
    }
    this.loadPageTask = new Promise<IPdfViewerPageEntity>((resolve, reject) =>
      this.loadedDocument.getPage(this.page).then(resolve, reject)
    ).then(
      (page) => this.onFinish(() => this.onLoadPage(page)),
      this.onLoadError
    );
  }

  /**
   * @stable [18.03.2020]
   * @returns {boolean}
   */
  public get hasLoadedDocument(): boolean {
    return !R.isNil(this.loadedDocument);
  }

  /**
   * @stable [23.03.2020]
   * @returns {number}
   */
  public get pagesCount(): number {
    return this.loadedDocument.numPages;
  }

  /**
   * @stable [14.11.2018]
   */
  public cancel(): void {
    this.cancelTask();
    this.cancelPageTask();

    this.initialScale = null;
    this.loadTask = null;
    this.loadPageTask = null;
    this.loadedDocument = null;
  }

  /**
   * @stable [14.11.2018]
   * @param {IPdfViewerDocumentEntity} pdf
   * @returns {IPdfViewerDocumentEntity}
   */
  private onLoad(pdf: IPdfViewerDocumentEntity): IPdfViewerDocumentEntity {
    this.loadedDocument = pdf;
    this.refreshPage();
    return pdf;
  }

  /**
   * @stable [14.11.2018]
   * @param {IPdfViewerPageEntity} page
   * @returns {IPdfViewerPageEntity}
   */
  private onLoadPage(page: IPdfViewerPageEntity): IPdfViewerPageEntity {
    const renderArea = this.renderArea;
    const w = this.domAccessor.getWidth(renderArea.parentElement);
    const h = this.domAccessor.getHeight(renderArea.parentElement);

    const unscaledViewport = page.getViewport(GenericPdfPlugin.DEFAULT_VIEWPORT_SCALE);
    const outerScale = this.scale;
    const hasOuterScale = isNumber(this.scale);

    if (this.autoScale) {
      this.initialScale = R.isNil(this.initialScale)
        ? Math.min(h / unscaledViewport.height, w / unscaledViewport.width)
        : this.initialScale;
    } else {
      this.initialScale = 0;
    }

    const viewport = page.getViewport(this.initialScale + (hasOuterScale ? outerScale : 0));

    const canvasContext = renderArea.getContext('2d');

    renderArea.height = hasOuterScale ? viewport.height : h;
    renderArea.width = hasOuterScale ? viewport.width : w;

    page.render({canvasContext, viewport});
    return page;
  }

  /**
   * @stable [14.11.2018]
   * @param {AnyT} error
   * @returns {AnyT}
   */
  private onLoadError(error: AnyT): AnyT {
    GenericPdfPlugin.logger.error(`[$GenericPdfPlugin][onLoadError] Error:`, error);

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

      GenericPdfPlugin.logger.warn(`[$GenericPdfPlugin][cancelTask] The pdf task has been cancelled.`);
    }
  }

  /**
   * @stable [14.11.2018]
   */
  private cancelPageTask(): void {
    if (this.loadPageTask && this.loadPageTask.isPending()) {
      this.loadPageTask.cancel();

      GenericPdfPlugin.logger.warn(`[$GenericPdfPlugin][cancelPageTask] The pdf page task has been cancelled.`);
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
