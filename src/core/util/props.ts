import * as React from 'react';
import * as R from 'ramda';

import { cancelEvent } from './event';
import { DiServices } from '../di/di.services';
import { IBaseEvent } from '../definition';
import { IKeyValue } from '../definitions.interface';
import { TypeUtils } from './type';

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
 * @stable [18.08.2020]
 * @param handler
 * @param canAttachHandler
 * @param touched
 */
const buildClickHandlerProps =
  <TElement extends HTMLElement>(handler: (e?: IBaseEvent) => void,
                                 canAttachHandler?: boolean,
                                 touched = true): Partial<React.DetailedHTMLProps<React.HTMLAttributes<TElement>, TElement>> =>
    canAttachHandler && TypeUtils.isFn(handler)
      ? ({
        ...(touched === true && DiServices.environment().mobilePlatform) && ({
          onClick: cancelEvent,
          onDoubleClick: cancelEvent,  // The iOS issue workaround (white bottom bar)

          onTouchStart: (e) => {
            cancelEvent(e, true);
            handler(e);
          },
        }),
        ...(touched === false || !DiServices.environment().mobilePlatform) && ({
          onClick: (e) => {
            cancelEvent(e);
            handler(e);
          },
        }),
      })
      : {};

/**
 * @stable [18.05.2020]
 */
export class PropsUtils {
  public static readonly buildClickHandlerProps = buildClickHandlerProps;                /* @stable [22.05.2020] */
  public static readonly mergeWithSystemProps = mergeWithSystemProps;                    /* @stable [18.05.2020] */
}
