import * as $ from 'jquery';

import { isFn } from './type';

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

export const addClassNameToElement = (element: Element, clsName: string): void => element.classList.add(clsName);

export const removeClassNameFromElement = (element: Element, clsName: string): void =>
  element.classList.remove(clsName);

export const addClassNameToBody = (clsName: string): void => addClassNameToElement(document.body, clsName);

export const removeClassNameFromBody = (clsName: string): void => removeClassNameFromElement(document.body, clsName);

export const addChild = (child: Element, parent: Element): Element => parent.appendChild(child);

export const addChildToBody = (child: Element): Element => addChild(child, document.body);

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
 * @stable [17.05.2018]
 * @param {HTMLElement} source
 * @param {Element} sourceAnchor
 */
export const setAbsoluteOffset = (source: HTMLElement, sourceAnchor: Element): void => {
  const offset0 = $(sourceAnchor).offset();
  const anchor = $(sourceAnchor);
  source.style.position = 'absolute';
  source.style.left = `${offset0.left}px`;
  source.style.top = `${offset0.top + anchor.height()}px`;
};

/**
 * @stable [16.06.2018]
 * @param {HTMLElement} source
 * @param {Element} sourceAnchor
 */
export const adjustWidth = (source: HTMLElement, sourceAnchor: Element): void => {
  const anchor = $(sourceAnchor);
  source.style.width = `${anchor.width()}px`;
};

/**
 * @stable [23.06.2018]
 * @returns {boolean}
 */
export const isDocumentHasFocus = (): boolean => isFn(document.hasFocus) && document.hasFocus();
