import { IXYEntity } from '../../definition';
import { IJQueryElement } from '../../definitions.interface';

/**
 * @stable [01.12.2018]
 */
export interface IDomAccessor {
  addClassNameToElement(element: Element, ...clsNames: string[]): void;
  disableFullScreen(element?: Element);
  enableFullScreen(element?: Element);
  findUniversalSelectedElement(parent: Element): Element;
  getContentHeight(source: Element): number;
  getDocumentBodyElement(): Element;
  getHeight(source: Element): number;
  getRootElement(): Element;
  getScrollInfo(el: Element): IXYEntity;
  getScrollLeft(el: Element): number;
  getScrollTop(el: Element): number;
  hasElements(selector: string | Element, target: Element): boolean;
  hasParent(selector: string, target: Element): boolean;
  removeChild(child: Element, parent?: Element);
  removeClassNameFromElement(element: Element, ...clsNames: string[]): void;
  scrollTo(payload: IXYEntity | Element, parent?: Element): void;
  setScrollLeft(el: Element, left: number): void;
  setScrollTop(el: Element, top: number): void;
  toJqEl(source: Element): IJQueryElement;
}
