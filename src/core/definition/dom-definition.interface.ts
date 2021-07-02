import * as React from 'react';
import JQuery from 'jquery';

import { IBaseEvent } from './event-definition.interface';
import { IPresetsXYEntity } from './xy-definition.interface';
import {
  IAutoUnsubscribingWrapper,
  ICallbackWrapper,
  ICaptureWrapper,
  IConditionWrapper,
  IDataWrapper,
  IDetectFileTypeWrapper,
  IElementWrapper,
  IEventNameWrapper,
  IEventWrapper,
  IFileNameWrapper,
  IParentClassNameWrapper,
  IParentElementWrapper,
  IPositionConfigurationWrapper,
  IUrlWrapper,
  StringNumberT,
} from '../definitions.interface';

/**
 * https://www.npmjs.com/package/dom-scroll-into-view
 *
 * @config-entity
 * @stable [19.03.2021]
 */
export interface IScrollIntoViewConfigEntity {
  alignWithLeft?: boolean;
  alignWithTop?: boolean;
  offsetLeft?: number;
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
  extends IAutoUnsubscribingWrapper,
    ICallbackWrapper<(event?: IBaseEvent) => void>,
    ICaptureWrapper,
    IConditionWrapper<() => boolean>,
    IElementWrapper<Element | EventTarget>,
    IEventNameWrapper,
    IParentElementWrapper<Element | EventTarget> {
}

/**
 * @configuration-entity
 * @stable [24.01.2020]
 */
export interface IDomPositionConfigurationEntity
  extends IPositionConfigurationWrapper<IDomPositionConfigEntity> {
}

/**
 * @config-entity
 * @stable [31.03.2021]
 */
export interface IDomElementConfigEntity<TElement extends HTMLElement = HTMLElement>
  extends IElementWrapper<TElement> {
}

/**
 * @config-entity
 * @see https://api.jqueryui.com/position/
 * @stable [24.01.2020]
 */
export interface IDomPositionConfigEntity<TElement extends HTMLElement = HTMLElement>
  extends IDomElementConfigEntity,
    IEventWrapper<Event | (() => Event)> {// Extra synthetic props
  at?: string;
  collision?: string;
  my?: string;
  of?: TElement | Event | string;
}

/**
 * @default-entity
 * @stable [24.01.2020]
 */
export const DEFAULT_DOM_POSITION_CONFIG_ENTITY = Object.freeze<IDomPositionConfigEntity>({
  at: 'left bottom',
  collision: 'fit',
  my: 'left top',
});

/**
 * @default-entity
 * @stable [24.01.2020]
 */
export const DEFAULT_DOM_RIGHT_POSITION_CONFIG_ENTITY = Object.freeze<IDomPositionConfigEntity>({
  ...DEFAULT_DOM_POSITION_CONFIG_ENTITY,
  at: 'right bottom',
  my: 'right top',
});

/**
 * @config-entity
 * @stable [23.11.2019]
 */
export interface IDomFireEventConfigEntity<TEvent extends Event = Event>
  extends IElementWrapper<Element | EventTarget>,
    IEventNameWrapper,
    IEventWrapper<TEvent> {
}

/**
 * @config-entity
 * @stable [01.07.2021]
 */
export interface IDomParentConfigEntity
  extends IElementWrapper,
    IParentClassNameWrapper {
}

/**
 * @config-entity
 * @stable [13.12.2020]
 */
export interface IDownloadFileConfigEntity
  extends IDataWrapper<Blob>,
    IDetectFileTypeWrapper,
    IFileNameWrapper,
    IUrlWrapper {
}

/**
 * @stable [29.09.2019]
 */
export interface IDomAccessor {
  documentBodyElement?: Element;
  documentElement: Element;
  isFullScreenEnabled: boolean;
  rootElement?: Element;
  addChild(child: Element, parentEl?: Element): Element;
  addClassNames(element: Element, ...clsNames: string[]): void;
  addClassNamesToRootElement(...clsName: string[]): void;
  addRootElement(): Element;
  asImageUrl(url: string): string;
  asJqEl<TJqElement extends IJQueryElement = IJQueryElement>(source: Element): TJqElement;
  asSelector(selector: string): string;
  cancelEvent(event: IBaseEvent): void;
  captureEvent(cfg: ICaptureEventConfigEntity): () => void;
  captureEventWithinElement(cfg: ICaptureEventConfigEntity);
  createElement<TElement extends HTMLElement = HTMLElement>(tag?: string, parentEl?: Element): TElement;
  createPreloadedPasswordInput(): HTMLFormElement;
  createScript(cfg: Partial<HTMLScriptElement>): Promise<HTMLScriptElement>;
  disableFullScreen(element?: Document);
  dispatchEvent(cfg: IDomFireEventConfigEntity): void;
  downloadFile(cfg: IDownloadFileConfigEntity): Promise<void>;
  downloadFileByBlob(cfg: IDownloadFileConfigEntity): void;
  enableFullScreen(element?: Element);
  findElement(selector: string, parentEl?: Element): Element;
  fireEvent(cfg: IDomFireEventConfigEntity): void;
  getActiveElement(): Element;
  getContentHeight(source: Element): number;
  getCursorPosition(cfg: IDomPositionConfigEntity): number;
  getElement(id: string): Element;
  getHeight(source: Element): number;
  getParents(cfg: IDomParentConfigEntity): IJQueryElement;
  getParentsAsElements(cfg: IDomParentConfigEntity): Element[];
  getProperty(source: Element, property: string): string;
  getScrollInfo(el: Element): IPresetsXYEntity;
  getScrollLeft(el: Element): number;
  getScrollTop(el: Element): number;
  getTransformRotateStyles(degree: number, transformOrigin?: StringNumberT): React.CSSProperties;
  getTransformScaleStyles(scale: number, transformOrigin?: StringNumberT): React.CSSProperties;
  getTransformStyles(transform: string, transformOrigin?: StringNumberT): React.CSSProperties
  getWidth(source: Element): number;
  hasClasses(target: Element, ...classNames: string[]): boolean;
  hasElements(selector: string, target?: Element): boolean;
  hasParent(cfg: IDomParentConfigEntity): boolean;
  isAlreadyFocused(): boolean;
  isElementFocused(element: Element): boolean;
  isElementVisibleWithinParent(child: Element, parentEl?: Element): boolean;
  redirect(path: string): void;
  refsAsElements(refs: React.RefObject<Element> | React.RefObject<Element>[]): Element[];
  reload(forceReload?: boolean): void;
  removeChild(child: Element, parentEl?: Element);
  removeClassNames(element: Element, ...clsNames: string[]): void;
  removeClassNamesFromRootElement(...clsNames: string[]);
  scrollIntoView(el: Element, parent: Element, config?: IScrollIntoViewConfigEntity): void;
  scrollTo(options: ScrollToOptions, source?: Element): void;
  setPosition(cfg: IDomPositionConfigEntity): void;
}
