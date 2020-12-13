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
 * @see https://api.jqueryui.com/position/
 * @stable [24.01.2020]
 */
export interface IDomPositionConfigEntity<TElement extends HTMLElement = HTMLElement>
  extends IEventWrapper<Event | (() => Event)>, // Extra synthetic props
    IElementWrapper<TElement> { // Extra synthetic props
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
 * @stable [25.01.2020]
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
  documentBody?: Element;
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
  createScript(cfg: Partial<HTMLScriptElement>): Promise<HTMLScriptElement>;
  disableFullScreen(element?: Element);
  dispatchEvent(cfg: IDomFireEventConfigEntity): void;
  downloadFile(cfg: IDownloadFileConfigEntity): Promise<void>;
  downloadFileByBlob(cfg: IDownloadFileConfigEntity): void;
  enableFullScreen(element?: Element);
  findElement(selector: string, parent?: Element): Element;
  fireEvent(cfg: IDomFireEventConfigEntity): void;
  getActiveElement(): Element;
  getContentHeight(source: Element): number;
  getElement(id: string): Element;
  getHeight(source: Element): number;
  getParents(cfg: IDomParentConfigEntity): IJQueryElement;
  getParentsAsElements(cfg: IDomParentConfigEntity): Element[];
  getProperty(source: Element, property: string): string;
  getScrollInfo(el: Element): IPresetsXYEntity;
  getScrollLeft(el: Element): number;
  getScrollTop(el: Element): number;
  getWidth(source: Element): number;
  hasClasses(target: Element, ...classNames: string[]): boolean;
  hasElements(selector: string, target?: Element): boolean;
  hasParent(cfg: IDomParentConfigEntity): boolean;
  isAlreadyFocused(): boolean;
  isElementFocused(element: Element): boolean;
  isElementVisibleWithinParent(child: Element, parentEl?: Element): boolean;
  redirect(path: string): void;
  reload(forceReload?: boolean): void;
  removeChild(child: Element, parentEl?: Element);
  removeClassNames(element: Element, ...clsNames: string[]): void;
  removeClassNamesFromRootElement(...clsNames: string[]);
  scrollTo(payload: IPresetsXYEntity | Element, parentEl?: Element, config?: IScrollConfigEntity): void;
  setPosition(cfg: IDomPositionConfigEntity): void;
  setScrollLeft(el: Element, left: number): void;
  setScrollTop(el: Element, top: number): void;
}
