import * as R from 'ramda';
import * as $ from 'jquery';
import { injectable } from 'inversify';
import 'jquery-ui/ui/position';

import {
  addChild,
  addClassNames,
  addRootElement,
  calc,
  cancelEvent,
  createElement,
  createScript,
  defValuesFilter,
  getContentHeight,
  getHeight,
  getScrollLeft,
  getScrollTop,
  getWidth,
  hasClasses,
  ifNotNilThanValue,
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
} from '../../util';
import {
  DEFAULT_DOM_POSITION_CONFIG_ENTITY,
  EventsEnum,
  IBaseEvent,
  ICaptureEventConfigEntity,
  IDomAccessor,
  IDomFireEventConfigEntity,
  IDomParentConfigEntity,
  IDomPositionConfigEntity,
  IEnvironment,
  IEventManager,
  IJQueryElement,
  IPresetsXYEntity,
  IScrollConfigEntity,
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
import { UNDEF } from '../../definitions.interface';

@injectable()
export class DomAccessor implements IDomAccessor {
  @lazyInject(DI_TYPES.Environment) private readonly environment: IEnvironment;
  @lazyInject(DI_TYPES.EventManager) private readonly eventManager: IEventManager;
  @lazyInject(DI_TYPES.Settings) private readonly settings: ISettingsEntity;

  /**
   * @stable [24.01.2020]
   * @returns {Element}
   */
  public get documentBody(): Element {
    return this.environment.document.body;
  }

  /**
   * @stable [11.05.2020]
   * @returns {Element}
   */
  public get rootElement(): Element {
    return this.document.getElementById(this.bootstrapSettings.rootId);
  }

  /**
   * @stable [24.01.2020]
   * @param {IDomPositionConfigEntity} cfg
   */
  public setPosition(cfg: IDomPositionConfigEntity): void {
    const cfg0 = defValuesFilter<IDomPositionConfigEntity, IDomPositionConfigEntity>({
      ...DEFAULT_DOM_POSITION_CONFIG_ENTITY,
      ...cfg,
      event: UNDEF,
      element: UNDEF,
      ...ifNotNilThanValue(cfg.event, (event) => ({of: calc(event)})),
    });
    const el = this.asJqEl(cfg.element);
    el.position(cfg0);
  }

  /**
   * @stable [23.11.2019]
   * @param {IDomFireEventConfigEntity} cfg
   */
  public fireEvent(cfg: IDomFireEventConfigEntity): void {
    const {eventName, element = this.window} = cfg;
    element.dispatchEvent(new Event(eventName));
  }

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
   * @stable [21.06.2020]
   * @param {Element} source
   * @param {string} property
   * @returns {string}
   */
  public getProperty(source: Element, property: string): string {
    return this.asJqEl(source).css(property);
  }

  /**
   * @stable [23.11.2019]
   * @param {ICaptureEventConfigEntity} cfg
   * @returns {() => void}
   */
  public captureEvent(cfg: ICaptureEventConfigEntity): () => void {
    const {
      autoUnsubscribing,
      callback,
      capture = false,
      condition = () => true,
      element = this.window,
      eventName,
    } = cfg;

    let eventUnsubscriber: () => void;
    return eventUnsubscriber = this.eventManager.subscribe(element, eventName, (event: IBaseEvent) => {
      if (condition()) {
        if (autoUnsubscribing) {
          eventUnsubscriber();
        }
        callback(event);
      }
    }, capture);
  }

  /**
   * @stable [24.11.2019]
   * @param {ICaptureEventConfigEntity} cfg
   * @returns {() => void}
   */
  public captureEventWithinElement(cfg: ICaptureEventConfigEntity): () => void {
    const {
      autoUnsubscribing,
      callback,
      element,
      eventName,
      parentElement = this.window,
    } = cfg;

    let withinMenuEl = false;
    let enterUnsubscriber: () => void;
    let leaveUnsubscriber: () => void;

    const sideEffectsUnsubscriber = () => {
      if (isFn(enterUnsubscriber)) {
        enterUnsubscriber();
        enterUnsubscriber = null;
      }
      if (isFn(leaveUnsubscriber)) {
        leaveUnsubscriber();
        leaveUnsubscriber = null;
      }
    };

    const touchedPlatform = this.environment.touchedPlatform;
    enterUnsubscriber = this.eventManager.subscribe(element,
      touchedPlatform ? TouchEventsEnum.TOUCH_START : EventsEnum.MOUSE_ENTER, () => withinMenuEl = true);
    leaveUnsubscriber = this.eventManager.subscribe(element,
      touchedPlatform ? TouchEventsEnum.TOUCH_END : EventsEnum.MOUSE_LEAVE, () => withinMenuEl = false);

    const originalUnSubscriber = this.captureEvent({
      autoUnsubscribing,
      callback: () => {
        if (autoUnsubscribing) {
          sideEffectsUnsubscriber();
        }
        callback();
      },
      condition: () => !withinMenuEl,
      element: parentElement,
      eventName,
    });

    return () => {
      sideEffectsUnsubscriber();
      originalUnSubscriber();
    };
  }

  /**
   * @stable [24.01.2020]
   * @param {Element} element
   * @returns {boolean}
   */
  public isElementFocused(element: Element): boolean {
    return this.environment.document.activeElement === element;
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
   * @param {string} selector
   * @param {Element} parent
   * @returns {Element}
   */
  public findElement(selector: string, parent?: Element): Element {
    return R.isNil(selector) ? null : this.findElements(selector, parent)[0];
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
   * @stable [11.05.2020]
   * @param {string} clsName
   */
  public addClassNamesToRootElement(...clsName: string[]): void {
    addClassNames(this.rootElement, ...clsName);
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
   * @stable [06.02.2020]
   * @returns {string}
   */
  public asImageUrl(url: string): string {
    return `url(${url})`;
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
   * @stable [31.01.2020]
   * @param {string} selector
   * @param {Element} target
   * @returns {boolean}
   */
  public hasElements(selector: string, target?: Element): boolean {
    return this.findElements(selector, target).length > 0;
  }

  /**
   * @stable [25.01.2020]
   * @param {IDomParentConfigEntity} cfg
   * @returns {boolean}
   */
  public hasParent(cfg: IDomParentConfigEntity): boolean {
    return this.getParents(cfg).length > 0;
  }

  /**
   * @stable [25.01.2020]
   * @param {IDomParentConfigEntity} cfg
   * @returns {IJQueryElement}
   */
  public getParents(cfg: IDomParentConfigEntity): IJQueryElement {
    return this.asJqEl(cfg.element).parents(this.asSelector(cfg.parentClassName));
  }

  /**
   * @stable [29.01.2020]
   * @param {IDomParentConfigEntity} cfg
   * @returns {TElement[]}
   */
  public getParentsAsElements<TElement extends HTMLElement = HTMLElement>(cfg: IDomParentConfigEntity): TElement[] {
    return this.getParents(cfg).get() as TElement[];
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
   * @stable [11.05.2020]
   * @param {string} clsNames
   */
  public removeClassNamesFromRootElement(...clsNames: string[]): void {
    this.removeClassNames(this.rootElement, ...clsNames);
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
  public asJqEl<TJqElement extends IJQueryElement = IJQueryElement>(source: Element): TJqElement {
    return $(source) as TJqElement;
  }

  /**
   * @stable [01.12.2018]
   * @param {Element} el
   * @returns {IPresetsXYEntity}
   */
  public getScrollInfo(el: Element): IPresetsXYEntity {
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
   * @param {IPresetsXYEntity | Element} payload
   * @param {Element} parent
   * @param {IScrollConfigEntity} config
   */
  public scrollTo(payload: IPresetsXYEntity | Element, parent?: Element, config?: IScrollConfigEntity): void {
    if (R.isNil(payload)) {
      return;
    }
    const xyEntity = payload as IPresetsXYEntity;
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
   * @stable [25.01.2020]
   * @param {string} selector
   * @returns {string}
   */
  public asSelector(selector: string): string {
    return R.isNil(selector)
      ? selector
      : selector.startsWith('.') ? selector : `.${selector}`;
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
   * @stable [31.01.2020]
   * @param {string} selector
   * @param {Element} target
   * @returns {IJQueryElement}
   */
  private findElements(selector: string, target: Element = this.documentBody): IJQueryElement {
    return this.asJqEl(target).find(this.asSelector(selector));
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
