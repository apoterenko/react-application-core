import * as React from 'react';

import {
  IClassNameWrapper,
  IStyleWrapper,
} from '../definitions.interface';

/**
 * @browserCompatible
 * @stable [20.09.2019]
 */
export interface IWebComponentEntity<TClassName = string>
  extends IClassNameWrapper<TClassName>,
    IStyleWrapper<React.CSSProperties> {
}
