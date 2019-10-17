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
  addClassNames(element: Element, ...clsNames: string[]): void;
  addRootElement(): Element;
  createElement<TElement extends HTMLElement = HTMLElement>(tag?: string, parent?: Element): TElement;
  defineGlobalErrorHandler(callback: (e: Error) => void): void;
  disableFullScreen(element?: Element);
  enableFullScreen(element?: Element);
  findElement(selector: string | Element, parent?: Element): Element;
  findUniversalSelectedElement(parent: Element): Element;
  getActiveElement(): Element;
  getContentHeight(source: Element): number;
  getDocumentBodyElement(): Element;
  getElement(id: string): Element;
  getHeight(source: Element): number;
  getRootElement(): Element;
  getScrollInfo(el: Element): IXYEntity;
  getScrollLeft(el: Element): number;
  getScrollTop(el: Element): number;
  hasElements(selector: string | Element, target: Element): boolean;
  hasParent(selector: string, target: Element): boolean;
  isAlreadyFocused(): boolean;
  redirect(path: string): void;
  reload(forceReload?: boolean): void;
  removeChild(child: Element, parent?: Element);
  removeClassNames(element: Element, ...clsNames: string[]): void;
  scrollTo(payload: IXYEntity | Element, parent?: Element): void;
  setScrollLeft(el: Element, left: number): void;
  setScrollTop(el: Element, top: number): void;
  toJqEl(source: Element): IJQueryElement<Element>;
}

/**
 * @stable [11.10.2019]
 * @type {string}
 */
export const UNIVERSAL_STICKY_ELEMENT_SELECTOR = 'rac-sticky-element';
