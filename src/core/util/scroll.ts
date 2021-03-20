import * as $scrollIntoView from 'dom-scroll-into-view';
import * as R from 'ramda';

import { IScrollIntoViewConfigEntity } from '../definition';

/**
 * @stable [19.03.2021]
 * @param source
 * @param container
 * @param config
 */
const scrollIntoView = (source: Element,
                        container: Element,
                        config?: IScrollIntoViewConfigEntity): void => {
  if (R.isNil(source) || R.isNil(container)) {
    return;
  }
  const cfg: IScrollIntoViewConfigEntity = {alignWithTop: true, alignWithLeft: true, ...config};
  $scrollIntoView(source, container, cfg);
};

/**
 * @stable [19.03.2021]
 */
export class ScrollUtils {
  public static readonly scrollIntoView = scrollIntoView;
}
