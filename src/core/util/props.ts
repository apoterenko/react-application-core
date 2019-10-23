import * as React from 'react';

import { cancelEvent } from './event';
import { getEnvironment } from '../di/di.services';
import { ifNotFalseThanValue } from './cond';
import { isFn } from './type';
import { IBaseEvent } from '../definition';

/**
 * @stable [22.10.2019]
 * @param {(e?: IBaseEvent) => void} handler
 * @param {boolean} canAttachHandler
 * @param {boolean} touched
 * @returns {Partial<React.DetailedHTMLProps<React.HTMLAttributes<TElement extends HTMLElement>, TElement extends HTMLElement>>}
 */
export const handlerPropsFactory =
  <TElement extends HTMLElement>(handler: (e?: IBaseEvent) => void,
                                 canAttachHandler = true,
                                 touched = true): Partial<React.DetailedHTMLProps<React.HTMLAttributes<TElement>, TElement>> => ({
    ...ifNotFalseThanValue(
      canAttachHandler === true && isFn(handler) && (touched === true && getEnvironment().mobilePlatform),
      (): React.DOMAttributes<HTMLElement> => ({
        onClick: cancelEvent,
        onDoubleClick: cancelEvent,  // The iOS issue workaround (white bottom bar)

        onTouchStart: (e) => {
          cancelEvent(e, true);
          handler(e);
        },
      }),
    ),
    ...ifNotFalseThanValue(
      canAttachHandler === true && isFn(handler) && (touched === false || !getEnvironment().mobilePlatform),
      (): React.DOMAttributes<HTMLElement> => ({
        onClick: (e) => {
          cancelEvent(e);
          handler(e);
        },
      }),
    ),
  });
