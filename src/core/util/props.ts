import * as React from 'react';

import { cancelEvent } from './event';
import { ENV } from '../env';
import { ifNotFalseThanValue } from './cond';
import { isFn } from './type';

/**
 * @stable [31.08.2019]
 * @param {() => void} handler
 * @param {boolean} canAttachHandler
 * @returns {React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>}
 */
export const handlerPropsFactory =
  <TElement extends HTMLElement>(handler: () => void,
                                 canAttachHandler = true): React.DetailedHTMLProps<React.HTMLAttributes<TElement>, TElement> => ({
    ...ifNotFalseThanValue(
      canAttachHandler && isFn(handler) && ENV.mobilePlatform,
      (): React.DOMAttributes<HTMLElement> => ({
        onClick: cancelEvent,
        onDoubleClick: cancelEvent,  // The iOS issue workaround (white bottom bar)

        onTouchStart: (e) => {
          cancelEvent(e, true);
          handler();
        },
      }),
    ),
    ...ifNotFalseThanValue(
      canAttachHandler && isFn(handler) && !ENV.mobilePlatform,
      (): React.DOMAttributes<HTMLElement> => ({
        onClick: (e) => {
          cancelEvent(e);
          handler();
        },
      }),
    ),
  });
