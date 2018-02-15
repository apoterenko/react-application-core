import * as offset from 'offset';
import * as computedStyle from 'computed-style';

export const setAbsoluteOffset = (source: HTMLElement, sourceAnchor: HTMLElement): void => {
  const anchorHeight = parseInt(computedStyle(sourceAnchor, 'height').replace('px', ''), 10);

  const offset0 = offset(sourceAnchor);
  source.style.position = 'absolute';
  source.style.left = `${offset0.x}px`;
  source.style.top = `${offset0.y + anchorHeight}px`;
};
