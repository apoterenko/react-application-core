import { IPdfViewerViewport } from '../../../definition';

/**
 * @stable [14.11.2018]
 */
export interface IUniversalPdfPlugin {
  hasLoadedDocument: boolean;
  numPages: number;
  refreshPage(): void;
  setSrc(src: string): IUniversalPdfPlugin;
  setScale(scale: number): IUniversalPdfPlugin;
  setPage(page: number): IUniversalPdfPlugin;
  loadDocument(): void;
  cancel(): void;
}

/**
 * @stable [27.06.2018]
 */
export interface IPdfViewerDocument {
  numPages: number;
  getPage(page: number): Promise<IPdfViewerPage>;
}

/**
 * @stable [27.06.2018]
 */
export interface IPdfViewerPage {
  getViewport(scale: number): IPdfViewerViewport;
  render({canvasContext: HTMLCanvasContext, viewport: IPdfViewerViewport}): void;
}
