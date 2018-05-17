import * as $ from 'jquery';

/**
 * @stable [17.05.2018]
 * @param {Element} source
 * @param {Element} sourceAnchor
 */
export const setAbsoluteOffset = (source: Element, sourceAnchor: Element): void => {
  const offset0 = $(sourceAnchor).offset();
  const sourceAsHtmlElement = source as HTMLElement;
  sourceAsHtmlElement.style.position = 'absolute';
  sourceAsHtmlElement.style.left = `${offset0.left}px`;
  sourceAsHtmlElement.style.top = `${offset0.top + $(sourceAnchor).height()}px`;
};
