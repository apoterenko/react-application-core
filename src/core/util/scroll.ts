import * as scrollIntoView0 from 'dom-scroll-into-view';

import { IKeyValue } from '../definitions.interface';

/**
 * @stable [10.08.2018]
 * @param {Element} source
 * @param {Element} container
 * @param {IKeyValue} config
 */
export const scrollIntoView = (source: Element,
                               container: Element,
                               config: IKeyValue = {alignWithTop: true, alignWithLeft: true}): void =>
  scrollIntoView0(source, container, config);
