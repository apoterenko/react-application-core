import * as $ from 'jquery';
import * as R from 'ramda';

import { BlobUtils } from './blob';
import { isFn } from './type';
import { NvlUtils } from './nvl';
import { FilterUtils } from './filter';
import {
  ComponentClassesEnum,
  IDownloadFileConfigEntity,
  IJQueryElement,
  IPresetsXYEntity,
} from '../definition';
import { joinClassName } from './cls';
import { ConditionUtils } from './cond';

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
 * @stable [12.05.2020]
 * @param {Element} element
 * @param {string} clsName
 */
export const addClassNames = (element: Element, ...clsName: string[]): void => {
  if (R.isNil(element)) {
    return;
  }
  toJqEl(element).addClass(joinClassName(...clsName));
};

/**
 * @stable [12.05.2020]
 * @param {Element} element
 * @param {string} clsName
 */
export const removeClassNames = (element: Element, ...clsName: string[]): void => {
  if (R.isNil(element)) {
    return;
  }
  toJqEl(element).removeClass(joinClassName(...clsName));
};

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
 * @stable [13.12.2020]
 * @param cfg
 */
const downloadFileByUrl = (cfg: IDownloadFileConfigEntity): void => {
  const {
    fileName,
    url,
  } = cfg;
  const loader = createElement<HTMLAnchorElement>('a');

  try {
    addClassNames(loader, ComponentClassesEnum.INVISIBLE);

    loader.download = NvlUtils.nvl(fileName, url);
    loader.href = url;
    loader.click();
  } finally {
    removeChild(loader);
  }
};

/**
 * @stable [13.12.2020]
 * @param cfg
 */
const downloadFile = async (cfg: IDownloadFileConfigEntity): Promise<void> => {
  const {
    detectFileType,
    fileName,
    url,
  } = cfg;

  //  Force apply file name via the proxy-link. Download attribute doesn't work in case of outer UUID link
  const data = await BlobUtils.fromUrlToBlob(url);
  const fileExtension = await ConditionUtils.orNull(
    detectFileType,
    async () => BlobUtils.asFileExtension(await BlobUtils.detectBlobMimeType(data))
  );

  return downloadFileByBlob({
    data,
    fileName: fileExtension
      ? `${NvlUtils.nvl(fileName, url)}.${fileExtension}`
      : fileName,
  });
};

/**
 * @stable [13.12.2020]
 * @param cfg
 */
const downloadFileByBlob = (cfg: IDownloadFileConfigEntity): void => {
  const blob = cfg.data;
  const fileName = cfg.fileName;

  const url = URL.createObjectURL(blob);
  try {
    downloadFileByUrl({url, fileName});
  } finally {
    URL.revokeObjectURL(url);
  }
};

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
  return FilterUtils.trueValuesArrayFilter(...classNames.map((className) => el.hasClass(className))).length > 0;
};

/**
 * @stable [01.12.2018]
 * @param {Element} element
 * @param {IPresetsXYEntity} xyEntity
 */
export const scrollTo = (element: Element, xyEntity: IPresetsXYEntity): void => element.scrollTo(xyEntity.x, xyEntity.y);

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
  if (R.isNil(stickyWrapperEl)) {
    return;
  }
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
 * @stable [18.08.2020]
 * @param elem
 */
export const openFullScreen = (
  elem: Element
    & {
    mozRequestFullScreen?: () => void;
    msRequestFullscreen?: () => void;
    webkitRequestFullscreen?: () => void;
  }
  ) => {
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

/**
 * @stable [13.12.2020]
 */
export class DomUtils {
  public static readonly downloadFile = downloadFile;
  public static readonly downloadFileByBlob = downloadFileByBlob;
  public static readonly downloadFileByUrl = downloadFileByUrl;
}
