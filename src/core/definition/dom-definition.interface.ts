import JQuery from 'jquery';

import { IXYEntity } from './xy-definition.interface';

/**
 * @stable [29.09.2019]
 */
export interface IJQueryElement<TElement extends Element = Element>
  extends JQuery<TElement> {
}

/**
 * @stable [29.09.2019]
 */
export interface IDomAccessor {
  addChild(child: Element, parent?: Element): Element;
  addClassNameToElement(element: Element, ...clsNames: string[]): void;
  addRootElement(): Element;
  createElement(tag?: string, parent?: Element): Element;
  defineGlobalErrorHandler(callback: (e: Error) => void): void;
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
  isAlreadyFocused(): boolean;
  redirect(path: string): void;
  removeChild(child: Element, parent?: Element);
  removeClassNameFromElement(element: Element, ...clsNames: string[]): void;
  scrollTo(payload: IXYEntity | Element, parent?: Element): void;
  setScrollLeft(el: Element, left: number): void;
  setScrollTop(el: Element, top: number): void;
  toJqEl(source: Element): IJQueryElement<Element>;
}
