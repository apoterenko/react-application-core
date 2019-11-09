import * as scrollIntoView0 from 'dom-scroll-into-view';

import { IScrollConfigEntity } from '../definition';

/**
 * @stable [08.11.2019]
 * @param {Element} source
 * @param {Element} container
 * @param {IScrollConfigEntity} config
 */
export const scrollIntoView = (source: Element,
                               container: Element,
                               config?: IScrollConfigEntity): void => {
  const cfg: IScrollConfigEntity = {alignWithTop: true, alignWithLeft: true, ...config};
  scrollIntoView0(source, container, cfg);
};
