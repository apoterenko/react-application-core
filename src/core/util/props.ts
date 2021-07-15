import * as React from 'react';
import * as R from 'ramda';

import {
  IBaseEvent,
  IGenericComponentCtor,
  IGenericComponentProps,
} from '../definition';
import { cancelEvent } from './event';
import { DiServices } from '../di/di.services';
import { IKeyValue } from '../definitions.interface';
import { NvlUtils } from './nvl';
import { TypeUtils } from './type';

/**
 * @stable [01.07.2021]
 * @param props
 * @param extendedProps
 */
const extendProps = <TProps = IKeyValue>(props: TProps, extendedProps: TProps): TProps =>
  !R.isNil(extendedProps) && !R.isNil(props)
    ? ({
      ...props,
      ...extendedProps,
    })
    : NvlUtils.nvl(props, extendedProps);

/**
 * @stable [21.08.2020]
 * @param childProps
 * @param parent
 */
const mergeWithParentDefaultProps =
  <TChildProps extends IGenericComponentProps, TParentCtor extends IGenericComponentCtor = IGenericComponentCtor>(
    childProps: TChildProps,
    parent: TParentCtor) => R.mergeDeepLeft(childProps, parent.defaultProps || {});

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
  public static readonly extendProps = extendProps;                                       /* @stable [01.07.2021] */
  public static readonly mergeWithParentDefaultProps = mergeWithParentDefaultProps;      /* @stable [21.08.2020] */
}
