import * as React from 'react';
import * as R from 'ramda';

import { cancelEvent } from './event';
import { getEnvironment } from '../di/di.services';
import { IBaseEvent } from '../definition';
import { ifNotFalseThanValue } from './cond';
import { IKeyValue } from '../definitions.interface';
import { isFn } from './type';

/**
 * @stable [24.03.2020]
 * @param {TProps} props
 * @param {TProps} systemProps
 * @returns {TProps}
 */
export const mergeWithSystemProps = <TProps = IKeyValue>(props: TProps, systemProps: TProps): TProps =>
  R.isNil(systemProps)
    ? props
    : ({
      ...props as {},
      ...systemProps as {},
    } as TProps);

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

/**
 * @stable [18.05.2020]
 */
export class PropsUtils {
  public static readonly buildClickHandlerProps = handlerPropsFactory;                /* @stable [22.05.2020] */
  public static readonly mergeWithSystemProps = mergeWithSystemProps;                 /* @stable [18.05.2020] */
}
