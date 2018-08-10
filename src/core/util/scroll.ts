import * as scrollIntoView0 from 'dom-scroll-into-view';

import { IKeyValue } from '../definitions.interface';

/**
 * @stable [10.08.2018]
 * @param {HTMLElement} source
 * @param {HTMLElement} container
 * @param {IKeyValue} config
 */
export const scrollIntoView = (source: HTMLElement,
                               container: HTMLElement,
                               config: IKeyValue = {alignWithTop: true, alignWithLeft: true}): void =>
  scrollIntoView0(source, container, config);
