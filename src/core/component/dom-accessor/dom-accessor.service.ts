import * as React from 'react';
import * as R from 'ramda';
import * as $ from 'jquery';
import { injectable } from 'inversify';
import 'jquery-ui/ui/position';

import {
  addChild,
  addClassNames,
  addRootElement,
  CalcUtils,
  cancelEvent,
  ConditionUtils,
  createElement,
  createScript,
  DomUtils,
  FilterUtils,
  getContentHeight,
  getHeight,
  getScrollLeft,
  getScrollTop,
  getWidth,
  hasClasses,
  isElementVisibleWithinParent,
  removeChild,
  removeClassNames,
  ScrollUtils,
  TypeUtils,
} from '../../util';
import {
  DEFAULT_DOM_POSITION_CONFIG_ENTITY,
  EnvironmentGlobalVariablesEnum,
  EventsEnum,
  IBaseEvent,
  ICaptureEventConfigEntity,
  IDomAccessor,
  IDomFireEventConfigEntity,
  IDomParentConfigEntity,
  IDomPositionConfigEntity,
  IDownloadFileConfigEntity,
  IEnvironment,
  IEventManager,
  IJQueryElement,
  IPresetsXYEntity,
  IScrollIntoViewConfigEntity,
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
import {
  StringNumberT,
  UNDEF,
} from '../../definitions.interface';

@injectable()
export class DomAccessor implements IDomAccessor {
  @lazyInject(DI_TYPES.Environment) private readonly environment: IEnvironment;
  @lazyInject(DI_TYPES.EventManager) private readonly eventManager: IEventManager;
  @lazyInject(DI_TYPES.Settings) private readonly settings: ISettingsEntity;

  /**
   * @stable [21.03.2021]
   */
  constructor() {
    this.environment.setVariable(EnvironmentGlobalVariablesEnum.DOM_ACCESSOR, this);

    this.disableFullScreen = this.disableFullScreen.bind(this);
    this.enableFullScreen = this.enableFullScreen.bind(this);
  }

  /**
   * @stable [19.03.2021]
   */
  public get documentElement(): Element {
    return this.document.documentElement;
  }

  /**
   * @stable [19.03.2021]
   */
  public get documentBodyElement(): Element {
    return this.document.body;
  }

  /**
   * @stable [11.05.2020]
   * @returns {Element}
   */
  public get rootElement(): Element {
    return this.document.getElementById(this.bootstrapSettings.rootId);
  }

  /**
   * @stable [31.03.2021]
   * @param cfg
   */
  public getCursorPosition(cfg: IDomPositionConfigEntity): number {
    return this.asJqEl(cfg.element).prop('selectionStart');
  }

  /**
   * @stable [24.01.2020]
   * @param {IDomPositionConfigEntity} cfg
   */
  public setPosition(cfg: IDomPositionConfigEntity): void {
    const cfg0 = FilterUtils.defValuesFilter<IDomPositionConfigEntity, IDomPositionConfigEntity>({
      ...DEFAULT_DOM_POSITION_CONFIG_ENTITY,
      ...cfg,
      event: UNDEF,
      element: UNDEF,
      ...ConditionUtils.ifNotNilThanValue(cfg.event, (event) => ({of: CalcUtils.calc(event)})),
    });
    const el = this.asJqEl(cfg.element);
    el.position(cfg0);
  }

  /**
   * @stable [22.11.2020]
   * @param cfg
   */
  public fireEvent(cfg: IDomFireEventConfigEntity): void {
    const {
      eventName,
    } = cfg;

    this.dispatchEvent({
      ...cfg,
      event: new Event(eventName),
    });
  }

  /**
   * @stable [22.11.2020]
   * @param cfg
   */
  public dispatchEvent(cfg: IDomFireEventConfigEntity): void {
    const {
      event,
      element = this.window,
    } = cfg;
    element.dispatchEvent(event);
  }

  /**
   * @stable [13.12.2020]
   * @param cfg
   */
  public downloadFile(cfg: IDownloadFileConfigEntity): Promise<void> {
    return DomUtils.downloadFile(cfg);
  }

  /**
   * @stable [13.12.2020]
   * @param cfg
   */
  public downloadFileByBlob(cfg: IDownloadFileConfigEntity): void {
    DomUtils.downloadFileByBlob(cfg);
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
   * @stable [13.05.2021]
   */
  public createPreloadedPasswordInput(): HTMLFormElement {
    return DomUtils.createPreloadedPasswordInput();
  }

  /**
   * @stable [15.05.2021]
   * @param transform
   * @param transformOrigin
   */
  public getTransformStyles(transform: string, transformOrigin?: StringNumberT): React.CSSProperties {
    return FilterUtils.defValuesFilter<React.CSSProperties, React.CSSProperties>({
      transform,
      transformOrigin,
    });
  }

  /**
   * @stable [15.05.2021]
   * @param scale
   * @param transformOrigin
   */
  public getTransformScaleStyles(scale: number, transformOrigin?: StringNumberT): React.CSSProperties {
    return ConditionUtils.ifNotEmptyThanValue(
      scale, () => this.getTransformStyles(`scale(${scale})`, transformOrigin)
    );
  }

  /**
   * @stable [15.05.2021]
   * @param degree
   * @param transformOrigin
   */
  public getTransformRotateStyles(degree: number, transformOrigin?: StringNumberT): React.CSSProperties {
    return ConditionUtils.ifNotEmptyThanValue(
      degree, () => this.getTransformStyles(`rotate(${degree}deg)`, transformOrigin)
    );
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
      if (TypeUtils.isFn(enterUnsubscriber)) {
        enterUnsubscriber();
        enterUnsubscriber = null;
      }
      if (TypeUtils.isFn(leaveUnsubscriber)) {
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
   * @stable [01.07.2021]
   * @param refs
   */
  public refsAsElements(refs: React.RefObject<Element> | React.RefObject<Element>[]): Element[] {
    return []
      .concat(refs || [])
      .map((clickableAreaRef: React.RefObject<Element>) => clickableAreaRef.current)
      .filter(FilterUtils.NOT_NIL_VALUE_PREDICATE);
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
   * @stable [21.03.2021]
   * @param element
   */
  public enableFullScreen(element: Element = this.documentElement) {
    DomUtils.openFullScreen(element);
  }

  /**
   * @stable [21.03.2021]
   */
  public get isFullScreenEnabled(): boolean {
    return !R.isNil(this.document.fullscreenElement);
  }

  /**
   * @stable [21.03.2021]
   * @param element
   */
  public disableFullScreen(element: Document = this.document) {
    if (!this.isFullScreenEnabled) {
      return null;
    }
    DomUtils.closeFullScreen(element);
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
   * @stable [01.07.2021]
   * @param cfg
   */
  public getParents(cfg: IDomParentConfigEntity): IJQueryElement {
    const jqEl = this.asJqEl(cfg.element);
    return cfg.parentClassName
      ? jqEl.parents(this.asSelector(cfg.parentClassName))
      : jqEl.parents();
  }

  /**
   * @stable [01.07.2021]
   * @param cfg
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
   * @stable [19.03.2021]
   * @param el
   * @param parent
   * @param config
   */
  public scrollIntoView(el: Element, parent: Element, config?: IScrollIntoViewConfigEntity): void {
    ScrollUtils.scrollIntoView(el, parent, config);
  }

  /**
   * @stable [19.03.2021]
   * @param options
   * @param source
   */
  public scrollTo(options: ScrollToOptions, source: Element = this.documentElement): void {
    DomUtils.scrollTo(source, options);
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
  private findElements(selector: string, target: Element = this.documentBodyElement): IJQueryElement {
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

  /**
   * @stable [19.03.2021]
   */
  private get document(): Document {
    return this.environment.document;
  }
}
