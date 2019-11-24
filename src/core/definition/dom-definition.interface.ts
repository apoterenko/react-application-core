import JQuery from 'jquery';

import { IBaseEvent } from './event-definition.interface';
import { IXYEntity } from './xy-definition.interface';
import {
  IAutoUnsubscribeWrapper,
  ICallbackWrapper,
  IConditionWrapper,
  IElementWrapper,
  IEventNameWrapper,
  IParentElementWrapper,
} from '../definitions.interface';

/**
 * @stable [08.11.2019]
 */
export interface IScrollConfigEntity {
  alignWithLeft?: boolean;
  alignWithTop?: boolean;
  offsetTop?: number;
}

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
 * @stable [23.11.2019]
 */
export interface ICaptureEventConfigEntity
  extends IAutoUnsubscribeWrapper,
    ICallbackWrapper,
    IConditionWrapper,
    IElementWrapper<Element | EventTarget>,
    IEventNameWrapper,
    IParentElementWrapper<Element | EventTarget> {
}

/**
 * @stable [23.11.2019]
 */
export interface IFireEventConfigEntity
  extends IEventNameWrapper,
    IElementWrapper<Element | EventTarget> {
}

/**
 * @stable [29.09.2019]
 */
export interface IDomAccessor {
  addChild(child: Element, parentEl?: Element): Element;
  addClassNames(element: Element, ...clsNames: string[]): void;
  addRootElement(): Element;
  applyPosition(source: Element, position: string, value: number | (() => number)): void;
  asJqEl(source: Element): IJQueryElement<Element>;
  attachClickListener(callback: (e: IBaseEvent) => void, parentEl?: Element | EventTarget): () => void;
  captureEvent(cfg: ICaptureEventConfigEntity): () => void;
  captureEventWithinElement(cfg: ICaptureEventConfigEntity);
  createElement<TElement extends HTMLElement = HTMLElement>(tag?: string, parentEl?: Element): TElement;
  defineGlobalErrorHandler(callback: (e: Error) => void): void;
  disableFullScreen(element?: Element);
  enableFullScreen(element?: Element);
  findElement(selector: string | Element, parentEl?: Element): Element;
  fireEvent(cfg: IFireEventConfigEntity): void;
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
  isElementVisibleWithinParent(child: Element, parentEl?: Element): boolean;
  redirect(path: string): void;
  reload(forceReload?: boolean): void;
  removeChild(child: Element, parentEl?: Element);
  removeClassNames(element: Element, ...clsNames: string[]): void;
  scrollTo(payload: IXYEntity | Element, parentEl?: Element, config?: IScrollConfigEntity): void;
  setScrollLeft(el: Element, left: number): void;
  setScrollTop(el: Element, top: number): void;
}
