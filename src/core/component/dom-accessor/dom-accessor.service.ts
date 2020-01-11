import { injectable } from 'inversify';
import * as R from 'ramda';

import {
  addChild,
  addClassNames,
  addRootElement,
  calc,
  cancelEvent,
  createElement,
  createScript,
  findElement,
  getContentHeight,
  getHeight,
  getScrollLeft,
  getScrollTop,
  getWidth,
  hasClasses,
  hasElements,
  hasParent,
  isElementFocused,
  isElementVisibleWithinParent,
  isFn,
  openFullScreen,
  removeChild,
  removeClassNames,
  scrollIntoView,
  scrollTo,
  sequence,
  setScrollLeft,
  setScrollTop,
  toJqEl,
} from '../../util';
import {
  EventsEnum,
  IBaseEvent,
  ICaptureEventConfigEntity,
  IDomAccessor,
  IEnvironment,
  IEventManager,
  IFireEventConfigEntity,
  IJQueryElement,
  IScrollConfigEntity,
  IXYEntity,
  TouchEventsEnum,
} from '../../definition';
import {
  DI_TYPES,
  lazyInject,
} from '../../di';
import {
  IBootstrapSettings,
  ISettingsEntity,
} from '../../settings';

@injectable()
export class DomAccessor implements IDomAccessor {
  @lazyInject(DI_TYPES.Environment) private readonly environment: IEnvironment;
  @lazyInject(DI_TYPES.EventManager) private readonly eventManager: IEventManager;
  @lazyInject(DI_TYPES.Settings) private readonly settings: ISettingsEntity;

  /**
   * @stable [11.01.2020]
   * @param {Element} source
   * @returns {number}
   */
  public getWidth(source: Element): number {
    return getWidth(source);
  }

  /**
   * @stable [09.01.2020]
   * @param {IBaseEvent} event
   */
  public cancelEvent(event: IBaseEvent): void {
    cancelEvent(event);
  }

  /**
   * @stable [08.01.2020]
   * @param {Partial<HTMLScriptElement>} cfg
   * @returns {Promise<HTMLScriptElement>}
   */
  public createScript(cfg: Partial<HTMLScriptElement>): Promise<HTMLScriptElement> {
    return createScript(cfg);
  }

  /**
   * @stable [23.11.2019]
   * @param {IFireEventConfigEntity} cfg
   */
  public fireEvent(cfg: IFireEventConfigEntity): void {
    const {eventName, element = this.window} = cfg;
    element.dispatchEvent(new Event(eventName));
  }

  /**
   * @stable [23.11.2019]
   * @param {Element} source
   * @param {string} position
   * @param {number | (() => number)} value
   */
  public applyPosition(source: Element, position: string, value: number | (() => number)): void {
    if (!R.isNil(value)) {
      this.asJqEl(source).css(position, `${calc(value)}px`);
    }
  }

  /**
   * @stable [23.11.2019]
   * @param {ICaptureEventConfigEntity} cfg
   * @returns {() => void}
   */
  public captureEvent(cfg: ICaptureEventConfigEntity): () => void {
    const {
      autoUnsubscribe,
      callback,
      condition = () => true,
      element = this.window,
      eventName,
    } = cfg;

    let eventUnSubscriber: () => void;
    return eventUnSubscriber = this.eventManager.subscribe(element, eventName, () => {
      if (condition()) {
        if (autoUnsubscribe) {
          eventUnSubscriber();
        }
        callback();
      }
    });
  }

  /**
   * @stable [24.11.2019]
   * @param {ICaptureEventConfigEntity} cfg
   * @returns {() => void}
   */
  public captureEventWithinElement(cfg: ICaptureEventConfigEntity): () => void {
    const {
      autoUnsubscribe,
      callback,
      element,
      eventName,
      parentElement = this.window,
    } = cfg;

    let withinMenuEl = false;
    let mouseenterUnSubscriber: () => void;
    let mouseleaveUnSubscriber: () => void;

    const sideEffectsUnSubscriber = () => {
      if (isFn(mouseenterUnSubscriber)) {
        mouseenterUnSubscriber();
        mouseenterUnSubscriber = null;
      }
      if (isFn(mouseleaveUnSubscriber)) {
        mouseleaveUnSubscriber();
        mouseleaveUnSubscriber = null;
      }
    };
    mouseenterUnSubscriber = this.eventManager.subscribe(element, EventsEnum.MOUSEENTER, () => withinMenuEl = true);
    mouseleaveUnSubscriber = this.eventManager.subscribe(element, EventsEnum.MOUSELEAVE, () => withinMenuEl = false);

    const originalUnSubscriber = this.captureEvent({
      autoUnsubscribe,
      callback: () => {
        if (autoUnsubscribe) {
          sideEffectsUnSubscriber();
        }
        callback();
      },
      condition: () => !withinMenuEl,
      element: parentElement,
      eventName,
    });

    return () => {
      sideEffectsUnSubscriber();
      originalUnSubscriber();
    };
  }

  /**
   * @stable [30.10.2019]
   * @param {Element} element
   * @returns {boolean}
   */
  public isElementFocused(element: Element): boolean {
    return isElementFocused(element);
  }

  /**
   * @stable [23.11.2019]
   * @param {(e: IBaseEvent) => void} callback
   * @param {Document} element
   * @returns {() => void}
   */
  public attachClickListener(callback: (e: IBaseEvent) => void, element = this.document): () => void {
    return this.eventManager.subscribe(
      element,
      this.environment.mobilePlatform ? TouchEventsEnum.TOUCH_START : EventsEnum.MOUSE_DOWN,
      callback
    );
  }

  /**
   * @stable [26.10.2019]
   * @param {Element} child
   * @param {Element} parent
   * @returns {boolean}
   */
  public isElementVisibleWithinParent(child: Element, parent: Element): boolean {
    return isElementVisibleWithinParent(child, parent);
  }

  /**
   * @stable [22.10.2019]
   * @param {Element} target
   * @param {string} classNames
   * @returns {boolean}
   */
  public hasClasses(target: Element, ...classNames: string[]): boolean {
    return hasClasses(target, ...classNames);
  }

  /**
   * @stable [16.10.2019]
   * @param {string | Element} selector
   * @param {Element} parent
   * @returns {Element}
   */
  public findElement(selector: string | Element, parent?: Element): Element {
    return findElement(selector, parent);
  }

  /**
   * @stable [08.10.2019]
   * @returns {boolean}
   */
  public isAlreadyFocused(): boolean {
    return this.isInputElement(this.getActiveElement());
  }

  /**
   * @stable [07.10.2019]
   * @param {string} path
   */
  public redirect(path: string): void {
    this.window.location.assign(path);
  }

  /**
   * @stable [16.10.2019]
   * @param {boolean} forceReload A Boolean to indicate that the page will always reload from the server.
   *        If false or unspecified, the browser may reload the page from its HTTP cache.
   */
  public reload(forceReload?: boolean): void {
    this.window.location.reload(forceReload);
  }

  /**
   * @stable [01.10.2019]
   * @returns {Element}
   */
  public addRootElement(): Element {
    return addRootElement(this.bootstrapSettings.rootId);
  }

  /**
   * @stable [30.09.2019]
   * @param {(e: Error) => void} callback
   */
  public defineGlobalErrorHandler(callback: (e: Error) => void): void {
    this.window.onerror = sequence(
      this.window.onerror,
      (message: string, filename?: string, lineno?: number, colno?: number, error?: Error) => {
        callback(error || new Error(message));
      }
    );
  }

  /**
   * @stable [30.09.2019]
   * @param {string} tag
   * @param {Element} parent
   * @returns {Element}
   */
  public createElement<TElement extends HTMLElement = HTMLElement>(tag?: string, parent?: Element): TElement {
    return createElement<TElement>(tag, parent);
  }

  /**
   * @stable [30.09.2019]
   * @param {Element} child
   * @param {Element} parent
   * @returns {Element}
   */
  public addChild(child: Element, parent?: Element): Element {
    return addChild(child, parent);
  }

  /**
   * @stable [14.04.2019]
   * @param {Element} child
   * @param {Element} parent
   */
  public removeChild(child: Element, parent?: Element) {
    removeChild(child, parent);
  }

  /**
   * @stable [04.04.2019]
   * @param {HTMLElement} element
   */
  public enableFullScreen(element = document.body) {
    openFullScreen(element);
  }

  /**
   * @stable [04.04.2019]
   * @param {HTMLElement} element
   */
  public disableFullScreen(element = document.body) {
    // TODO
  }

  /**
   * @stable [16.02.2019]
   * @param {string | Element} selector
   * @param {Element} target
   * @returns {boolean}
   */
  public hasElements(selector: string | Element, target: Element): boolean {
    return hasElements(selector, target);
  }

  /**
   * @stable [16.02.2019]
   * @param {string} selector
   * @param {Element} target
   * @returns {boolean}
   */
  public hasParent(selector: string, target: Element): boolean {
    return hasParent(selector, target);
  }

  /**
   * @stable [29.09.2019]
   * @returns {Element}
   */
  public getRootElement(): Element {
    return this.document.getElementById(this.bootstrapSettings.rootId);
  }

  /**
   * @stable [13.01.2019]
   * @returns {Element}
   */
  public getDocumentBodyElement(): Element {
    return this.environment.document.body;
  }

  /**
   * @stable [13.01.2019]
   * @param {Element} element
   * @param {string} clsNames
   */
  public addClassNames(element: Element, ...clsNames: string[]): void {
    addClassNames(element, ...clsNames);
  }

  /**
   * @stable [13.01.2019]
   * @param {Element} element
   * @param {string} clsNames
   */
  public removeClassNames(element: Element, ...clsNames: string[]): void {
    removeClassNames(element, ...clsNames);
  }

  /**
   * @stable [18.12.2018]
   * @param {Element} el
   * @param {number} left
   */
  public setScrollLeft(el: Element, left: number): void {
    setScrollLeft(el, left);
  }

  /**
   * @stable [18.12.2018]
   * @param {Element} el
   * @returns {number}
   */
  public getScrollLeft(el: Element): number {
    return getScrollLeft(el);
  }

  /**
   * @stable [18.12.2018]
   * @param {Element} el
   * @returns {number}
   */
  public getScrollTop(el: Element): number {
    return getScrollTop(el);
  }

  /**
   * @stable [13.12.2018]
   * @param {Element} source
   * @returns {number}
   */
  public getHeight(source: Element): number {
    return getHeight(source);
  }

  /**
   * @stable [13.12.2018]
   * @param {Element} source
   * @returns {IJQueryElement}
   */
  public asJqEl(source: Element): IJQueryElement {
    return toJqEl(source);
  }

  /**
   * @stable [01.12.2018]
   * @param {Element} el
   * @returns {IXYEntity}
   */
  public getScrollInfo(el: Element): IXYEntity {
    return {x: getScrollLeft(el), y: getScrollTop(el)};
  }

  /**
   * @stable [01.12.2018]
   * @param {Element} source
   * @returns {number}
   */
  public getContentHeight(source: Element): number {
    return getContentHeight(source);
  }

  /**
   * @stable [08.11.2019]
   * @param {IXYEntity | Element} payload
   * @param {Element} parent
   * @param {IScrollConfigEntity} config
   */
  public scrollTo(payload: IXYEntity | Element, parent?: Element, config?: IScrollConfigEntity): void {
    if (R.isNil(payload)) {
      return;
    }
    const xyEntity = payload as IXYEntity;
    const el = payload as Element;
    if (el instanceof Element) {
      scrollIntoView(el, parent, config);
    } else if (!R.isNil(xyEntity.x) || !R.isNil(xyEntity.y)) {
      scrollTo(parent, xyEntity);
    }
  }

  /**
   * @stable [01.12.2018]
   * @param {Element} el
   * @param {number} top
   */
  public setScrollTop(el: Element, top: number): void {
    setScrollTop(el, top);
  }

  /**
   * @stable [09.10.2019]
   * @returns {Element}
   */
  public getActiveElement(): Element {
    return this.document.activeElement;
  }

  /**
   * @stable [17.10.2019]
   * @param {string} id
   * @returns {Element}
   */
  public getElement(id: string): Element {
    return this.document.getElementById(id);
  }

  /**
   * @stable [01.10.2019]
   * @returns {IBootstrapSettings}
   */
  private get bootstrapSettings(): IBootstrapSettings {
    return this.settings.bootstrap || {};
  }

  /**
   * @stable [08.10.2019]
   * @returns {Document}
   */
  private get document(): Document {
    return this.environment.document;
  }

  /**
   * @stable [08.10.2019]
   * @returns {Window}
   */
  private get window(): Window {
    return this.environment.window;
  }

  /**
   * @stable [09.10.2019]
   * @param {Element} element
   * @returns {boolean}
   */
  private isInputElement(element: Element): boolean {
    return element instanceof HTMLInputElement
      || element instanceof HTMLTextAreaElement;
  }
}
