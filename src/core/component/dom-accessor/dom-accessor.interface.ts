import { IXYEntity } from '../../entities-definitions.interface';
import { IJQueryElement } from '../../definitions.interface';

/**
 * @stable [01.12.2018]
 */
export interface IDomAccessor {
  addClassNameToElement(element: Element, ...clsNames: string[]): void;
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
  removeClassNameFromElement(element: Element, ...clsNames: string[]): void;
  scrollTo(payload: IXYEntity | Element, parent?: Element): void;
  setScrollLeft(el: Element, left: number): void;
  setScrollTop(el: Element, top: number): void;
  toJqEl(source: Element): IJQueryElement;
}
