import * as Promise from 'bluebird';
import * as $ from 'jquery';

import { isFn } from './type';
import { ENV } from '../env';
import { calc } from './calc';
import { AnyT } from '../definitions.interface';

let googleMapsScriptTask: Promise<HTMLScriptElement>;

/**
 * @stable [14.06.2018]
 * @param {string} tag
 * @param {Element} parent
 * @returns {TElement}
 */
export const createElement = <TElement extends HTMLElement = HTMLElement>(tag = 'div',
                                                                          parent: Element = document.body): TElement => {
  const el: TElement = document.createElement(tag) as TElement;
  addChild(el, parent);
  return el;
};

/**
 * @stable [31.07.2018]
 * @param {{} | HTMLScriptElement} cfg
 * @returns {Bluebird<HTMLScriptElement>}
 */
export const createScript = (cfg: {} | HTMLScriptElement): Promise<HTMLScriptElement> => new Promise<HTMLScriptElement>((resolve) => {
  const el = createElement<HTMLScriptElement>('script');
  el.type = 'text/javascript';
  el.onload = () => resolve(el);
  Object.assign(el, cfg);
});

/**
 * @stable [12.09.2018]
 * @param {{} | HTMLScriptElement} cfg
 * @param {string} libraries
 * @returns {Bluebird<HTMLScriptElement>}
 */
export const getGoogleMapsScript = (cfg?: {} | HTMLScriptElement, libraries = 'places') =>
  googleMapsScriptTask = googleMapsScriptTask || createScript({
    ...cfg,
    src: `https://maps.googleapis.com/maps/api/js?key=${ENV.googleMapsKey}&libraries=${libraries}`,
  });

/**
 * @stable [30.07.2018]
 * @param {Element} element
 * @param {string} clsName
 */
export const addClassNameToElement = (element: Element, ...clsName: string[]): void =>
  element.classList.add(...clsName);

/**
 * @stable [01.10.2018]
 * @param {string} rootId
 */
export const addRootElement = (rootId: string) => {
  const rootEl = createElement();
  rootEl.setAttribute('id', rootId);
  addClassNameToElement(rootEl, 'rac-root', 'rac-flex');
};

/**
 * @stable [01.10.2018]
 * @param {string} clsName
 */
export const addClassNameToBody = (clsName: string): void => clsName && addClassNameToElement(document.body, clsName);

/**
 * @stable [28.06.2018]
 * @param {Element} child
 * @param {Element} parent
 * @returns {Element}
 */
export const addChild = (child: Element, parent: Element = document.body): Element => parent.appendChild(child);

/**
 * @stable [28.06.2018]
 * @param {Element} child
 * @param {Element} parent
 * @returns {Element}
 */
export const removeChild = (child: Element, parent: Element = document.body): Element => parent.removeChild(child);

/**
 * @stable [14.06.2018]
 * @param {string} images
 */
export const createPreloadedImg = (...images: string[]): void => {
  const preloadedWrapper = createElement();
  preloadedWrapper.style.width = '0px';
  preloadedWrapper.style.height = '0px';

  images.forEach((src) => {
    const el = createElement<HTMLImageElement>('img', preloadedWrapper);
    el.src = src;
    el.style.height = '0px';
    el.style.width = '0px';
  });
};

/**
 * @stable [04.10.2018]
 * @param {Element} source
 * @param {number | (() => number)} left
 * @param {number | (() => number)} top
 */
export const setAbsoluteOffsetByCoordinates = (source: Element,
                                               left: number | (() => number),
                                               top: number | (() => number)): void => {
  applyStyle(source, 'position', 'absolute');
  applyStyle(source, 'left', `${calc(left)}px`);
  applyStyle(source, 'top', `${calc(top)}px`);
};

/**
 * @stable [04.10.2018]
 * @param {Element} source
 * @param {string} style
 * @param {AnyT} value
 * @returns {any}
 */
export const applyStyle = (source: Element, style: string, value: AnyT) => $(source).css(style, value);

/**
 * @stable [04.10.2018]
 * @param {Element} source
 * @returns {number}
 */
export const getWidth = (source: Element): number => $(source).width();

/**
 * @stable [04.10.2018]
 * @param {Element} source
 * @returns {boolean}
 */
export const isParentDocumentBody = (source: Element): boolean => $(source).parent().get(0) === document.body;

/**
 * @stable [23.06.2018]
 * @returns {boolean}
 */
export const isDocumentHasFocus = (): boolean => isFn(document.hasFocus) && document.hasFocus();

/**
 * @stable [28.06.2018]
 * @param {string} fileName
 * @param {Blob} blob
 */
export const downloadFile = (fileName: string, blob: Blob) => {
  const url = URL.createObjectURL(blob);

  try {
    const loader = createElement<HTMLAnchorElement>('a');
    addClassNameToElement(loader, 'rac-invisible');

    loader.href = url;
    loader.download = fileName;
    loader.click();

    removeChild(loader);
  } finally {
    URL.revokeObjectURL(url);
  }
};

/**
 * @stable [12.09.2018]
 * @param {string} path
 * @param {string} target
 */
export const downloadAnchoredFile = (path: string, target = '_blank'): void => {
  const link = createElement<HTMLAnchorElement>('a');
  link.href = path;
  link.target = target;
  link.click();
};

/**
 * @stable [03.09.2018]
 * @param {HTMLElement} el
 * @returns {boolean}
 */
export const isElementFocused = (el: HTMLElement) => document.activeElement === el;

/**
 * @stable [19.09.2018]
 * @param {string} v
 * @returns {number}
 */
export const parseValueAtPx = (v: string): number => parseFloat((v || '').split('px')[0] || '0');

/**
 * @stable [30.07.2018]
 * @returns {() => boolean}
 */
export const preventContextMenu = () => document.body.oncontextmenu = () => false;
