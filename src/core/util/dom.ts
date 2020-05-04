import * as $ from 'jquery';
import * as R from 'ramda';

import { fromUrlToBlob } from './blob';
import { isFn } from './type';
import { nvl } from './nvl';
import {
  notNilValuesArrayFilter,
  trueValuesArrayFilter,
} from './filter';
import {
  IJQueryElement,
  IXYEntity,
} from '../definition';

/**
 * @stable [28.08.2019]
 * @param {string} id
 * @returns {TElement}
 */
export const getElementById = <TElement extends HTMLElement = HTMLElement>(id: string): TElement =>
  document.getElementById(id) as TElement;

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
 * @stable [08.01.2020]
 * @param {Partial<HTMLScriptElement>} cfg
 * @returns {Promise<HTMLScriptElement>}
 */
export const createScript = (cfg: Partial<HTMLScriptElement>): Promise<HTMLScriptElement> =>
  new Promise<HTMLScriptElement>((resolve) => {
    const el = createElement<HTMLScriptElement>('script');
    el.type = 'text/javascript';
    el.onload = () => resolve(el);
    Object.assign(el, cfg);
  });

/**
 * @stable [30.07.2018]
 * @param {Element} element
 * @param {string} clsName
 */
export const addClassNames = (element: Element, ...clsName: string[]): void =>
  element.classList.add(...notNilValuesArrayFilter(...clsName));

/**
 * @stable [30.10.2018]
 * @param {Element} element
 * @param {string} clsName
 */
export const removeClassNames = (element: Element, ...clsName: string[]): void =>
  element.classList.remove(...clsName);

/**
 * @stable [20.09.2019]
 * @param {string} rootId
 * @returns {Element}
 */
export const addRootElement = (rootId: string): Element => {
  const rootEl = createElement();
  rootEl.setAttribute('id', rootId);
  addClassNames(rootEl, 'rac-root');
  return rootEl;
};

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
 * @returns {number}
 */
export const getWidth = (source: Element): number => $(source).width();

/**
 * @stable [27.10.2018]
 * @param {Element} source
 * @returns {number}
 */
export const getHeight = (source: Element): number => $(source).height();

/**
 * @stable [27.10.2018]
 * @param {Element} source
 * @returns {number}
 */
export const getContentHeight = (source: Element): number => $(source).children().height();

/**
 * @stable [01.12.2018]
 * @param {Element} source
 * @returns {number}
 */
export const getScrollLeft = (source: Element): number => $(source).scrollLeft();

/**
 * @stable [01.12.2018]
 * @param {Element} source
 * @returns {number}
 */
export const getScrollTop = (source: Element): number => $(source).scrollTop();

/**
 * @stable [01.12.2018]
 * @param {Element} source
 * @param {number} value
 * @returns {IJQueryElement}
 */
export const setScrollTop = (source: Element, value: number): IJQueryElement => $(source).scrollTop(value);

/**
 * @stable [18.12.2018]
 * @param {Element} source
 * @param {number} value
 * @returns {IJQueryElement}
 */
export const setScrollLeft = (source: Element, value: number): IJQueryElement => $(source).scrollLeft(value);

/**
 * @stable [23.06.2018]
 * @returns {boolean}
 */
export const isDocumentHasFocus = (): boolean => isFn(document.hasFocus) && document.hasFocus();

/**
 * @stable [13.12.2018]
 * @param {Element} source
 * @returns {IJQueryElement}
 */
export const toJqEl = <TJqElement extends IJQueryElement = IJQueryElement>(source: Element): TJqElement => $(source) as TJqElement;

/**
 * @stable [30.08.2019]
 * @param {string} url
 * @param {string} fileName
 */
export const downloadFileAsBlobUrl = (url: string, fileName?: string): void => {
  const loader = createElement<HTMLAnchorElement>('a');
  try {
    addClassNames(loader, 'rac-invisible');

    loader.download = nvl(fileName, url);
    loader.href = url;
    loader.click();
  } finally {
    removeChild(loader);
  }
};

/**
 * @stable [30.08.2019]
 * @param {string} url
 * @param {string} fileName
 */
export const downloadFile = async (url: string, fileName?: string): Promise<void> =>
  //  Force apply file name via the proxy-link. Download attribute doesn't work in case of outer UUID link
  downloadFileAsBlob(await fromUrlToBlob(url), fileName);

/**
 * @stable [30.08.2019]
 * @param {Blob} blob
 * @param {string} fileName
 */
export const downloadFileAsBlob = (blob: Blob, fileName?: string): void => {
  const url = URL.createObjectURL(blob);
  try {
    downloadFileAsBlobUrl(url, fileName);
  } finally {
    URL.revokeObjectURL(url);
  }
};

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

/**
 * @stable [22.10.2019]
 * @param {Element} target
 * @param {string} classNames
 * @returns {boolean}
 */
export const hasClasses = (target: Element, ...classNames: string[]): boolean => {
  const el = toJqEl(target);
  return trueValuesArrayFilter(...classNames.map((className) => el.hasClass(className))).length > 0;
};

/**
 * @stable [01.12.2018]
 * @param {Element} element
 * @param {IXYEntity} xyEntity
 */
export const scrollTo = (element: Element, xyEntity: IXYEntity): void => element.scrollTo(xyEntity.x, xyEntity.y);

/**
 * @stable [26.10.2019]
 * @param {Element} element
 * @param {Element} parent
 * @returns {boolean}
 */
export const isElementVisibleWithinParent = (element: Element, parent: Element): boolean => {
  if (R.isNil(parent) || R.isNil(element)) {
    return false;
  }
  const parentJEl = toJqEl(parent);
  const selectedJEl = toJqEl(element);
  const parentJElOuterHeight = parentJEl.outerHeight();
  const parentJElOffset = parentJEl.offset();
  const parentJElOffsetTop = parentJElOffset.top;
  const selectedJElOffset = selectedJEl.offset();
  const selectedJElOffsetTop = selectedJElOffset.top;
  const diff = selectedJElOffsetTop - parentJElOffsetTop;
  return diff <= parentJElOuterHeight && diff + selectedJEl.outerHeight() > 0;
};

/**
 * @stable [11.10.2019]
 * @param {Element} stickyWrapperEl
 * @param {string} stickySelector
 * @param {(stickyJEl: IJQueryElement) => any} widthResolver
 */
export const setStickyElementProperties = (stickyWrapperEl: Element,
                                           stickySelector: string,
                                           widthResolver = (stickyJEl: IJQueryElement) => stickyJEl.parent().width()): void => {
  const stickyWrapperJEl = toJqEl(stickyWrapperEl);
  if (R.isNil(stickyWrapperJEl) || R.isNil(stickyWrapperJEl.val())) {
    return;
  }
  let marginTop;
  let top;
  let left;
  let width;

  const stickyJEls = stickyWrapperJEl.find(stickySelector);
  if (R.isNil(stickyJEls)) {
    return;
  }
  stickyJEls.each((index) => {
    const stickyJEl = toJqEl(stickyJEls.get(index));
    const stickyWrapperJElTop = stickyWrapperJEl.offset().top;
    const stickyJElPosition = stickyJEl.css('position');
    const stickyJElTop = stickyJEl.offset().top;
    const stickyJElMarginBottom = parseInt(stickyJEl.css('margin-bottom'), 10);
    const stickyJElHeight = stickyJEl.height() + (isNaN(stickyJElMarginBottom) ? 0 : stickyJElMarginBottom);
    const stickyAfterJEl = toJqEl(stickyJEl.siblings()[0]);
    const stickyAfterOffset = stickyAfterJEl.offset();
    const stickyAfterJElTop = stickyAfterOffset.top;

    if (
      (stickyJElPosition === 'fixed' && stickyAfterJElTop >= stickyJElHeight + stickyWrapperJElTop)
      || stickyJElTop > stickyWrapperJElTop
    ) {
      top = 0;
      left = 0;
      marginTop = 0;
      width = 'initial';
      stickyJEl.removeClass('rac-sticky-fixed');
    } else if (stickyJElTop <= stickyWrapperJElTop) {
      left = stickyAfterOffset.left;
      top = stickyWrapperJElTop;
      marginTop = stickyJElHeight;
      width = widthResolver(stickyJEl);
      stickyJEl.addClass('rac-sticky-fixed');
    }
    stickyJEl.css({top, left, width});
    stickyAfterJEl.css('margin-top', `${marginTop}px`); // Additional <tbody> offset
  });
};

/**
 * @stable [03.04.2019]
 * @param {Element & {mozRequestFullScreen?: () => void; msRequestFullscreen?: () => void}} elem
 */
export const openFullScreen = (elem: Element & { mozRequestFullScreen?: () => void; msRequestFullscreen?: () => void; }) => {
  if (elem.requestFullscreen) {
    elem.requestFullscreen();
  } else if (isFn(elem.mozRequestFullScreen)) { /* Firefox */
    elem.mozRequestFullScreen();
  } else if (isFn(elem.webkitRequestFullscreen)) { /* Chrome, Safari and Opera */
    elem.webkitRequestFullscreen();
  } else if (isFn(elem.msRequestFullscreen)) { /* IE/Edge */
    elem.msRequestFullscreen();
  }
};
