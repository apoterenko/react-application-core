import * as React from 'react';

import {
  IUniversalLayoutBuilderConfiguration,
  UniversalLayoutBuilderElementT,
} from './configurations-definitions.interface';

/**
 * @stable [22.10.2018]
 */
export type ReactLayoutBuilderElementT = UniversalLayoutBuilderElementT<React.ReactNode>;

/**
 * @stable [22.10.2018]
 */
export interface IReactLayoutBuilderConfiguration extends IUniversalLayoutBuilderConfiguration<ReactLayoutBuilderElementT> {
}
