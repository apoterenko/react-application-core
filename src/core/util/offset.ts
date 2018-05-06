import * as $ from 'jquery';

export const setAbsoluteOffset = (source: HTMLElement, sourceAnchor: HTMLElement): void => {
  const offset0 = $(sourceAnchor).offset();
  source.style.position = 'absolute';
  source.style.left = `${offset0.left}px`;
  source.style.top = `${offset0.top + $(sourceAnchor).height()}px`;
};
