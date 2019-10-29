import JQuery from 'jquery';

import { IBaseEvent } from './event-definition.interface';
import { IXYEntity } from './xy-definition.interface';

/**
 * @stable [28.10.2019]
 */
export type InputElementT = HTMLInputElement | HTMLTextAreaElement;

/**
 * @stable [23.10.2019]
 */
export enum ElementsMarkersEnum {
  SELECTED_ELEMENT_817ACCF6 = 'rac-element-817accf6',
  STICKY_ELEMENT_275B4646 = 'rac-element-275b4646',
}

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
  attachClickListenerToDocument(callback: (e: IBaseEvent) => void): () => void;
  createElement<TElement extends HTMLElement = HTMLElement>(tag?: string, parent?: Element): TElement;
  defineGlobalErrorHandler(callback: (e: Error) => void): void;
  disableFullScreen(element?: Element);
  enableFullScreen(element?: Element);
  findElement(selector: string | Element, parent?: Element): Element;
  getActiveElement(): Element;
  getContentHeight(source: Element): number;
  getDocumentBodyElement(): Element;
  getElement(id: string): Element;
  getHeight(source: Element): number;
  getRootElement(): Element;
  getScrollInfo(el: Element): IXYEntity;
  getScrollLeft(el: Element): number;
  getScrollTop(el: Element): number;
  hasClasses(target: Element, ...classNames: string[]): boolean;
  hasElements(selector: string | Element, target: Element): boolean;
  hasParent(selector: string, target: Element): boolean;
  isAlreadyFocused(): boolean;
  isElementFocused(element: Element): boolean;
  isElementVisibleWithinParent(child: Element, parent: Element): boolean;
  redirect(path: string): void;
  reload(forceReload?: boolean): void;
  removeChild(child: Element, parent?: Element);
  removeClassNames(element: Element, ...clsNames: string[]): void;
  scrollTo(payload: IXYEntity | Element, parent?: Element): void;
  setScrollLeft(el: Element, left: number): void;
  setScrollTop(el: Element, top: number): void;
  toJqEl(source: Element): IJQueryElement<Element>;
}
